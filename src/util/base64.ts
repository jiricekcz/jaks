import base64url from "base64url";
import { Base64Url } from "../types/util";
/**
 * Converts a string to base64url.
 * @param string UTF-8 string to convert to base64url.
 * @returns The base64url representation of the string.
 */
export function toBase64Url(string: string): Base64Url {
    return base64url.encode(string, "utf-8") as Base64Url; // Type assertion is safe because base64url.encode returns a string that we trust is in the correct format.
}