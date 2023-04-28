import * as jose from "jose";

export type Key = jose.KeyLike | Uint8Array;

// ! JWK DEFINITIONS

export const KEY_TYPES = ["EC", "RSA", "oct"] as const;
export const KEY_USES = ["sig", "enc"] as const;
export const KEY_OPERATIONS = [
    "sign",
    "verify",
    "encrypt",
    "decrypt",
    "wrapKey",
    "unwrapKey",
    "deriveKey",
    "deriveBits",
] as const;

export type KeyType = typeof KEY_TYPES[number];
export type KeyUse = typeof KEY_USES[number];
export type KeyOperation = typeof KEY_OPERATIONS[number];

export const PUBLIC_KEY_OPERATIONS = ["verify"] as const;
export const PRIVATE_KEY_OPERATIONS = ["sign", "decrypt", "unwrapKey", "deriveKey", "deriveBits"] as const;
export const SYMMETRIC_KEYS_OPERATIONS = ["sign", "verify", "encrypt", "decrypt"] as const;

export type PublicKeyOperation = typeof PUBLIC_KEY_OPERATIONS[number];
export type PrivateKeyOperation = typeof PRIVATE_KEY_OPERATIONS[number];
export type SymmetricKeyOperation = typeof SYMMETRIC_KEYS_OPERATIONS[number];

export const EC_ALGORITHMS = ["ES256", "ES384", "ES512"] as const;
export const RSA_ALGORITHMS = ["RS256", "RS384", "RS512"] as const;
export const HMAC_ALGORITHMS = ["HS256", "HS384", "HS512"] as const;

export const ALGORITHMS = [...EC_ALGORITHMS, ...RSA_ALGORITHMS, ...HMAC_ALGORITHMS] as const;

export type ECAlgorithm = typeof EC_ALGORITHMS[number];
export type RSAAlgorithm = typeof RSA_ALGORITHMS[number];
export type HMACAlgorithm = typeof HMAC_ALGORITHMS[number];

export type Algorithm = typeof ALGORITHMS[number];
/**
 * @see https://www.rfc-editor.org/rfc/rfc7517
 */
export type JWK = JWK_EC | JWK_RSA | JWK_OCT;
export interface JWKBase {
    kty: KeyType;
    use: KeyUse;
    key_ops: KeyOperation[];
    alg?: Algorithm;
    kid?: string;
    x5u?: string;
    x5c?: string[];
    x5t?: string;
    "x5t#S256"?: string;
}
export type JWK_EC = JWK_EC_Private | JWK_EC_Public;
export type JWK_EC_Public = JWK_EC_Public_Sign | JWK_EC_Public_Encrypt;
export type JWK_EC_Private = JWK_EC_Private_Sign | JWK_EC_Private_Encrypt;
export interface JWK_EC_Public_Sign extends JWKBase {
    kty: "EC";
    use: "sig";
    key_ops: "verify"[];
    alg: ECAlgorithm;

    crv: "P-256" | "P-384" | "P-521";
    x: string;
    y: string;
}
export interface JWK_EC_Public_Encrypt extends JWKBase {
    kty: "EC";
    use: "enc";
    key_ops: ("encrypt" | "wrapKey")[];
    alg: ECAlgorithm;

    crv: "P-256" | "P-384" | "P-521";
    x: string;
    y: string;
}
export interface JWK_EC_Private_Sign extends JWKBase {
    kty: "EC";
    use: "sig";
    key_ops: ("sign" | "verify")[];
    alg: ECAlgorithm;

    crv: "P-256" | "P-384" | "P-521";
    x: string;
    y: string;
    d: string;
}
export interface JWK_EC_Private_Encrypt extends JWKBase {
    kty: "EC";
    use: "enc";
    key_ops: ("decrypt" | "unwrapKey")[];
    alg: ECAlgorithm;

    crv: "P-256" | "P-384" | "P-521";
    x: string;
    y: string;
    d: string;
}

export type JWK_RSA = JWK_RSA_Private | JWK_RSA_Public;
export type JWK_RSA_Public = JWK_RSA_Public_Sign | JWK_RSA_Public_Encrypt;
export type JWK_RSA_Private = JWK_RSA_Private_Sign | JWK_RSA_Private_Encrypt;
export interface JWK_RSA_Public_Sign extends JWKBase {
    kty: "RSA";
    use: "sig";
    key_ops: "verify"[];
    alg: RSAAlgorithm;

