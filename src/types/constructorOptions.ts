import { TokenConfiguration } from "./tokenConfig";
import { Token as IToken } from "./token"

/**
 * A constructor options object for a token header.
 * @param Configuration The configuration of the token.
 * 
 */
export type TokenHeaderConstructorOptions<Configuration extends TokenConfiguration, Token extends IToken<Configuration>> = {
    readonly token: Token,
}