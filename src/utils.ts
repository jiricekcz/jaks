import { JWTHeader, JWTPayload } from "./jwt";
import { Algorithm, ALGORITHMS } from "./types";

export function isValidAlgorithm(alg: unknown): alg is Algorithm {
    if (typeof alg !== "string") return false;
    return ALGORITHMS.includes(alg as Algorithm);
}

export function filterObject<T extends {}, R extends {} = Partial<T>>(
    obj: T,
    selector: (key: keyof T, value: T[keyof T]) => boolean // eslint-disable-line no-unused-vars
): R {
    const filtered: Partial<T> = {};
    for (const key in obj) {
        if (selector(key, obj[key])) {
            filtered[key] = obj[key];
        }
    }
    return filtered as R;
}

export function getSignableString(header: JWTHeader<any>, payload: JWTPayload<any, any>): string {
    return `${header.toString()}.${payload.toString()}`;
}
export function roundDecPlaces(num: number, places: number): number {
    const multiplier = 10 ** places;
    return Math.round(num * multiplier) / multiplier;
}
