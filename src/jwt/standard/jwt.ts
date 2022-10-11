// ! THIS FILE IS A TYPE HELL, IT IS ALL GENERIC MAGIC, READ VERY CAREFULLY BEFORE EDITING !
import {
    Algorithm,
    JWTConstructorOptions,
    JWTHeader as IJWTHeader,
    JWTHeaderConstructorOptions,
    JWTJSONForm,
    JWTPayload as IJWTPayload,
    JWTPayloadConstructorOptions,
    JWTPayloadJSONForm,
    JWTPayloadOptions,
    JWTPayloadOptionsDefault,
    Key,
    TimeUnit,
    TimeUnitsMSMultiplierMap,
} from "../types";
import { filterObject, getSignableString, isValidAlgorithm, roundDecPlaces } from "../../utils";
import base64url from "base64url";
import * as jose from "jose";
const ROUND_DEC_PLACES = 2;
const TIME_UNIT: TimeUnit = "seconds";
export class JWTToken<
    O extends JWTPayloadOptions = JWTPayloadOptionsDefault,
    P extends {} | undefined = undefined,
    H extends {} | undefined = undefined,
    SIG extends boolean = true
> {
    public readonly header: JWTHeader<H>;
    public readonly payload: JWTPayload<P, O>;
    public readonly signature: SIG extends true ? string : undefined;

    constructor(options: JWTConstructorOptions<O, P, H, SIG>) {
        this.header = new JWTHeader<H>({
            alg: options.algorithm,
            additionalHeaders: options.additionalHeaders,
        });

        this.payload = new JWTPayload<P, O>({
            iss: options.issuer,
            sub: options.subject,
            aud: options.audience,
            exp: options.expiration,
            nbf: options.notBefore,
            iat: options.issuedAt,
            jti: options.jwtID,
            additionalPayload: options.additionalPayload,
        });
        this.signature = options.signature;
    }

    public toJSON(): JWTJSONForm<O, P, H, SIG> {
        return {
            header: this.header.toJSON(),
            payload: this.payload.toJSON(),
            signature: this.signature,
        };
    }

    public toString(): string {
        return `${this.header.toString()}.${this.payload.toString()}.${
            this.signature ? this.signature.toString() : ""
        }`;
    }

    public getSignableString(): string {
        return getSignableString(this.header, this.payload);
    }

    /**
     * Checks if the token has a signature. The signature does not have to be valid.
     */
    public isSigned(): SIG {
        if (this.signature === undefined) return false as SIG;
        return true as SIG;
    }

    /**
     * Verifies, if the token is valid at a given time. If the token is not valid, returns false.
     * @param reseve Minimum time to reserve before expiration. Defaults to 1 second.
     * @param at A time when to perfrom the validation. Defaults to current time.
     */
    public isNotExpired(reseve: number = 1000, at: Date = new Date()): boolean {
        return this.payload.exp.getTime() - at.getTime() > reseve;
    }

    /**
     * Validates, if the token is after the not before date. If the token is not after the not before date, returns true.
     * @param at A time when to perfrom the validation. Defaults to current time.
     */
    public isAfterNotBefore(at: Date = new Date()): boolean {
        if (!this.payload.nbf) return true;
        return this.payload.nbf.getTime() <= at.getTime();
    }

    /**
     * Verifies time parameters of the token.
     * @param reserve Minimum time to reserve before expiration. Defaults to 1 second.
     * @param at A time when to perfrom the validation. Defaults to current time.
     */
    public isTimeValid(reserve: number = 1000, at: Date = new Date()): boolean {
        return this.isNotExpired(reserve, at) && this.isAfterNotBefore(at);
    }

    /**
     * Verifies if the audience of the token is correct. If audience is not present on the token, returns true.
     * @param audience Audience to check.
     */
    public isCorrectAudience(audience: string): boolean {
        if (this.payload.aud === undefined) return true;
        if (Array.isArray(this.payload.aud)) {
            return this.payload.aud.includes(audience);
        }
        return this.payload.aud === audience;
    }

    /**
     * Checks if the token was issued after a given date. If the token does not have an issued at date, returns undefined.
     * @param at A time when to perfrom the validation. Defaults to current time.
     */
    public isIssuedAfter(at: Date = new Date()): boolean | undefined {
        if (!this.payload.iat) return undefined;
        return this.payload.iat.getTime() <= at.getTime();
    }

    /**
     * Checks if the token is issued by a trusted issuer.
     * @param issuerIsTrusted A string of a trusted issuer, array of trusted issuers, or a function that checks if a given issuer is trusted.
     * @returns
     */
    public async isFromTrustedIssuer(
        issuerIsTrusted: ((issuer: string) => Promise<boolean>) | string | string[]
    ): Promise<boolean> {
        if (this.payload.iss === undefined) return false;
        if (Array.isArray(issuerIsTrusted)) {
            return issuerIsTrusted.includes(this.payload.iss as string);
        }
        if (typeof issuerIsTrusted === "function") {
            return await issuerIsTrusted(this.payload.iss as string);
        }
        return this.payload.iss === issuerIsTrusted;
    }

    /**
     * Signs the token with a given key.
     * @param key Private key to sign the token with.
     * @returns Signature string
     */
    protected async getSignature(key: Key): Promise<string> {
        const sign = await new jose.SignJWT(this.payload.toJSON() as unknown as jose.JWTPayload)
            .setProtectedHeader(this.header.toJSON() as unknown as jose.JWTHeaderParameters)
            .sign(key);
        return sign.split(".").at(-1) as string;
    }

    /**
     * Signs the token with a given key and returns a new token object with the signature.
     * @param key Private key to sign the token with.
     * @returns A signed token.
     */
    public async sign(key: Key): Promise<JWTToken<O, P, H, true>> {
        const signature = await this.getSignature(key);
        const json: JWTJSONForm<O, P, H, boolean> = this.toJSON();
        json.signature = signature;
        return JWTToken.fromJSON<O, P, H, true>(json);
    }

    /**
     * Checks the signature of a token.
     * @param key Public key to verify the token with.
     * @returns Whether the token has a valid signature.
     */
    public async verifySignature(key: Key): Promise<boolean> {
        try {
            await jose.jwtVerify(this.toString(), key);
        } catch (e) {
            return false;
        }
        return true;
    }

    public async verify(
        key: Key,

        reserve: number = 1000,
        at: Date = new Date(),
        issuerIsTrusted?: ((issuer: string) => Promise<boolean>) | string | string[],
        audience?: string
    ): Promise<boolean> {
        return (
            (await this.verifySignature(key)) &&
            this.isTimeValid(reserve, at) &&
            (audience === undefined ? true : this.isCorrectAudience(audience)) &&
            (issuerIsTrusted === undefined ? true : await this.isFromTrustedIssuer(issuerIsTrusted))
        );
    }

    /**
     * Creates a new token from a JSON object.
     * @param json JSON object of the JWT
     * @returns A JWT token object.
     */
    public static fromJSON<
        O extends JWTPayloadOptions = JWTPayloadOptionsDefault,
        P extends {} | undefined = undefined,
        H extends {} | undefined = undefined,
        SIG extends boolean = true
    >(json: JWTJSONForm<O, P, H, SIG>): JWTToken<O, P, H, SIG> {
        return new JWTToken<O, P, H, SIG>({
            algorithm: json.header.alg,
            issuer: json.payload.iss,
            subject: json.payload.sub,
            audience: json.payload.aud,
            expiration: new Date(json.payload.exp / TimeUnitsMSMultiplierMap[TIME_UNIT]),
            issuedAt:
                json.payload.iat === undefined
                    ? undefined
                    : new Date((json.payload.iat as number) / TimeUnitsMSMultiplierMap[TIME_UNIT]),
            notBefore:
                json.payload.nbf === undefined
                    ? undefined
                    : new Date((json.payload.nbf as number) / TimeUnitsMSMultiplierMap[TIME_UNIT]),
            jwtID: json.payload.jti,
            signature: json.signature,

            additionalHeaders: filterObject(json.header, (key) => !["alg", "typ"].includes(key as string)) as H,
            additionalPayload: filterObject(
                json.payload,
                (key) => !["iss", "sub", "aud", "exp", "iat", "nbf", "jti"].includes(key as string)
            ) as P,
        });
    }

    /**
     * Interprets a string as a JWT token.
     * @param token A JWT token string.
     * @returns A JWT token object.
     */
    public static fromString<
        O extends JWTPayloadOptions = JWTPayloadOptionsDefault,
        P extends {} | undefined = undefined,
        H extends {} | undefined = undefined,
        SIG extends boolean = true
    >(token: string): JWTToken<O, P, H, SIG> {
        const [header, payload, signature] = token.split(".");
        if (!header || !payload) {
            throw new Error("Invalid JWT token");
        }
        if (signature === undefined) {
            throw new Error("Invalid JWT token. Unsigned tokens must end with a period. See JWT specification.");
        }
        return JWTToken.fromJSON<O, P, H, SIG>({
            header: JWTHeader.fromString<H>(header).toJSON(),
            payload: JWTPayload.fromString<P, O>(payload).toJSON(),
            signature: (signature == "" ? undefined : signature) as SIG extends true ? string : undefined,
        });
    }
}

