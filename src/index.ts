import * as standardJWT from "./standard/jwt";
import * as standardParser from "./standard/parser";
import * as standardVerifier from "./standard/verifier";
import * as standardIssuer from "./standard/issuer";
import * as typesL from "./types";
import * as utilsL from "./utils";
import * as tokenManipulationInterfacessL from "./tokenManipulationInterfaces";

/**
 * Functional classes for a standard JWT Token
 */
export const standardJWTToken = {
    /**
     * Token class
     */
    Token: standardJWT.JWTToken,
    /**
     * Token Header class
     */
    Header: standardJWT.JWTHeader,
    /**
     * Token Payload class
     */
    Payload: standardJWT.JWTPayload,
    /**
     * Parser class for the standard token
     */
    Parser: standardParser.JWTTokenParser,
    /**
     * Verifier class for the standard token
     */
    Verifier: standardVerifier.JWTTokenVerifier,
    /**
     * Issuer class for the standard token
     */
    Issuer: standardIssuer.JWTTokenIssuer,
};
/**
 * Utility functions and classes both used in the library and for external use
 */
export const utils = utilsL;
/**
 * Interfaces for the TokenParser, TokenVerifier, and TokenIssuer
 */
export const tokenManipulationInterfaces = tokenManipulationInterfacesL;

async function main(): Promise<void> {}

void main();

export default jaks;
