import { TokenConfiguration } from "../types/tokenConfig";
import { Parser as IParser } from "../types/tokenManipulation";
import { Token as IToken } from "../types/token";
import { TokenString } from "../types/util";
import { fromBase64Url } from "../util/base64";

/**
 * Class, that is able to parse tokens from strings.
 */
export class Parser<Configuration extends TokenConfiguration, Token extends IToken<Configuration>> implements IParser<Configuration, Token> {
    /**
     * Constructs a new token parser.
     */
    constructor() {

    }

    async parseToken(tokenString: TokenString): Promise<Token> {
        const [headerString, payloadString, signatureString] = tokenString.split(".") as [string, string, string]; // Type cast is required, as typescript cannot infer the type of the array.
        

        const headerJSON = JSON.parse(fromBase64Url(headerString));
    
    }
}