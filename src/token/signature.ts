import { TokenConfiguration } from "../types/tokenConfig";
import { Token as IToken } from "../types/token";
import { TokenSignatureConstructorOptions } from "../types/constructorOptions";
import { TokenSignature as ITokenSignature } from "../types/token";
import { Base64Url } from "../types/util";
import { TokenSignatureJSON } from "../types/tokenJSON";

/**
 * A class that represents and manages information about the tokens signature.
 * @template Configuration The configuration of the token.
 * @template Token The type of the token.
 */
export class TokenSignature<Configuration extends TokenConfiguration, Token extends IToken<Configuration>> implements ITokenSignature<Configuration> {
    /**
     * A Base64Url encoded string of the signature.
     */
    protected readonly signatureString: Base64Url;

    /**
     * The token that this signature belongs to.
     */
    public readonly token: Token;

    /**
     * Constructs a new token signature.
     * @param options The options to create the signature.
     */
    constructor(options: TokenSignatureConstructorOptions<Configuration, Token>) {
        this.signatureString = options.signatureString;
        this.token = options.token;
    }

    /**
     * Converts the token signature to string.
     * @returns The string representation of the token signature.
     */
    toString(): string {
        return this.signatureString;
    }

    /**
     * Converts the token signature to JSON.
     * @returns The JSON representation of the token signature.
     */
    toJSON(): TokenSignatureJSON<Configuration> {
        return {
            signature: this.toString()
        }
    }
}