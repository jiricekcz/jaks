import { LIBRARY_CODE } from "../lib";

/**
 * A version string with the library code and version.
 */
export type VersionStringWithLibraryVersion = `${typeof LIBRARY_CODE}@${string}-${string}`;

/**
 * A version string without the library code and version.
 */
export type VersionStringWithoutLibraryVersion = `${typeof LIBRARY_CODE}-${string}`;

/**
 * A version string.
 */
export type VersionString = VersionStringWithLibraryVersion | VersionStringWithoutLibraryVersion;