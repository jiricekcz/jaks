import { TokenConfiguration } from "../types/tokenConfig";
import { Token as IToken, TokenPayload as ITokenPayload } from "../types/token";
import { TokenPayloadConstructorOptions } from "../types/constructorOptions";


export class TokenPayload<Configuration extends TokenConfiguration, Token extends IToken<Configuration>> implements ITokenPayload<Configuration> {
    constructor(options: TokenPayloadConstructorOptions<Configuration, Token>) {

    }
}