/**
 * A JWT header.
 */
export class JWTHeader<A extends {} | undefined = undefined> implements IJWTHeader {
    public readonly alg: Algorithm;
    public readonly typ: "JWT";
    public readonly additional: A extends {} ? A : {};
    constructor(options: JWTHeaderConstructorOptions<A>) {
        if (!isValidAlgorithm(options.alg)) throw new Error("Invalid algorithm");
        this.alg = options.alg;
        this.typ = "JWT";
        this.additional = (options.additionalHeaders === undefined ? {} : options.additionalHeaders) as A extends {}
            ? A
            : {};
    }
    toJSON(): A extends {} ? IJWTHeader & A : IJWTHeader {
        return {
            alg: this.alg,
            typ: this.typ,
            ...this.additional,
        } as A extends {} ? IJWTHeader & A : IJWTHeader;
    }

    toString(): string {
        return base64url.encode(JSON.stringify(this.toJSON()), "utf-8");
    }

    static fromJSON<A extends {} | undefined = undefined>(
        headers: A extends {} ? IJWTHeader & A : IJWTHeader
    ): JWTHeader<A> {
        return new JWTHeader({
            alg: headers.alg,
            additionalHeaders: filterObject(headers, (key) => !["alg"].includes(key as string)) as A,
        });
    }

