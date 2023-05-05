// Types for the token itself

import { TokenConfiguration } from "./tokenConfig";
import { TokenHeaderJSON, TokenJSON, TokenPayloadJSON, TokenPluginsJSON, TokenSignatureJSON } from "./tokenJSON";
import { Base64Url, TokenString } from "./util";

/**
 * A token is class that represents a signed JAKS token.
 */
export interface Token<Configuration extends TokenConfiguration> {
    /**
     * The header of the token.
     */
    readonly header: TokenHeader<Configuration>;
    
    /**
     * The payload of the token.
     */
    readonly payload: TokenPayload<Configuration>;

    /**
     * The signature of the token.
     */
    readonly signature: TokenSignature<Configuration>;


    /**
     * Converts the token to a JSON representation.
     */
    toJSON(): TokenJSON<Configuration>;

    /**
     * Converts the token to a string representation.
     * This is the standard representation of a JWT token.
     */
    toString(): TokenString;
}

/**
 * A class that represents and manages information about the tokens header.
 */
export interface TokenHeader<Configuration extends TokenConfiguration> {
    /**
     * The token that this header belongs to.
     */
    readonly token: Token<Configuration>;

    /**
     * Converts the header to a JSON representation.
     */
    toJSON(): TokenHeaderJSON<Configuration>;

    /**
     * Converts the header to a string representation.
     */
    toString(): Base64Url;
}

/**
 * A class that represents and manages information about the tokens payload.
 */
export interface TokenPayload<Configuration extends TokenConfiguration> {
    /**
     * The token that this payload belongs to.
     */
    readonly token: Token<Configuration>;

    /**
     * The plugins that are attached to this payload.
     */
    readonly plugins: TokenPluginManager<Configuration>;

    /**
     * Converts the payload to a JSON representation.
     */
    toJSON(): TokenPayloadJSON<Configuration>;
    
    /**
     * Converts the payload to a string representation.
     */
    toString(): Base64Url;

}

export interface TokenSignature<Configuration extends TokenConfiguration> {
    /**
     * The token that this signature belongs to.
     */
    readonly token: Token<Configuration>;

    /**
     * Converts the signature to a JSON representation.
     */
    toJSON(): TokenSignatureJSON<Configuration>;

    /**
     * Converts the signature to a string representation.
     */
    toString(): Base64Url;
}

export interface TokenPluginManager<Configuration extends TokenConfiguration> {
    /**
     * The token that this plugin manager belongs to.
     */
    readonly token: Token<Configuration>;

    /**
     * Converts the plugin manager to a JSON representation.
     */
    toJSON(): TokenPluginsJSON<Configuration>;
}