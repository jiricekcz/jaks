// Interfaces for classes that manipulate tokens

import { Token } from "./token";
import { TokenConfiguration } from "./tokenConfig";
import { TokenString } from "./util";

/**
 * A class that implements the parser interface can parse a string into a token.  
 * Configuration of the parser is provided by the generic type. You should provide your token configuration type.
 */
export interface Parser<Configuration extends TokenConfiguration> {
    /**
     * The parse function parses a token string into a token object.
     * @param tokenString Token string to parse.
     */
    parseToken(tokenString: TokenString): Promise<Token<Configuration>>;
}

/**
 * A class that implements the verifier interface can verify the signature of a token.  
 * Configuration of the verifier is provided by the generic type. You should provide your token configuration type.
 * A verifier needs to be able to parse the token, so it extends the parser interface.
 */
export interface Verifier<Configuration extends TokenConfiguration> extends Parser<Configuration> {
    /**
     * The verifyToken function verifies the signature of a token.
     * @param token Token to verify.
     */
    verifyToken(token: Token<Configuration>): Promise<boolean>;

    /**
     * Parses a token string to a token and then verifies the signature of the token.
     * If the parsing fails, throws an error.
     * If the verification fails, returns null.
     * @param tokenString
     */
    parseThenVerifyToken(tokenString: TokenString): Promise<Token<Configuration> | null>;
}

/**
 * A class that implements the issuer interface can issue tokens.  
 * Configuration of the issuer is provided by the generic type. You should provide your token configuration type.
 * The issuer also needs another generic type for the options to issue a token. This type isn't a part of the configuration in order to retain the abilty to make multiple different token issuers for the same token.
 * An issuer needs to be able to parse the token and also should be able to verify the token, so it extends the parser and verifier interfaces.
 */
export interface Issuer<Configuration extends TokenConfiguration, IssueOptions> extends Verifier<Configuration> {
    /**
     * Issues a signed token.
     * @param options Options to issue a token. Determined by the generic type.
     */
    issueToken(options: IssueOptions): Promise<Token<Configuration>>;
}