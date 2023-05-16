import { TokenConfiguration } from "../types/tokenConfig";
import { Token as IToken } from "../types/token";
import { TokenConstructorOptions } from "../types/constructorOptions";
import { TokenHeader } from "./header";
import { TokenString } from "../types/util";
import { TokenJSON } from "../types/tokenJSON";
import { TokenPayload } from "./payload";
import { TokenSignature } from "./signature";


/**
 * The class of a JAKS token. This is a final class and can be extended to make shortcuts.
 */
export class Token<Configuration extends TokenConfiguration> implements IToken<Configuration> {
    
    /**
     * The header of the token.
     */
    readonly header: TokenHeader<Configuration, this>;

    /**
     * The payload of the token.
     */
    readonly payload: TokenPayload<Configuration, this>;

    /**
     * The signature of the token.
     */
    readonly signature: TokenSignature<Configuration, this>;
    
    /**
     * Constructs a new token.
     * @param options Options to construc the token.
     */
    constructor(options: TokenConstructorOptions<Configuration>) {
        this.header = new TokenHeader<Configuration, this>({
            token: this,
            algorithm: options.algorithm,
        });

        this.payload = new TokenPayload<Configuration, this>({
            token: this,
        });

        this.signature = new TokenSignature<Configuration, this>({
            token: this,
            signatureString: options.signatureString,
        });

    }

    /**
     * Converts the token to string.
     * @returns The JSON representation of the token as a string.
     */
    toString(): TokenString {
        return `${this.header.toString()}.${this.payload.toString()}.${this.signature.toString()}`;
    }

    /**
     * Converts the token to JSON.
     * @returns The JSON representation of the token.
     */
    toJSON(): TokenJSON<Configuration> {
        return {
            header: this.header.toJSON(),
            payload: this.payload.toJSON(),
            signature: this.signature.toJSON(),
        }
    }

}