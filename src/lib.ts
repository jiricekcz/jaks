import { readFileSync } from "fs";
import { VersionStringWithLibraryVersion } from "./types/jaks";

/**
 * Code identifying the library.
 */
export const LIBRARY_CODE = "jaks.ts";

/**
 * Current version of the specification.
 */
export const SPECIFICATION_VERSION = "0.0.0";

/**
 * Current version of the library.
 */
export const LIBRARY_VERSION = JSON.parse(readFileSync("package.json", "utf-8")).version; 

/**
 * Current version of the library.
 * Does not change on runtime.
 */
export const VERSION_STRING: VersionStringWithLibraryVersion = `${LIBRARY_CODE}@${LIBRARY_VERSION}-${SPECIFICATION_VERSION}`;