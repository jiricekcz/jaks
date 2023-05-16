import { TokenConfiguration } from "./tokenConfig";
import { Token as IToken } from "./token"
import { Base64Url } from "./util";

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
    algorithm: Configuration["header"]["alg"],
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