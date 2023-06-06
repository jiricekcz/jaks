
/**
 * A type union of different types, that can describe a matching pattern.  
 * Possible matching patterns are:
 * - A single value of a type - This matches, when the value is strictly equal (===) to the value being matched.
 * - An array of matching patterns of a type - This matches, when one of the patterns in the array matches the value being matched.
 * - A set of values of a type - This matches, when the value the set includes the value being matched.
 * - A matching function - This matches, when the function returns true, when called with the value being matched.
 * - An object with a function with name `has`, `includes` or `contains` - This matches, when the function returns true, when called with the value being matched.
 * - A regular expression - This matches, when the regular expression matches the value being matched. This can be used only with a string type.
 */
export type MatchingPattern<Type> =
    | Type // A single value of such type
    | MatchingPattern<Type>[] // An array of matching patterns of such type
    | Set<Type> // A set of values of such type
    | ((value: Type) => boolean) // A function that returns true, when the value matches the pattern.
    | HasHas<Type> // An object that has a has function that returns true, when the value matches the pattern.
    | HasIncludes<Type> // An object that has an includes function that returns true, when the value matches the pattern.
    | HasContains<Type> // An object that has a contains function that returns true, when the value matches the pattern.
    | Type extends string ? RegExp : never; // A regular expression, if the type is a string.


/**
 * A function, that can match a type
 */
export type Matcher<Type> = (value: Type) => boolean;

/**
 * Class, that has a `has` function, that returns boolean.
 */
export interface HasHas<Type> {
    has: (value: Type) => boolean;
}

/**
 * Class, that has a `includes` function, that returns boolean.
 */
export interface HasIncludes<Type> {
    includes: (value: Type) => boolean;
}

/**
 * Class, that has a `contains` function, that returns boolean
 */
export interface HasContains<Type> {
    contains: (value: Type) => boolean;
}

/**
 * Checks, if a given value matches a given matching pattern.  
 * This function has limitations, some include:
 * - It only checks for strict equality (===) for all types. To force other behavior, you can use a matching function.
 * - It cannot match any circular structures or arrays with `BigInt` types. This is because it uses `JSON.stringify` to check, if the value matches the pattern.
 * @param matchingPattern The matching pattern to match the value against.
 * @param value The value to match against the matching pattern.
 */
export function matches<Type>(matchingPattern: MatchingPattern<Type>, value: Type) {
    // We check, if the matching pattern matches the value
    if (matchingPattern === value) {
        return true; // This check is first, because it is one of the most common ones.
    }

    // If the matching pattern is a set, we check, if the set includes the value.
    if (matchingPattern instanceof Set) {
        if (matchingPattern.has(value)) {
            return true; // This is a quick check, so it is second in the order.
        }
    }

    // If the matching pattern is a function, we call the function with the value and check, if the function returns true.
    if (matchingPattern instanceof Function) {
        try {
            if (matchingPattern(value)) {
                return true;
            }
        } catch (error) {
            // We swallow the error, because we don't want to crash the program, if the function throws an error.
            // If the function thorws, it doesn't match the value.
        }
    }

    // If the matching pattern is a regex and the value is a string, we check, if the regex matches the string.
    if (matchingPattern instanceof RegExp && typeof value === "string") {
        if (matchingPattern.test(value)) {
            return true;
        }
    } 

    // If the matching pattern has a `has` function, we call the function with the value and check, if the function returns true.
    if (typeof matchingPattern === "object" && "has" in matchingPattern && matchingPattern.has instanceof Function) {
        try {
            if (matchingPattern.has(value)) {
                return true;
            }
        } catch (error) {
            // We swallow the error, because we don't want to crash the program, if the function throws an error.
            // If the function thorws, it doesn't match the value.
        }
    }

    // If the matching pattern has an `includes` function, we call the function with the value and check, if the function returns true.
    if (typeof matchingPattern === "object" && "includes" in matchingPattern && matchingPattern.includes instanceof Function) {
        try {
            if (matchingPattern.includes(value)) {
                return true;
            }
        } catch (error) {
            // We swallow the error, because we don't want to crash the program, if the function throws an error.
            // If the function thorws, it doesn't match the value.
        }
    }

    // If the matching pattern has a `contains` function, we call the function with the value and check, if the function returns true.
    if (typeof matchingPattern === "object" && "contains" in matchingPattern && matchingPattern.contains instanceof Function) {
        try {
            if (matchingPattern.contains(value)) {
                return true;
            }
        } catch (error) {
            // We swallow the error, because we don't want to crash the program, if the function throws an error.
            // If the function thorws, it doesn't match the value.
        }
    }

    // If the matching pattern is an array, we loop through the array and check, if the value matches any of the patterns in the array.
    if (Array.isArray(matchingPattern) && !isCircular(matchingPattern)) { // If the array is circular, we can't check, if the value matches the pattern, because we could end up in an infinite loop.
        for (const subMatchingPattern of matchingPattern) {
            if (matches(subMatchingPattern, value)) { 
                return true; // This check is the last, as it is the most expensive one.
            }
        }
    } // No need for else, since we might have an array as a type, so other checks need to continue.

    // If none of the checks returned true, the value doesn't match the pattern.
    return false;
}

/**
 * A function, that creates a function, that matches a value against a matching pattern.
 * @param matchingPattern The matching pattern to match the value against.
 * @returns A function that matches a value against the matching pattern.
 */
export function createMatcher<Type>(matchingPattern: MatchingPattern<Type>): Matcher<Type> {
    return function(value: Type): boolean {
        return matches(matchingPattern, value);
    }
}

/**
 * Checks, if an object is circular using `JSON.stringify`.
 * @param object An object
 * @returns If the object is circular
 */
export function isCircular(object: any): boolean {
    try {
        JSON.stringify(object);
        return false;
    }
    catch (error) {
        return true;
    }
}