// Types for JSON versions of the token

import { VersionString } from "./jaks";
import { TokenConfiguration } from "./tokenConfig";
import { Base64Url, PropFromHas } from "./util";

/**
 * A JSON representation of a token.
 */
export interface TokenJSON<Configuration extends TokenConfiguration> {
    /**
     * The header of the token.
     */
    header: TokenHeaderJSON<Configuration>;
    /**
     * The payload of the token.
     */
    payload: TokenPayloadJSON<Configuration>;
    /**
     * The signature of the token.
     */
    signature: TokenSignatureJSON<Configuration>;
}

/**
 * A JSON representation of a token header.
 */
export interface TokenHeaderJSON<Configuration extends TokenConfiguration> {
    /**
     * Algorithm used to sign the token.
     */
    "alg": Configuration["header"]["alg"];
    
    /**
     * JAKS version string.
     */
    "jaks": VersionString;
}

/**
 * A JSON representation of a token payload.
 */
export interface TokenPayloadJSON<Configuration extends TokenConfiguration> {

    /**
     * Issuer of the token.
     * @see https://www.rfc-editor.org/rfc/rfc7519.html#section-4.1.1
     */
    "iss": Configuration["payload"]["iss"];

    /**
     * Subject of the token.
     * @see https://www.rfc-editor.org/rfc/rfc7519.html#section-4.1.2
     */
    "sub": Configuration["payload"]["sub"];

    /**
     * Audience of the token.
     * @see https://www.rfc-editor.org/rfc/rfc7519.html#section-4.1.3
     */
    "aud": Configuration["payload"]["aud"];

    /**
     * Expiration time of the token.
     * Provided in seconds since the Unix epoch.
     * @see https://www.rfc-editor.org/rfc/rfc7519.html#section-4.1.4
     */
    "exp": number;

    /**
     * Not before time of the token.
     * Provided in seconds since the Unix epoch.
     * @see https://www.rfc-editor.org/rfc/rfc7519.html#section-4.1.5
     */
    "nbf": PropFromHas<Configuration["payload"]["hasNBF"], number>;

    /**
     * Issued at time of the token.
     * Provided in seconds since the Unix epoch.
     * @see https://www.rfc-editor.org/rfc/rfc7519.html#section-4.1.6
     */
    "iat": PropFromHas<Configuration["payload"]["hasIAT"], number>;

    /**
     * JWT ID of the token.
     * @see https://www.rfc-editor.org/rfc/rfc7519.html#section-4.1.7
     */
    "jti": Configuration["payload"]["jti"];

    /**
     * JAKS plugins of the token and their data.
     */
    "plg": TokenPluginsJSON<Configuration>;
}

/**
 * A JSON representation of a token signature.
 */
export interface TokenSignatureJSON<Configuration extends TokenConfiguration> {
    /**
     * The signature of the token.
     */
    signature: Base64Url;
}


export interface TokenPluginsJSON<Configuration extends TokenConfiguration> {

}