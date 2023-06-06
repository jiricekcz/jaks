import { TokenConfiguration } from "./tokenConfig";
import { Token as IToken } from "./token"
import { Base64Url, Format, PropFromHas, TypeFromFormat } from "./util";
import { CustomHeaderJSONSchema, CustomPayloadJSONSchema } from "../schemas/token";
import { TokenJSON } from "./tokenJSON";
import { Key } from "./jwk";

/**
 * A constructor options object for a token header.
 * @template Configuration The configuration of the token.
 * @template Token The type of the token. This must still satisfy the token configuration, but can have additional properties. This generic is provided to allow for extending the token class.
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
 * @template Configuration The configuration of the token.
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
 * A constructor options object for a token payload.
 * @template Configuration The configuration of the token.
 * @template Token The type of the token. This must still satisfy the token configuration, but can have additional properties. This generic is provided to allow for extending the token class.
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
 * @template Configuration The configuration of the token.
 * @template Token The type of the token. This must still satisfy the token configuration, but can have additional properties. This generic is provided to allow for extending the token class.
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

/**
 * A constructor options object for a token plugins.
 */
export type TokenPluginsConstructorOptions<Configuration extends TokenConfiguration, Token extends IToken<Configuration>> = {
    /**
     * Reference back to the token
     */
    readonly token: Token,
}

/**
 * A constructor options object for a token parser.
 */
export type ParserConstructorOptions<Configuration extends TokenConfiguration, Token extends IToken<Configuration>> = {
    /**
     * A custom header ZOD validator for the token.
     */
    headerSchema?: CustomHeaderJSONSchema<Configuration>;

    /**
     * A custom payload ZOD validator for the token.
     */
    payloadSchema?: CustomPayloadJSONSchema<Configuration>;

    /**
     * Creates the token from a JSON object.
     * @param json The JSON to parse the token from.
     * @returns The token.
     */
    jsonToToken: (json: TokenJSON<Configuration>) => Token,
}

/**
 * A constructor options object for a token verifier.
 */
export type VerifierConstructorOptions<Configuration extends TokenConfiguration, Token extends IToken<Configuration>> = ParserConstructorOptions<Configuration, Token> & {
    /**
     * The key to verify the token with.  
     * This can be the public key of a key pair, or a shared secret.
     */
    key: Key;
}

/**
 * Construtor options for a generic JAKS error.
 */
export type JAKSErrorConstructorOptions = {
    /**
     * The origin of the error.
     * @example "Token.toJSON()"
     */
    origin: string,
    
    /**
     * The additional message of the error.
     */
    message?: string,

    /**
     * The message to override the default message with.
     */
    messageOverride?: string,

    /**
     * The original error that was thrown.
     */
    originalError?: Error
};

/**
 * Construtor options for a JAKS parser error.
 */
export type JAKSParserErrorConstructorOptions<ParseFrom extends Format, ParseTo extends Format> = {

    /**
     * The origin of the error.
     */
    origin: string,

    /**
     * Additional message of the error.
     */
    message?: string,

    /**
     * The format that the parser was parsing from.
     */
    parseFrom: ParseFrom,

    /**
     * The format that the parser was parsing to.
     */
    parseTo: ParseTo,

    /**
     * The original value that was being parsed.
     */
    original: TypeFromFormat<ParseFrom>

    /**
     * The original error that was thrown.
     */
    originalError?: Error
}
