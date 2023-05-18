import { JAKSErrorConstructorOptions } from "../types/constructorOptions";

/**
 * A Generic Error thrown by JAKS.
 */
export class JAKSError extends Error {
    /**
     * The origin of the error.
     */
    readonly origin: string;

    /**
     * If this error is a result of catching another error, this will be the original error.
     */
    readonly originalError?: Error;
    constructor(options: JAKSErrorConstructorOptions) {
        super(options.messageOverride ?? `${options.origin}: ${options.message}`);
        this.origin = options.origin;
        this.name = "JAKSError";
        this.originalError = options.originalError;

        // Set the prototype explicitly.
        Object.setPrototypeOf(this, JAKSError.prototype);

        // Capture the current stack trace.
        Error.captureStackTrace(this, JAKSError);
    }
}