    n: string;
    e: string;
}

export interface JWK_RSA_Public_Encrypt extends JWKBase {
    kty: "RSA";
    use: "enc";
    key_ops: ("encrypt" | "wrapKey")[];
    alg: RSAAlgorithm;

    n: string;
    e: string;
}

export interface JWK_RSA_Private_Sign extends JWKBase {
    readonly kty: "RSA";
    readonly use: "sig";
    readonly key_ops: ("sign" | "verify")[];
    readonly alg: RSAAlgorithm;

    readonly n: string;
    readonly e: string;
    readonly d: string;
    readonly p: string;
    readonly q: string;
    readonly dp: string;
    readonly dq: string;
    readonly qi: string;
}

export interface JWK_RSA_Private_Encrypt extends JWKBase {
    readonly kty: "RSA";
    readonly use: "enc";
    readonly key_ops: ("decrypt" | "unwrapKey")[];
    readonly alg: RSAAlgorithm;

    readonly n: string;
    readonly e: string;
    readonly d: string;
    readonly p: string;
    readonly q: string;
    readonly dp: string;
    readonly dq: string;
    readonly qi: string;
}

export interface JWK_OCT extends JWKBase {
    kty: "oct";
    k: string;
}

// ! JWS DEFINITIONS

// ! JWT DEFINITIONS
export interface JWTPayloadOptions {
    readonly iss: string | undefined;
    readonly sub: string | undefined;
    readonly aud: string;
    readonly iat: Date | undefined;
    readonly nbf: Date | undefined;
    readonly jti: string | undefined;
}
export interface JWTPayloadOptionsDefault extends JWTPayloadOptions {}

export interface JWTJSONForm<
    O extends JWTPayloadOptions,
    P extends {} | undefined,
    H extends {} | undefined,
    SIG extends boolean
> {
    header: H extends {} ? H & JWTHeader : JWTHeader;
    payload: P extends {} ? P & JWTPayloadJSONForm<O> : JWTPayloadJSONForm<O>;
    signature: SIG extends true ? string : undefined;
}
export interface JWTHeader {
    readonly alg: Algorithm;
    readonly typ: "JWT";
}

export interface JWTPayload<O extends JWTPayloadOptions = JWTPayloadOptionsDefault> {
    readonly iss: O["iss"];
    readonly sub: O["sub"];
    readonly aud: O["aud"][];
    readonly exp: Date;
    readonly iat: O["iat"];
    readonly nbf: O["nbf"];
    readonly jti: O["jti"];
}

export interface JWTPayloadJSONForm<O extends JWTPayloadOptions = JWTPayloadOptionsDefault> {
    readonly iss: O["iss"];
    readonly sub: O["sub"];
    readonly aud: O["aud"][];
    readonly exp: number;
    readonly iat: O["iat"] extends Date ? number : undefined;
    readonly nbf: O["nbf"] extends Date ? number : undefined;
    readonly jti: O["jti"];
}

// ! OTHER DEFINITIONS
export const TIME_UNITS = ["seconds", "milliseconds", "mircoseconds"] as const;
export type TimeUnit = typeof TIME_UNITS[number];
export const TimeUnitsMSMultiplierMap: Record<TimeUnit, number> = {
    seconds: 0.001,
    milliseconds: 1,
    mircoseconds: 1000,
};

// ! CONSTRUCTOR OPTIONS
export interface JWTConstructorOptions<
    StandardPayloadOptions extends JWTPayloadOptions,
    AdditionalPayload extends {} | undefined,
    AdditionalHeaders extends {} | undefined,
    Signed extends boolean = true
