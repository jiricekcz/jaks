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
        this.header = this.constructHeader(options);

        this.payload = this.constructPayload(options);

        this.signature = this.constructSignature(options);

    }

    /**
     * Constructs the header of the token.
     * @param options The constructor options of the token.
     * @returns Constructed header
     */
    protected constructHeader(options: TokenConstructorOptions<Configuration>): TokenHeader<Configuration, this> {
        return new TokenHeader<Configuration, this>({
            token: this,
            algorithm: options.algorithm,
        });
    }

    /**
     * Constructs the payload of the token.
     * @param options The constructor options of the token.
     * @returns Constructed payload
     */
    protected constructPayload(options: TokenConstructorOptions<Configuration>): TokenPayload<Configuration, this> {
        return new TokenPayload<Configuration, this>({
            token: this,
            audience: options.audience,
            expirationTime: options.expirationTime,
            id: options.id,
            issuedAt: options.issuedAt,
            issuer: options.issuer,
            notBefore: options.notBefore,
            subject: options.subject,

        });
    }

    /**
     * Constructs the signature of the token.
     * @param options The constructor options of the token.
     * @returns Constructed signature
     */
    protected constructSignature(options: TokenConstructorOptions<Configuration>): TokenSignature<Configuration, this> {
        return new TokenSignature<Configuration, this>({
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

    async isValid(): Promise<boolean> {
        // Check if the token is expired.
        if (!this.payload.isBeforeExpiration()) return false;

        // Check if the token is not yet valid.
        if (!this.payload.isAfterNotBefore()) return false;

        return true; // If all exclusion checks pass, then the token is valid.
    }

}