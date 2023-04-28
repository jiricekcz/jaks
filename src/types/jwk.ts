/**
 * JWK Type definitions
 */

import * as jose from "jose";

// ! Type and use of JWKs

/**
 * Key type  
 * `jose.KeyLike` for NodeJS  
 * `Uint8Array` for Browser
 */
export type Key = jose.KeyLike | Uint8Array;

/**
 * Availible string identifiers for key types  
 * Used as the `kty` property in JWKs
 * @see https://www.rfc-editor.org/rfc/rfc7517#section-4.1
 */
export const KEY_TYPES = ["EC", "RSA", "oct"] as const;
/**
 * Union of all key types to be used the `kty` property
 * @see https://www.rfc-editor.org/rfc/rfc7517#section-4.1
 */
export type KeyType = typeof KEY_TYPES[number];

/**
 * Availible string identifiers for key uses
 * Used as the `use` property in JWKs
 * @see https://www.rfc-editor.org/rfc/rfc7517#section-4.2
 */
export const KEY_USES = ["sig", "enc"] as const;
/**
 * Union of all key uses to be used the `use` property
 * @see https://www.rfc-editor.org/rfc/rfc7517#section-4.2
 */
export type KeyUse = typeof KEY_USES[number];

// ! Key Operations

/**
 * Availible string identifiers for key operations performed by a public key
 * Used as the `key_ops` property in JWKs
 * @see https://www.rfc-editor.org/rfc/rfc7517#section-4.3
 */
export const PUBLIC_KEY_OPERATIONS = ["verify"] as const;
/**
 * Union of all key operations performed by a public key to be used the `key_ops` property
 * @see https://www.rfc-editor.org/rfc/rfc7517#section-4.3
 */
export type PublicKeyOperation = typeof PUBLIC_KEY_OPERATIONS[number];

/**
 * Availible string identifiers for key operations performed by a private key
 * Used as the `key_ops` property in JWKs
 * @see https://www.rfc-editor.org/rfc/rfc7517#section-4.3
 */
export const PRIVATE_KEY_OPERATIONS = ["sign", "decrypt", "unwrapKey", "deriveKey", "deriveBits"] as const;
/**
 * Union of all key operations performed by a private key to be used the `key_ops` property
 * @see https://www.rfc-editor.org/rfc/rfc7517#section-4.3
 */
export type PrivateKeyOperation = typeof PRIVATE_KEY_OPERATIONS[number];

/**
 * Availible string identifiers for key operations performed by a symmetric key
 * Used as the `key_ops` property in JWKs
 * @see https://www.rfc-editor.org/rfc/rfc7517#section-4.3
 */
export const SYMMETRIC_KEYS_OPERATIONS = ["sign", "verify", "encrypt", "decrypt"] as const;
/**
 * Union of all key operations performed by a symmetric key to be used the `key_ops` property
 * @see https://www.rfc-editor.org/rfc/rfc7517#section-4.3
 */
export type SymmetricKeyOperation = typeof SYMMETRIC_KEYS_OPERATIONS[number];

/**
 * Availible string identifiers for key operations
 * Used as the `key_ops` property in JWKs
 * @see https://www.rfc-editor.org/rfc/rfc7517#section-4.3
 */
export const KEY_OPERATIONS = [
    ...PUBLIC_KEY_OPERATIONS,
    ...PRIVATE_KEY_OPERATIONS,
    ...SYMMETRIC_KEYS_OPERATIONS
] as const;
/**
 * Union of all key operations to be used the `key_ops` property
 * @see https://www.rfc-editor.org/rfc/rfc7517#section-4.3
 */
export type KeyOperation = typeof KEY_OPERATIONS[number];

// ! Algorithms

/**
 * Availible string identifiers for algorithms used with Elliptic Curve keys
 * Used as the `alg` property in JWKs
 * @see https://www.rfc-editor.org/rfc/rfc7518
 */
export const EC_ALGORITHMS = ["ES256", "ES384", "ES512"] as const;
/**
 * Union of all algorithms used with Elliptic Curve keys
 * @see https://www.rfc-editor.org/rfc/rfc7518
 */
export type ECAlgorithm = typeof EC_ALGORITHMS[number];

/**
 * Availible string identifiers for algorithms used with RSA keys
 * Used as the `alg` property in JWKs
 * @see https://www.rfc-editor.org/rfc/rfc7518
 */
export const RSA_ALGORITHMS = ["RS256", "RS384", "RS512"] as const;
/**
 * Union of all algorithms used with RSA keys
 * @see https://www.rfc-editor.org/rfc/rfc7518
 */
export type RSAAlgorithm = typeof RSA_ALGORITHMS[number];

/**
 * Availible string identifiers for algorithms used with symmetric keys
 * Used as the `alg` property in JWKs
 * @see https://www.rfc-editor.org/rfc/rfc7518
 */
export const HMAC_ALGORITHMS = ["HS256", "HS384", "HS512"] as const;
/**
 * Union of all algorithms used with symmetric keys
 * @see https://www.rfc-editor.org/rfc/rfc7518
 */
export type HMACAlgorithm = typeof HMAC_ALGORITHMS[number];

/**
 * Availible string identifiers for algorithms
 * Used as the `alg` property in JWKs
 * @see https://www.rfc-editor.org/rfc7518
 */
export const ALGORITHMS = [...EC_ALGORITHMS, ...RSA_ALGORITHMS, ...HMAC_ALGORITHMS] as const;
/**
 * Union of all algorithms to be used the `alg` property
 * @see https://www.rfc-editor.org/rfc/rfc7518
 */
export type Algorithm = typeof ALGORITHMS[number];
