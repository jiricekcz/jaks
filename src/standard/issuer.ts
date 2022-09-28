import jose from "jose";

import { JWTToken } from "./jwt";
import { Algorithm, IssuerOptions, IssueTokenOptions, JWTPayloadOptions, JWTPayloadOptionsDefault } from "../types";
import { JWTTokenParser } from "./parser";

export class JWTTokenIssuer<
    O extends JWTPayloadOptions = JWTPayloadOptionsDefault,
    P extends {} | undefined = undefined,
    H extends {} | undefined = undefined
> extends JWTTokenParser<O, P, H> {
    protected readonly privateKey: jose.KeyLike | Uint8Array;
    public readonly headers: H;
    public readonly algorithm: Algorithm;
    public readonly validTimeMs: number;
    public readonly validityDelayMs: number;
    public readonly nameOrUrl: O["jti"];
    public readonly defaultAdditionalPayload: P;
    protected generateJWTID: () => O["jti"];
    constructor(key: jose.KeyLike | Uint8Array, issuerOptions: IssuerOptions<O, P, H>) {
        super(true);
        this.privateKey = key;
        this.headers = issuerOptions.additionalHeaders;
        this.algorithm = issuerOptions.algorithm;
        this.validTimeMs = issuerOptions.validTimeMs;
        this.validityDelayMs = issuerOptions.validityDelayMs;
        this.nameOrUrl = issuerOptions.nameOrUrl;
        this.defaultAdditionalPayload = issuerOptions.defaultPayload;
        this.generateJWTID = issuerOptions.generateJWTID;
    }

    public async issueToken(options: IssueTokenOptions<O, P, H>): Promise<JWTToken<O, P, H, true>> {
        const audience: O["aud"][] =
            options.audience === undefined
                ? []
                : Array.isArray(options.audience)
                ? options.audience
                : [options.audience];
        const validTimeMs = options.validTimeMsOverride ?? this.validTimeMs;
        const validityDelayMs = options.validityDelayMsOverride ?? this.validityDelayMs;
        const additionalPayload: P = { ...this.defaultAdditionalPayload, ...options.additionalPayload };

        const token: JWTToken<O, P, H, false> = new JWTToken<O, P, H, false>({
            additionalHeaders: this.headers,
            algorithm: this.algorithm,
            audience: audience,
            expiration: new Date(Date.now() + validTimeMs),
            issuedAt: new Date(),
            issuer: this.nameOrUrl,
            jwtID: this.generateJWTID(),
            signature: undefined,
            notBefore: new Date(Date.now() + validityDelayMs),
            subject: options.subject,
            additionalPayload: additionalPayload,
        });

        const signedToken = await token.sign(this.privateKey);

        return signedToken;
    }

    public async verify(token: JWTToken<O, P, H, true>): Promise<boolean> {
        return token.verify(this.privateKey);
    }
}
