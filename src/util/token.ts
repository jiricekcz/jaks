import  jose  from "jose";
import { Key } from "../types/jwk";
import { TokenString } from "../types/util";

/**
 * Verifies the signature of a token.
 * @param tokenString String representation of a token.
 * @param key The key to verify the token with.
 * @returns Promise that resolves to true if the token is valid, false otherwise.
 */
export async function verifyTokenSignature(tokenString: TokenString, key: Key): Promise<boolean> {
    try {
        const result = await jose.jwtVerify(tokenString, key); // Using jose for cryptography
        return result != undefined;
    } catch (error) {
        return false; // We do not care why the verification failed, just that it did.
    }

}