> {
    /**
     * Algorithm used to sign the JWT
     */
    readonly algorithm: Algorithm;

    /**
     * The issuer of the JWT
     * @see https://www.rfc-editor.org/rfc/rfc7519.html#section-4.1.1
     */
    readonly issuer: StandardPayloadOptions["iss"];
    /**
     * The subject of the JWT
     * @see https://www.rfc-editor.org/rfc/rfc7519.html#section-4.1.2
     */
    readonly subject: StandardPayloadOptions["sub"];
    /**
     * The audience of the JWT
     * @see https://www.rfc-editor.org/rfc/rfc7519.html#section-4.1.3
     */
    readonly audience: StandardPayloadOptions["aud"][];
    /**
     * The time at which the JWT expires
     * @see https://www.rfc-editor.org/rfc/rfc7519.html#section-4.1.4
     */
    readonly expiration: Date;
    /**
     * The time at which the JWT becomes valid
     * @see https://www.rfc-editor.org/rfc/rfc7519.html#section-4.1.5
     */
    readonly notBefore: StandardPayloadOptions["nbf"];
    /**
     * The time at which the JWT was issued
     * @see https://www.rfc-editor.org/rfc/rfc7519.html#section-4.1.6
     */
    readonly issuedAt: StandardPayloadOptions["iat"];
    /**
     * The JWT ID
     * @see https://www.rfc-editor.org/rfc/rfc7519.html#section-4.1.7
     */
    readonly jwtID: StandardPayloadOptions["jti"];

    /**
     * The signature of the JWT encoded as a base64url string
     */
    readonly signature: Signed extends true ? string : undefined;

    /**
     * Additional headers to be added to the JWT
     */
    readonly additionalHeaders: AdditionalHeaders;

    /**
     * Additional payload to be added to the JWT
     */
    readonly additionalPayload: AdditionalPayload;
}

export interface JWTHeaderConstructorOptions<A extends {} | undefined> {
    readonly alg: Algorithm;

    readonly additionalHeaders: A;
}

export interface JWTPayloadConstructorOptions<
    AdditionalPayload extends Record<string, any> | undefined,
    StandardPayloadOptions extends JWTPayloadOptions = JWTPayloadOptionsDefault
> {
    readonly iss: StandardPayloadOptions["iss"];
    readonly sub: StandardPayloadOptions["sub"];
    readonly aud: StandardPayloadOptions["aud"][];
    readonly exp: Date;
    readonly iat: StandardPayloadOptions["iat"];
    readonly nbf: StandardPayloadOptions["nbf"];
    readonly jti: StandardPayloadOptions["jti"];

    readonly additionalPayload: AdditionalPayload;
}

// ! ISSUER
export interface IssuerOptions<O extends JWTPayloadOptions, P extends {} | undefined, H extends {} | undefined> {
    readonly additionalHeaders: H;
    readonly algorithm: Algorithm;
    readonly validTimeMs: number;
    readonly validityDelayMs: number;
    readonly nameOrUrl: O["iss"];
    readonly generateJWTID: () => O["jti"];
    readonly defaultPayload: P;
}

export interface IssueTokenOptions<O extends JWTPayloadOptions, P extends {} | undefined, H extends {} | undefined> {
    readonly audience: O["aud"][] | O["aud"] | undefined;
    readonly validTimeMsOverride?: number;
    readonly validityDelayMsOverride?: number;
    readonly subject: O["sub"];
    readonly additionalPayload: Partial<P>;
}

// ! Token manipulation interfaces
/**
 * A class that implements the Parser interface is capable of parsing tokens from their string from into their object form.
 */
export interface Parser<T> {
    /**
     * Parses a token from its string form into an object form
     * @param token The string representation of the JWT token
     */
    parseToken(token: string): Promise<T>;
}
/**
 * A class that implements the Verifier interface can verify a tokens signature.
 * A class that implements the Verifier interface also needs to implement the Parser interface.
 */
export interface Verifier<T> extends Parser<T> {
    /**
     * Verifies the token in its object form
     * @param token A token in an object form
     */
    verifyToken(token: T): Promise<boolean>;
    /**
     * Parses a token and then verifies its signature
     * @param token A token in a string form
     */
    parseThenVerifyToken(token: string): Promise<T | false>;
}

/**
 * A class that implements the Issuer interface is capable of issuing tokens.
 */
export interface Issuer<T, O> extends Verifier<T> {
    /**
     * Issues a token based on provided options
     * @param options Options for the token
     */
    issueToken(options: O): Promise<T>;
}
