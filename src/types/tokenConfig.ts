// Types regrading JAKS token configuration

import { Algorithm } from "./jwk";
import { StringOrURI } from "./util";

/**
 * Type that allows you to create a completly custom configuration for a token while still providing full type checking.  
 * Most of the time, you won't need to use this type directly, as there are many helper types, that can assist you in creating the token configuration type.
 */
export type CustomTokenConfiguration<Configuration extends TokenConfiguration> = Configuration;

/**
 * Type configuration of the header of a token.
 * By extending this type, you create a specific token header configuration, that can then provide comprehensive type signatures for all of its elements.
 */
export type TokenHeaderConfiguration = {
    /**
     * Algorithm used to sign the token.
     */
    alg: Algorithm;
};

/**
 * Type configuration of the default payload of a token.
 * By extending this type, you create a specific token payload configuration, that can then provide comprehensive type signatures for all of its elements.
 * This is just a type agregate. You should **never** create objects of this type 
 */
export type TokenPayloadConfiguration = { 
    /**
     * Issuer of the token.
     * Must be specified as by the JAKS specification.
     */
    iss: StringOrURI;

    /**
     * Subject of the token.  
     * Must be specified as by the JAKS specification.
     */
    sub: StringOrURI;

    /**
     * Audience of the token.
     * Must be specified as by the JAKS specification.
     */
    aud: StringOrURI;

    /**
     * Weather the token has issued at time.
     */
    hasIAT: boolean;

    /**
     * Weather the token has a not before time.
     */
    hasNBF: boolean;

    /**
     * The id of the token
     */
    jti: string | undefined;
};

/**
 * Type configuration of the plugins of a token.
 * By extending this type, you create a specific token plugins configuration, that can then provide comprehensive type signatures for all of its elements.
 * This type provides information on what plugins are configured for a token and with what configuration.
 */
export type TokenPluginsConfiguration = {

};

/**
 * The full configuration of a token. 
 * By extending this type, you create a specific token configuration, that can then provide comprehensive type signatures for all of its elements.  
 * This is just a type agregate. You should **never** create objects of this type.
 */
export type TokenConfiguration = {
    /**
     * Configuration of the header of the token.
     */
    header: TokenHeaderConfiguration;
    /**
     * Configuration of the default payload of the token.
     * These are mostly values specified in the JWT standard.
     */
    payload: TokenPayloadConfiguration;
    /**
     * Configuration of the plugins of the token.
     */
    plugins: TokenPluginsConfiguration;
};


