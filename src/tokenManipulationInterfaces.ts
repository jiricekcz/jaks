/**
 * A class that implements the Parser interface is capable of parsing tokens from their string from into their object form.
 */
export interface Parser<T> {
    /**
     * Parses a token from its string form into an object form
     * @param token The string representation of the JWT token
     */
    parseToken(token: string): Promise<T>;
}
/**
 * A class that implements the Verifier interface can verify a tokens signature.
 * A class that implements the Verifier interface also needs to implement the Parser interface.
 */
export interface Verifier<T> extends Parser<T> {
    /**
     * Verifies the token in its object form
     * @param token A token in an object form
     */
    verifyToken(token: T): Promise<boolean>;
    /**
     * Parses a token and then verifies its signature
     * @param token A token in a string form
     */
    parseThenVerifyToken(token: string): Promise<T | false>;
}

/**
 * A class that implements the Issuer interface is capable of issuing tokens.
 */
export interface Issuer<T, O> extends Verifier<T> {
    /**
     * Issues a token based on provided options
     * @param options Options for the token
     */
    issueToken(options: O): Promise<T>;
}