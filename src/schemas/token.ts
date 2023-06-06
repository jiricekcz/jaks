import zod from "zod";
import { TokenHeaderJSON, TokenPayloadJSON } from "../types/tokenJSON";
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

/**
 * The default schema for the payload of a token.
 */
export const payloadJSONDefaultSchema: CustomPayloadJSONSchema<TokenConfiguration> = zod.object<{
    [key in keyof TokenPayloadJSON<TokenConfiguration>]: zod.Schema<TokenPayloadJSON<TokenConfiguration>[key]>
}>({
    iss: zod.string(),
    sub: zod.string(),
    aud: zod.string(),
    exp: zod.number(),
    iat: zod.number().optional(),
    nbf: zod.number().optional(),
    jti: zod.string(),
    plg: zod.any().optional()
}) as zod.Schema<TokenPayloadJSON<TokenConfiguration>>; // For some reason, the cast is required here. If fix is found, please fix.

/**
 * Type for a custom payload schema.
 */
export type CustomPayloadJSONSchema<Configuration extends TokenConfiguration> = zod.Schema<TokenPayloadJSON<Configuration>>;


/**
 * The default schema for the signature string of a token.
 */
export const signatureStringSchema = zod.string().regex(/^[a-zA-Z0-9_-]+$/);
