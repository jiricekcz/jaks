import { TokenConfiguration } from "../types/tokenConfig";
import { Token as IToken } from "../types/token";
import { Verifier as IVerifier } from "../types/tokenManipulation";
import { Parser } from "../parser/parser";
import { VerifierConstructorOptions } from "../types/constructorOptions";
import { Key } from "../types/jwk";
import { verifyTokenSignature } from "../util/token";
import { TokenString } from "../types/util";

export class Verifier<Configuration extends TokenConfiguration, Token extends IToken<Configuration>> extends Parser<Configuration, Token> implements IVerifier<Configuration, Token> {
    /**
     * The key used to verify the token.
     */
    readonly key: Key;

    constructor(options: VerifierConstructorOptions<Configuration, Token>) {
        super(options);

        this.key = options.key;
    }

    async verifyToken(token: Token): Promise<boolean> {
        const tokenString = token.toString();
        const isSigantureValid = await verifyTokenSignature(tokenString, this.key);

        return isSigantureValid;
    }

    async parseThenVerifyToken(tokenString: TokenString): Promise<Token | null> {
        const parsed = await this.parseToken(tokenString); // Using the inherited method from Parser
        const isSignatureValid = await this.verifyToken(parsed);

        if (isSignatureValid) return parsed; // If the signature is valid, return the parsed token.
        else return null; // If the signature is invalid, return null.
        // If parsing fails, an error is thrown by the parseToken method. This error is propagated to the caller.
    }

    async parseThenVerifyTokenSafe(tokenString: TokenString): Promise<Token | null> {
        try { // Tries the not safe method.
            const token = await this.parseThenVerifyToken(tokenString);
            return token;
        }
        catch (error) { // If an error is thrown, return null.
            return null;
        }
    }
}