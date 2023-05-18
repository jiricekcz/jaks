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

/**
 * A regular expression that matches a version string.  
 * This can be a version string of any library with any version.  
 * The version string must be in the format: `libraryCode@libraryVersion-specificationVersion`.
 * Where libraryCode is a string of any characters except for `@` and `-`, libraryVersion is a valid version string in the format of number.number.number, and specificationVersion is a valid version string in the format of number.number.number.
 */
export const VERSION_STRING_WITH_VERSION_REGEX = new RegExp(`^[^@]+@\\d+\\.\\d+\\.\\d+-\\d+\\.\\d+\\.\\d+$`);

/**
 * A regular expression that matches a version string.  
 * This can be a version string of any library with any version.  
 * The version string must be in the format: `libraryCode-specifiactionVersion`.
 * Where libraryCode is a string of any characters except for `-` and `@`, and specificationVersion is a valid version string in the format of number.number.number.
 */
export const VERSION_STRING_WITHOUT_VERSION_REGEX = new RegExp(`^[^-@]+-\\d+\\.\\d+\\.\\d+$`);

/**
 * A regular expression that matches a version string.
 */
export const VERSION_STRING_REGEX = new RegExp(`^${VERSION_STRING_WITH_VERSION_REGEX.source}|${VERSION_STRING_WITHOUT_VERSION_REGEX.source}$`);