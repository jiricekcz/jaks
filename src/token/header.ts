import { TokenConfiguration } from "../types/tokenConfig";
import { TokenHeader as ITokenHeader } from "../types/token";
import { TokenHeaderConstructorOptions } from "../types/constructorOptions";
import { Token as IToken } from "../types/token";
import { Base64Url } from "../types/util";
import { toBase64Url } from "../util/base64";
import { TokenHeaderJSON } from "../types/tokenJSON";
import { VersionString } from "../types/jaks";
import { VERSION_STRING } from "../lib";


/**
 * The header manager of a standard JAKS token.  
 * This class should not be instantiated by a library user directly.
 * @template Configuration The configuration of the token.
 * @template Token The type of the token. This must still satisfy the token configuration, but can have additional properties. This generic is provided to allow for extending the token class.
 */
export class TokenHeader<Configuration extends TokenConfiguration, Token extends IToken<Configuration>> implements ITokenHeader<Configuration>{
    /**
     * Reference back to the token that this header belongs to.
     */
    readonly token: Token;

    /**
     * The algorithm that the token is signed with.
     */
    readonly algorithm: Configuration["header"]["alg"];

    /**
     * Constructs a token header manager.
     * @param options Options to construct the token header.
     */
    constructor(options: TokenHeaderConstructorOptions<Configuration, Token>) {
        this.token = options.token;
        this.algorithm = options.algorithm;
    }

    /**
     * The jaks version string of the token. This value is not configurable.
     */
    get version(): VersionString {
        return VERSION_STRING;
    }

    /**
     * Converts the header to a JSON object.
     * @returns The header of the token as a JSON object.
     */
    public toJSON(): TokenHeaderJSON<Configuration> {
        return {
            jaks: this.version,
            alg: this.algorithm,
        }
    }

    /**
     * Converts the header to a Base64Url representation.
     * @returns The header of the token as a Base64Url string.
     */
    public toString(): Base64Url {
        return toBase64Url(JSON.stringify(this.toJSON()));
    }

}