import { JAKSParserErrorConstructorOptions } from "../types/constructorOptions";
import { Format, TypeFromFormat } from "../types/util";
import { JAKSError } from "./jaksError";

export class ParseJAKSError<ParsingFrom extends Format, ParseTo extends Format> extends JAKSError {

    /**
     * Format that the parser was parsing from.
     */
    readonly parseFrom: ParsingFrom;
    
    /**
     * Format that the parser was parsing to.
     */
    readonly parseTo: ParseTo;

    /**
     * The original value that was being parsed.
     */
    readonly original: TypeFromFormat<ParsingFrom>;


    constructor(options: JAKSParserErrorConstructorOptions<ParsingFrom, ParseTo>) {
        super({
            origin: options.origin,
            message: `Parsing ${options.parseFrom} to ${options.parseTo} failed: ${options.message}.\n Original ${options.parseFrom}: ${options.original}`,
            originalError: options.originalError,
        });

        this.name = "ParseJAKSError";

        this.parseFrom = options.parseFrom;
        this.parseTo = options.parseTo;
        this.original = options.original;
    }
}