import { TokenConfiguration } from "./tokenConfig";
import { Token as IToken } from "./token"
import { Base64Url, PropFromHas } from "./util";

/**
 * A constructor options object for a token header.
 * @param Configuration The configuration of the token.
 * @param Token The type of the token. This must still satisfy the token configuration, but can have additional properties. This generic is provided to allow for extending the token class.
 */
export type TokenHeaderConstructorOptions<Configuration extends TokenConfiguration, Token extends IToken<Configuration>> = {
    /**
     * Reference back to the token
     */
    readonly token: Token,
    /**
     * The algorithm that the token will be signed with.
     */
    readonly algorithm: Configuration["header"]["alg"],
}

/**
 * A constructor options object for a token.
 * @param Configuration The configuration of the token.
 */
export type TokenConstructorOptions<Configuration extends TokenConfiguration> = {
    /**
     * The algorithm that the token is signed with.
     */
    readonly algorithm: Configuration["header"]["alg"],

    /**
     * Base64Url encoded string of the token signature
     */
    readonly signatureString: Base64Url,
}  

/**
 * A constructor options object for a token payload.
 * @param Configuration The configuration of the token.
 * @param Token The type of the token. This must still satisfy the token configuration, but can have additional properties. This generic is provided to allow for extending the token class.
 */
export type TokenPayloadConstructorOptions<Configuration extends TokenConfiguration, Token extends IToken<Configuration>> = {
    /**
     * Reference back to the token
     */
    readonly token: Token,

    /**
     * The subject of the token.
     */
    readonly subject: Configuration["payload"]["sub"],

    /**
     * The issuer of the token.
     */
    readonly issuer: Configuration["payload"]["iss"],

    /**
     * The audience of the token.
     */
    readonly audience: Configuration["payload"]["aud"],

    /**
     * The expiration time of the token.
     */
    readonly expirationTime: Date,

    /**
     * The time that the token was issued.
     */
    readonly issuedAt: PropFromHas<Configuration["payload"]["hasIAT"], Date>,

    /**
     * The time that the token will be valid from.
     */
    readonly notBefore: PropFromHas<Configuration["payload"]["hasNBF"], Date>,

    /**
     * The id of the token.
     */
    readonly id: Configuration["payload"]["jti"],

}

/**
 * A constructor options object for a token signature.
 * @param Configuration The configuration of the token.
 * @param Token The type of the token. This must still satisfy the token configuration, but can have additional properties. This generic is provided to allow for extending the token class.
 */
export type TokenSignatureConstructorOptions<Configuration extends TokenConfiguration, Token extends IToken<Configuration>> = {
    /**
     * Reference back to the token
     */
    readonly token: Token,

    /**
     * A Base64Url encoded string of the signature.
     */
    readonly signatureString: Base64Url,
}

export type TokenPluginsConstructorOptions<Configuration extends TokenConfiguration, Token extends IToken<Configuration>> = {
    /**
     * Reference back to the token
     */
    readonly token: Token,
}