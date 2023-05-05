
/**
 * A version string with the library code and version.
 */
export type VersionStringWithLibraryVersion = `${string}@${string}-${string}`;

/**
 * A version string without the library code and version.
 */
export type VersionStringWithoutLibraryVersion = `${string}-${string}`;

/**
 * A version string.
 */
export type VersionString = VersionStringWithLibraryVersion | VersionStringWithoutLibraryVersion;