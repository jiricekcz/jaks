import { TokenConfiguration } from "../types/tokenConfig";
import { Token as IToken, TokenPayload as ITokenPayload } from "../types/token";
import { TokenPayloadConstructorOptions } from "../types/constructorOptions";
import { Base64Url, PropFromHas } from "../types/util";
import { toBase64Url } from "../util/base64";
import { TokenPayloadJSON } from "../types/tokenJSON";
import { TokenPluginManager } from "./plugins";

/**
 * A class that represents and manages information about the tokens payload.
 * @template Configuration The configuration of the token.
 * @template Token The type of the token.
 */
export class TokenPayload<Configuration extends TokenConfiguration, Token extends IToken<Configuration>> implements ITokenPayload<Configuration, Token> {
    /**
     * Reference back to the token that this header belongs to.
     */
    readonly token: Token;

    /**
     * The plugins that are attached to this payload.
     */
    readonly plugins: TokenPluginManager<Configuration, Token>;

    /**
     * The audience of the token.
     */
    readonly audience: Configuration["payload"]["aud"];

    /**
     * The expiration time of the token.
     */
    readonly expirationTime: Date;

    /**
     * The issuer of the token.
     */
    readonly issuer: Configuration["payload"]["iss"];   

    /**
     * The date the token was issued at.
     */
    readonly issuedAt: PropFromHas<Configuration["payload"]["hasIAT"], Date>;
    
    /**
     * The not before time of the token.
     */
    readonly notBefore: PropFromHas<Configuration["payload"]["hasNBF"], Date>;

    /**
     * The id of the token.
     */
    readonly id: Configuration["payload"]["jti"];

    /**
     * The subject of the token.
     */
    readonly subject: Configuration["payload"]["sub"];

    /**
     * Constructs a new token payload.
     * @param options Options to construct the token payload.
     */
    constructor(options: TokenPayloadConstructorOptions<Configuration, Token>) {
        this.token = options.token;

        this.subject = options.subject;
        this.issuer = options.issuer;
        this.audience = options.audience;
        this.expirationTime = options.expirationTime;
        this.notBefore = options.notBefore;
        this.issuedAt = options.issuedAt;
        this.id = options.id;

        this.plugins = this.constructPluginManager(options);
    }

    /**
     * Constructs the plugin manager for the payload.
     * @param options The options for constructing the payload
     * @returns The plugin manager for the payload.
     */
    protected constructPluginManager(options: TokenPayloadConstructorOptions<Configuration, Token>): TokenPluginManager<Configuration, Token> {
        return new TokenPluginManager({
            token: options.token
        });
    }

    toJSON(): TokenPayloadJSON<Configuration> {
        return {
            aud: this.audience,
            exp: this.expirationTime.getTime() / 1000,
            iss: this.issuer,
            iat: (
                this.issuedAt !== undefined ? this.issuedAt.getTime() / 1000 : undefined
                ) as PropFromHas<Configuration["payload"]["hasIAT"], number>, // Type cast is needed, because the typescript compiler cannot infer the type base on the expression.
            nbf: (
                this.notBefore !== undefined ? this.notBefore.getTime() / 1000 : undefined
                ) as PropFromHas<Configuration["payload"]["hasNBF"], number>, // Type cast is needed, because the typescript compiler cannot infer the type base on the expression.
            jti: this.id,
            sub: this.subject,
            plg: this.plugins.toJSON()
        }
    }

    toString(): Base64Url {
        return toBase64Url(JSON.stringify(this.toJSON()));
    }
}