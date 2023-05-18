// Interfaces for classes that manipulate tokens

import { Token as IToken } from "./token";
import { TokenConfiguration } from "./tokenConfig";
import { TokenString } from "./util";

/**
 * A class that implements the parser interface can parse a string into a token.  
 * Configuration of the parser is provided by the generic type. You should provide your token configuration type.
 */
export interface Parser<Configuration extends TokenConfiguration, Token extends IToken<Configuration>> {
    /**
     * The parse function parses a token string into a token object.
     * @param tokenString Token string to parse.
     */
    parseToken(tokenString: TokenString): Promise<Token>;
}

/**
 * A class that implements the verifier interface can verify the signature of a token.  
 * Configuration of the verifier is provided by the generic type. You should provide your token configuration type.
 * A verifier needs to be able to parse the token, so it extends the parser interface.
 */
export interface Verifier<Configuration extends TokenConfiguration, Token extends IToken<Configuration>> extends Parser<Configuration, Token> {
    /**
     * The verifyToken function verifies the signature of a token.
     * @param token Token to verify.
     */
    verifyToken(token: Token): Promise<boolean>;

    /**
     * Parses a token string to a token and then verifies the signature of the token.
     * If the parsing fails, throws an error.
     * If the verification fails, returns null.
     * @param tokenString
     */
    parseThenVerifyToken(tokenString: TokenString): Promise<Token| null>;
}

/**
 * A class that implements the issuer interface can issue tokens.  
 * Configuration of the issuer is provided by the generic type. You should provide your token configuration type.
 * The issuer also needs another generic type for the options to issue a token. This type isn't a part of the configuration in order to retain the abilty to make multiple different token issuers for the same token.
 * An issuer needs to be able to parse the token and also should be able to verify the token, so it extends the parser and verifier interfaces.
 */
export interface Issuer<Configuration extends TokenConfiguration, Token extends IToken<Configuration>, IssueOptions> extends Verifier<Configuration, Token> {
    /**
     * Issues a signed token.
     * @param options Options to issue a token. Determined by the generic type.
     */
    issueToken(options: IssueOptions): Promise<Token>;
}