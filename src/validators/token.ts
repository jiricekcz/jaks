import zod from "zod";
import { TokenHeaderJSON } from "../types/tokenJSON";
import { TokenConfiguration } from "../types/tokenConfig";
import { ALGORITHMS } from "../types/jwk";
import { VERSION_STRING_REGEX } from "../lib";

/**
 * The default schema for the header of a token.
 */
export const headerJSONDefaultSchema: CustomHeaderJSONSchema<TokenConfiguration> = zod.object<{
    [key in keyof TokenHeaderJSON<TokenConfiguration>]: zod.Schema<TokenHeaderJSON<TokenConfiguration>[key]>
}>({
    alg: zod.enum(ALGORITHMS),
    jaks: zod.string().regex(VERSION_STRING_REGEX) as zod.Schema<TokenHeaderJSON<TokenConfiguration>["jaks"]> // Cast is required because you cannot infer type from regex.
})

/**
 * Type for a custom header schema.
 */
export type CustomHeaderJSONSchema<Configuration extends TokenConfiguration> = zod.Schema<TokenHeaderJSON<Configuration>>;

