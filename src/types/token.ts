// Types for the token itself

import { VersionString } from "./jaks";
import { Algorithm } from "./jwk";
import { TokenConfiguration } from "./tokenConfig";
import { TokenHeaderJSON, TokenJSON, TokenPayloadJSON, TokenPluginsJSON, TokenSignatureJSON } from "./tokenJSON";
import { Base64Url, PropFromHas, TokenString } from "./util";

/**
 * A token is class that represents a signed JAKS token.
 */
export interface Token<Configuration extends TokenConfiguration> {
    /**
     * The header of the token.
     */
    readonly header: TokenHeader<Configuration, this>;
    
    /**
     * The payload of the token.
     */
    readonly payload: TokenPayload<Configuration, this>;

    /**
     * The signature of the token.
     */
    readonly signature: TokenSignature<Configuration, this>;


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
export interface TokenHeader<Configuration extends TokenConfiguration, OriginalToken extends Token<Configuration>> {
    /**
     * The token that this header belongs to.
     */
    readonly token: OriginalToken;

    /**
     * The version of the token.
     */
    readonly version: VersionString;

    /**
     * The algorithm used to sign the token.
     */
    readonly algorithm: Algorithm;

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
export interface TokenPayload<Configuration extends TokenConfiguration, OriginalToken extends Token<Configuration>> {
    /**
     * The token that this payload belongs to.
     */
    readonly token: OriginalToken;

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

    /**
     * The subject of the token.
     */
    readonly subject: Configuration["payload"]["sub"];

    /**
     * The issuer of the token.
     */
    readonly issuer: Configuration["payload"]["iss"];

    /**
     * The audience of the token.
     */
    readonly audience: Configuration["payload"]["aud"];

    /**
     * The expiration time of the token.
     */
    readonly expirationTime: Date;
    
    /**
     * The not before time of the token.
     */
    readonly notBefore: PropFromHas<Configuration["payload"]["hasNBF"], Date>;

    /**
     * The issued at time of the token.
     */
    readonly issuedAt: PropFromHas<Configuration["payload"]["hasIAT"], Date>;

    /**
     * The JWT ID of the token.
     */
    readonly id: Configuration["payload"]["jti"];
}

export interface TokenSignature<Configuration extends TokenConfiguration, OriginalToken extends Token<Configuration>> {
    /**
     * The token that this signature belongs to.
     */
    readonly token: OriginalToken;

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