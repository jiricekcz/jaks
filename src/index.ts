import * as standardJWT from "./standard/jwt";
import * as standardParser from "./standard/parser";
import * as standardVerifier from "./standard/verifier";
import * as standardIssuer from "./standard/issuer";

/**
 * Functional classes for a standard JWT Token
 */
export const standardJWTToken = {
    Token: standardJWT.JWTToken,
    Header: standardJWT.JWTHeader,
    Payload: standardJWT.JWTPayload,
    Parser: standardParser.JWTTokenParser,
    Verifier: standardVerifier.JWTTokenVerifier,
    Issuer: standardIssuer.JWTTokenIssuer,
};

async function main(): Promise<void> {
    
}

void main();