// Types for JSON versions of the token

import { TokenConfiguration } from "./tokenConfig";

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

}

/**
 * A JSON representation of a token payload.
 */
export interface TokenPayloadJSON<Configuration extends TokenConfiguration> {

}

/**
 * A JSON representation of a token signature.
 */
export interface TokenSignatureJSON<Configuration extends TokenConfiguration> {

}