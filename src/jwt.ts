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
} from "./types";
import { filterObject, isValidAlgorithm } from "./utils";
import jose from "node-jose";
export class JWTToken<
    O extends JWTPayloadOptions = JWTPayloadOptionsDefault,
    P extends {} | undefined = undefined,
    H extends {} | undefined = undefined
> {
    public readonly header: JWTHeader<H>;
    public readonly payload: JWTPayload<P, O>;
    public readonly signature: string;

    constructor(options: JWTConstructorOptions<O, P, H>) {
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

    public toJSON(): JWTJSONForm<O, P, H> {
        return {
            header: this.header.toJSON(),
            payload: this.payload.toJSON(),
            signature: this.signature,
        };
    }

    public toString(): string {
        return `${this.header.toString()}.${this.payload.toString()}.${this.signature.toString()}`;
    }

    public static fromJSON<
        O extends JWTPayloadOptions = JWTPayloadOptionsDefault,
        P extends {} | undefined = undefined,
        H extends {} | undefined = undefined
    >(json: JWTJSONForm<O, P, H>): JWTToken<O, P, H> {
        return new JWTToken<O, P, H>({
            algorithm: json.header.alg,
            issuer: json.payload.iss,
            subject: json.payload.sub,
            audience: json.payload.aud,
            expiration: new Date(json.payload.exp * 1000),
            issuedAt: json.payload.iat === undefined ? undefined : new Date(json.payload.iat as number * 1000),
            notBefore: json.payload.nbf === undefined ? undefined : new Date(json.payload.nbf as number * 1000),
            jwtID: json.payload.jti,
            signature: json.signature,

            additionalHeaders: filterObject(json.header, (key) => !["alg", "typ"].includes(key as string)) as H,
            additionalPayload: filterObject(
                json.payload,
                (key) => !["iss", "sub", "aud", "exp", "iat", "nbf", "jti"].includes(key as string)
            ) as P,
        });
    }

    public static fromString<
        O extends JWTPayloadOptions = JWTPayloadOptionsDefault,
        P extends {} | undefined = undefined,
        H extends {} | undefined = undefined
    >(token: string): JWTToken<O, P, H> {
        const [header, payload, signature] = token.split(".");
        if (!header || !payload || !signature) {
            throw new Error("Invalid JWT token");
        }
        return JWTToken.fromJSON<O, P, H>({
            header: JWTHeader.fromString<H>(header).toJSON(),
            payload: JWTPayload.fromString<P, O>(payload).toJSON(),
            signature,
        });
    }
}

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
        return jose.util.base64url.encode(JSON.stringify(this.toJSON()), "utf-8");
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
        return this.fromJSON<A>(JSON.parse(jose.util.base64url.decode(header).toString("utf-8")));
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
            exp: this.exp.getTime() / 1000,
            nbf: this.nbf?.getTime() === undefined ? undefined : this.nbf.getTime() / 1000,
            iat: this.iat?.getTime() === undefined ? undefined : this.iat.getTime() / 1000,
            jti: this.jti,
            ...this.additional,
        } as A extends {} ? JWTPayloadJSONForm<O> & A : JWTPayloadJSONForm<O>;
    }

    toString(): string {
        return jose.util.base64url.encode(JSON.stringify(this.toJSON()), "utf-8");
    }

    static fromJSON<A extends {} | undefined = undefined, O extends JWTPayloadOptions = JWTPayloadOptionsDefault>(
        payload: A extends {} ? JWTPayloadJSONForm<O> & A : JWTPayloadJSONForm<O>
    ): JWTPayload<A, O> {
        return new JWTPayload<A, O>({
            aud: payload.aud,
            exp: new Date(payload.exp * 1000),
            iat: payload.iat === undefined ? undefined : new Date(payload.iat as number * 1000),
            iss: payload.iss,
            jti: payload.jti,
            nbf: payload.nbf === undefined ? undefined : new Date(payload.nbf as number * 1000),
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
        return this.fromJSON<A, O>(JSON.parse(jose.util.base64url.decode(payload).toString("utf-8")));
    }
}
