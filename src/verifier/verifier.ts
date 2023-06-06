import { TokenConfiguration } from "../types/tokenConfig";
import { Token as IToken } from "../types/token";
import { Verifier as IVerifier } from "../types/tokenManipulation";
import { Parser } from "../parser/parser";
import { VerifierConstructorOptions } from "../types/constructorOptions";

export class Verifier<Configuration extends TokenConfiguration, Token extends IToken<Configuration>> extends Parser<Configuration, Token> implements IVerifier {
    constructor(options: VerifierConstructorOptions<Configuration, Token>) {
        super(options);

    }
}