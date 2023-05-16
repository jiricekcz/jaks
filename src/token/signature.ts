import { TokenConfiguration } from "../types/tokenConfig";
import { Token as IToken } from "../types/token";
import { TokenSignatureConstructorOptions } from "../types/constructorOptions";

export class TokenSignature<Configuration extends TokenConfiguration, Token extends IToken<Configuration>> {
    /**
     * Constructs a new token signature.
     * @param options The options to create the signature.
     */
    constructor(options: TokenSignatureConstructorOptions<Configuration, Token>) {

    }
}