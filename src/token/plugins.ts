import { TokenConfiguration } from "../types/tokenConfig";
import { Token as IToken, TokenPluginManager as ITokenPluginManager } from "../types/token";
import { TokenPluginsConstructorOptions } from "../types/constructorOptions";
import { TokenPluginsJSON } from "../types/tokenJSON";

/**
 * A class that represents and manages information about the tokens payload using token plugins.
 */
export class TokenPluginManager<Configuration extends TokenConfiguration, Token extends IToken<Configuration>> implements ITokenPluginManager<Configuration> {
    /**
     * The token that this plugin manager belongs to.
     */
    readonly token: Token;
    
    /**
     * Constructs a new token plugin manager.
     * @param options The options to create the token plugin manager.
     */
    constructor(options: TokenPluginsConstructorOptions<Configuration, Token>) {
        this.token = options.token;
    }

    toJSON(): TokenPluginsJSON<Configuration> {
        return {

        }
    }
}