// ! TIME UNITS
/**
 * Time units to milliseconds multiplier.
 * If you want to convert a time in a unit to a time in milliseconds, multiply by the value of the unit in this object.
 * @example
 * // Convert 10000 microseconds to milliseconds
 * const timeInMicroseconds = 3.5;
 * const timeInMilliseconds = timeInMicroseconds * TIME_UNITS_TO_MS_MULTIPLIER["microseconds"];
 */
export const TIME_UNITS_TO_MS_MULTIPLIER = {
    seconds: 1e-3,
    milliseconds: 1,
    microseconds: 1e3,
    nanoseconds: 1e6,
} as const;


/**
 * Time units.
 */
export type TimeUnit = keyof typeof TIME_UNITS_TO_MS_MULTIPLIER;

/**
 * Array of time units.
 */
export const TIME_UNITS = Object.keys(TIME_UNITS_TO_MS_MULTIPLIER) as ["seconds", "milliseconds", "microseconds", "nanoseconds"] satisfies TimeUnit[];

