import { TokenConfiguration } from "../types/tokenConfig";
import { TokenHeader as ITokenHeader } from "../types/token";
import { TokenHeaderConstructorOptions } from "../types/constructorOptions";
import { Token as IToken } from "../types/token";


/**
 * The header manager of a standard JAKS token.  
 * This class should not be instantiated by a library user directly.
 * @param Configuration The configuration of the token.
 * @param Token The type of the token. This must still satisfy the token configuration, but can have additional properties. This generic is provided to allow for extending the token class.
 */
export class TokenHeader<Configuration extends TokenConfiguration, Token extends IToken<Configuration>> implements ITokenHeader<Configuration> {
    /**
     * Reference back to the token that this header belongs to.
     */
    readonly token: Token;
    /**
     * Constructs a token header manager.
     * @param options Options to construct the token header.
     */
    constructor(options: TokenHeaderConstructorOptions<Configuration, Token>) {
        this.token = options.token;
    }
}