    static fromString<A extends {} | undefined = undefined>(header: string): JWTHeader<A> {
        return this.fromJSON<A>(JSON.parse(base64url.decode(header)));
    }
}

export class JWTPayload<A extends {} | undefined = undefined, O extends JWTPayloadOptions = JWTPayloadOptionsDefault>
    implements IJWTPayload<O>
{
    public readonly iss: O["iss"];
    public readonly sub: O["sub"];
    public readonly aud: O["aud"][];
    public readonly exp: Date;
    public readonly nbf: O["nbf"];
    public readonly iat: O["iat"];
    public readonly jti: O["jti"];

    public readonly additional: A extends {} ? A : {};
    constructor(options: JWTPayloadConstructorOptions<A, O>) {
        this.iss = options.iss;
        this.sub = options.sub;
        this.aud = options.aud;
        this.exp = options.exp;
        this.nbf = options.nbf;
        this.iat = options.iat;
        this.jti = options.jti;

        this.additional = (options.additionalPayload === undefined ? {} : options.additionalPayload) as A extends {}
            ? A
            : {};
    }
    toJSON(): A extends {} ? JWTPayloadJSONForm<O> & A : JWTPayloadJSONForm<O> {
        return {
            iss: this.iss,
            sub: this.sub,
            aud: this.aud,
            exp: roundDecPlaces(this.exp.getTime() * TimeUnitsMSMultiplierMap[TIME_UNIT], ROUND_DEC_PLACES),
            nbf:
                this.nbf?.getTime() === undefined
                    ? undefined
                    : roundDecPlaces(this.nbf.getTime() * TimeUnitsMSMultiplierMap[TIME_UNIT], ROUND_DEC_PLACES),
            iat:
                this.iat?.getTime() === undefined
                    ? undefined
                    : roundDecPlaces(this.iat.getTime() * TimeUnitsMSMultiplierMap[TIME_UNIT], ROUND_DEC_PLACES),
            jti: this.jti,
            ...this.additional,
        } as A extends {} ? JWTPayloadJSONForm<O> & A : JWTPayloadJSONForm<O>;
    }

    toString(): string {
        return base64url.encode(JSON.stringify(this.toJSON()), "utf-8");
    }

    static fromJSON<A extends {} | undefined = undefined, O extends JWTPayloadOptions = JWTPayloadOptionsDefault>(
        payload: A extends {} ? JWTPayloadJSONForm<O> & A : JWTPayloadJSONForm<O>
    ): JWTPayload<A, O> {
        return new JWTPayload<A, O>({
            aud: payload.aud,
            exp: new Date(payload.exp * 1000),
            iat: payload.iat === undefined ? undefined : new Date((payload.iat as number) * 1000),
            iss: payload.iss,
            jti: payload.jti,
            nbf: payload.nbf === undefined ? undefined : new Date((payload.nbf as number) * 1000),
            sub: payload.sub,

            additionalPayload: filterObject(
                payload,
                (key) => !["aud", "exp", "iat", "iss", "jti", "nbf", "sub"].includes(key as string)
            ) as A,
        });
    }

    static fromString<A extends {} | undefined = undefined, O extends JWTPayloadOptions = JWTPayloadOptionsDefault>(
        payload: string
    ): JWTPayload<A, O> {
        return this.fromJSON<A, O>(JSON.parse(base64url.decode(payload)));
    }
}
