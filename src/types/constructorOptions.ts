import { TokenConfiguration } from "./tokenConfig";
import { Token as IToken } from "./token"

/**
 * A constructor options object for a token header.
 * @param Configuration The configuration of the token.
 * 
 */
export type TokenHeaderConstructorOptions<Configuration extends TokenConfiguration, Token extends IToken<Configuration>> = {
    /**
     * Reference back to the token
     */
    readonly token: Token,
    /**
     * The algorithm that the token will be signed with.
     */
    readonly algorithm: Configuration["header"]["alg"],
}