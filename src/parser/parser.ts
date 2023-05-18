import { TokenConfiguration } from "../types/tokenConfig";
import { Parser as IParser } from "../types/tokenManipulation";
import { Token as IToken } from "../types/token";
import { TokenString } from "../types/util";
import { fromBase64Url } from "../util/base64";
import { ParserConstructorOptions } from "../types/constructorOptions";
import { CustomHeaderJSONSchema, CustomPayloadJSONSchema, headerJSONDefaultSchema, payloadJSONDefaultSchema, signatureStringSchema } from "../validators/token";
import { ParseJAKSError } from "../errors/parseError";
import { TokenHeaderJSON, TokenJSON, TokenPayloadJSON, TokenSignatureJSON } from "../types/tokenJSON";

/**
 * Class, that is able to parse tokens from strings.
 */
export class Parser<Configuration extends TokenConfiguration, Token extends IToken<Configuration>> implements IParser<Configuration, Token> {
    
    /**
     * The schema for the header of a token.
     */
    protected readonly headerSchema: CustomHeaderJSONSchema<TokenConfiguration>;

    /**
     * The schema for the payload of a token.
     */
    protected readonly payloadSchema: CustomPayloadJSONSchema<TokenConfiguration>;

    /**
     * Creates the token from a JSON object.
     */
    protected readonly jsonToToken: (json: TokenJSON<Configuration>) => Token;
    /**
     * Constructs a new token parser.
     */
    constructor(options: ParserConstructorOptions<Configuration, Token>) {
        this.headerSchema = options.headerSchema ?? headerJSONDefaultSchema;
        this.payloadSchema = options.payloadSchema ?? payloadJSONDefaultSchema;
        this.jsonToToken = options.jsonToToken;
    }

    async parseToken(tokenString: TokenString): Promise<Token> {
        const [headerString, payloadString, signatureString] = tokenString.split(".") as [string, string, string]; // Type cast is required, as typescript cannot infer the type of the array.

        if (!headerString || !payloadString || !signatureString) throw new ParseJAKSError<"string", "string">({
            message: "Token string is not valid.",
            origin: "Parser.parseToken()",
            original: tokenString,
            parseFrom: "string",
            parseTo: "string",
        });

        const headerParse = this.headerSchema.safeParse(JSON.parse(fromBase64Url(headerString)));
        if (!headerParse.success) {
            throw new ParseJAKSError<"Base64Url", "JSON">({
                message: "Token header is not valid JSON for a header.",
                origin: "Parser.parseToken()",
                original: headerString,
                parseFrom: "Base64Url",
                parseTo: "JSON",
                originalError: headerParse.error
            });
        }
        const headerJSON = headerParse.data as TokenHeaderJSON<Configuration>; // Type cast allows for not as strict and demanding validation
        
        const payloadParse = this.payloadSchema.safeParse(JSON.parse(fromBase64Url(payloadString)));
        if (!payloadParse.success) {
            throw new ParseJAKSError<"Base64Url", "JSON">({
                message: "Token payload is not valid JSON for a payload.",
                origin: "Parser.parseToken()",
                original: payloadString,
                parseFrom: "Base64Url",
                parseTo: "JSON",
                originalError: payloadParse.error
            });
        }
        const payloadJSON = payloadParse.data as TokenPayloadJSON<Configuration>; // Type cast allows for not as strict and demanding validation

        const signatureParse = signatureStringSchema.safeParse(fromBase64Url(headerString));
        if (!signatureParse.success) {
            throw new ParseJAKSError<"Base64Url", "Base64Url">({
                message: "Token signature is not valid JSON for a signature.",
                origin: "Parser.parseToken()",
                original: signatureString,
                parseFrom: "Base64Url",
                parseTo: "Base64Url",
                originalError: signatureParse.error
            });
        }
        const signatureJSON: TokenSignatureJSON<Configuration> = {
            signature: signatureParse.data,
        };

        const json: TokenJSON<Configuration> = {
            header: headerJSON,
            payload: payloadJSON,
            signature: signatureJSON,
        }

        return this.jsonToToken(json);

    }
}