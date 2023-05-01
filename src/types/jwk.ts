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

// ! Key types

/**
 * Base type for JWK
 * All more specific JWK types extend this
 */
interface JWKBase {
    kty: KeyType;
    use?: KeyUse;
    key_ops: KeyOperation[];
    alg?: Algorithm;
    kid?: string;
    x5u?: string;
    x5c?: string[];
    x5t?: string;
    "x5t#S256"?: string;
}


/**
 * Very striclty typed JWK for Elliptic Curve keys
 */
export namespace EC {

    // ! Key types - Elliptic Curve - Signature

    /**
     * JWK Public key using Elliptic Curve cryptography 256 bit
     */
    export interface JWK_EC_Public_Signature_256 extends JWKBase {
        kty: "EC";
        use: "sig";
        key_ops: ["verify"];
        alg: "ES256";
        /**
         * Type of the curve
         * @see https://www.rfc-editor.org/rfc/rfc7518#section-6.2.1.1
         */
        crv: "P-256";
        /**
         * X coordinate for the curve
         * @see https://www.rfc-editor.org/rfc/rfc7518#section-6.2.1.2
         */
        x: string;
        /**
         * Y coordinate for the curve
         * @see https://www.rfc-editor.org/rfc/rfc7518#section-6.2.1.3
         */
        y: string;

    }
    /**
     * JWK Public key using Elliptic Curve cryptography 384 bit
     */
    export interface JWK_EC_Public_Signature_384 extends JWKBase {
        kty: "EC";
        use: "sig";
        key_ops: ["verify"];
        alg: "ES384";
        /**
         * Type of the curve
         * @see https://www.rfc-editor.org/rfc/rfc7518#section-6.2.1.1
         */
        crv: "P-384";
        /**
         * X coordinate for the curve
         * @see https://www.rfc-editor.org/rfc/rfc7518#section-6.2.1.2
         */
        x: string;
        /**
         * Y coordinate for the curve
         * @see https://www.rfc-editor.org/rfc/rfc7518#section-6.2.1.3
         */
        y: string;
    }
    /**
     * JWK Public key using Elliptic Curve cryptography 512 bit
     */
    export interface JWK_EC_Public_Signature_512 extends JWKBase {
        kty: "EC";
        use: "sig";
        key_ops: ["verify"];
        alg: "ES512";
        /**
         * Type of the curve
         * @see https://www.rfc-editor.org/rfc/rfc7518#section-6.2.1.1
         */
        crv: "P-521";
        /**
         * X coordinate for the curve
         * @see https://www.rfc-editor.org/rfc/rfc7518#section-6.2.1.2
         */
        x: string;
        /**
         * Y coordinate for the curve
         * @see https://www.rfc-editor.org/rfc/rfc7518#section-6.2.1.3
         */
        y: string;
    }

    /**
     * Union of all public JWKs using Elliptic Curve cryptography for signatures
     */
    export type JWK_EC_Public_Signature = JWK_EC_Public_Signature_256 | JWK_EC_Public_Signature_384 | JWK_EC_Public_Signature_512;


    /**
     * JWK Private key using Elliptic Curve cryptography 256
     */
    export interface JWK_EC_Private_Signature_256 extends JWKBase {
        kty: "EC";
        use: "sig";
        key_ops: ("sign" | "verify")[];
        alg: "ES256";
        /**
         * Type of the curve
         * @see https://www.rfc-editor.org/rfc/rfc7518#section-6.2.1.1
         */
        crv: "P-256";
        /**
         * X coordinate for the curve
         * @see https://www.rfc-editor.org/rfc/rfc7518#section-6.2.1.2
         */
        x: string;
        /**
         * Y coordinate for the curve
         * @see https://www.rfc-editor.org/rfc/rfc7518#section-6.2.1.3
         */
        y: string;
        /**
         * Private key
         * @see https://www.rfc-editor.org/rfc/rfc7518#section-6.2.2.1
         */
        d: string;
    }
    /**
     * JWK Private key using Elliptic Curve cryptography 384 bit
     */
    export interface JWK_EC_Private_Signature_384 extends JWKBase {
        kty: "EC";
        use: "sig";
        key_ops: ("sign" | "verify")[];
        alg: "ES384";
        /**
         * Type of the curve
         * @see https://www.rfc-editor.org/rfc/rfc7518#section-6.2.1.1
         */
        crv: "P-384";
        /**
         * X coordinate for the curve
         * @see https://www.rfc-editor.org/rfc/rfc7518#section-6.2.1.2
         */
        x: string;
        /**
         * Y coordinate for the curve
         * @see https://www.rfc-editor.org/rfc/rfc7518#section-6.2.1.3
         */
        y: string;
        /**
         * Private key
         * @see https://www.rfc-editor.org/rfc/rfc7518#section-6.2.2.1
         */
        d: string;
    }
    /**
     * JWK Private key using Elliptic Curve cryptography 512 bit
     */
    export interface JWK_EC_Private_Signature_512 extends JWKBase {
        kty: "EC";
        use: "sig";
        key_ops: ("sign" | "verify")[];
        alg: "ES512";
        /**
         * Type of the curve
         * @see https://www.rfc-editor.org/rfc/rfc7518#section-6.2.1.1
         */
        crv: "P-521";
        /**
         * X coordinate for the curve
         * @see https://www.rfc-editor.org/rfc/rfc7518#section-6.2.1.2
         */
        x: string;
        /**
         * Y coordinate for the curve
         * @see https://www.rfc-editor.org/rfc/rfc7518#section-6.2.1.3
         */
        y: string;
        /**
         * Private key
         * @see https://www.rfc-editor.org/rfc/rfc7518#section-6.2.2.1
         */
        d: string;
    }

    /**
     * Union of all private JWKs using Elliptic Curve cryptography for signatures
     */
    export type JWK_EC_Private_Signature = JWK_EC_Private_Signature_256 | JWK_EC_Private_Signature_384 | JWK_EC_Private_Signature_512;


    // ! Key types - Elliptic Curve - Encryption

    /**
     * JWK Public key using Elliptic Curve cryptography 256 bit
     */
    export interface JWK_EC_Public_Encryption_256 extends JWKBase {
        kty: "EC";
        use: "sig";
        key_ops: ["encrypt"];
        alg: "ES256";
        /**
         * Type of the curve
         * @see https://www.rfc-editor.org/rfc/rfc7518#section-6.2.1.1
         */
        crv: "P-256";
        /**
         * X coordinate for the curve
         * @see https://www.rfc-editor.org/rfc/rfc7518#section-6.2.1.2
         */
        x: string;
        /**
         * Y coordinate for the curve
         * @see https://www.rfc-editor.org/rfc/rfc7518#section-6.2.1.3
         */
        y: string;

    }
    /**
     * JWK Public key using Elliptic Curve cryptography 384 bit
     */
    export interface JWK_EC_Public_Encryption_384 extends JWKBase {
        kty: "EC";
        use: "sig";
        key_ops: ["encrypt"];
        alg: "ES384";
        /**
         * Type of the curve
         * @see https://www.rfc-editor.org/rfc/rfc7518#section-6.2.1.1
         */
        crv: "P-384";
        /**
         * X coordinate for the curve
         * @see https://www.rfc-editor.org/rfc/rfc7518#section-6.2.1.2
         */
        x: string;
        /**
         * Y coordinate for the curve
         * @see https://www.rfc-editor.org/rfc/rfc7518#section-6.2.1.3
         */
        y: string;
    }
    /**
     * JWK Public key using Elliptic Curve cryptography 512 bit
     */
    export interface JWK_EC_Public_Encryption_512 extends JWKBase {
        kty: "EC";
        use: "sig";
        key_ops: ["encrypt"];
        alg: "ES512";
        /**
         * Type of the curve
         * @see https://www.rfc-editor.org/rfc/rfc7518#section-6.2.1.1
         */
        crv: "P-521";
        /**
         * X coordinate for the curve
         * @see https://www.rfc-editor.org/rfc/rfc7518#section-6.2.1.2
         */
        x: string;
        /**
         * Y coordinate for the curve
         * @see https://www.rfc-editor.org/rfc/rfc7518#section-6.2.1.3
         */
        y: string;
    }

    /**
     * Union of all public JWKs using Elliptic Curve cryptography for encryption
     */
    export type JWK_EC_Public_Encryption = JWK_EC_Public_Encryption_256 | JWK_EC_Public_Encryption_384 | JWK_EC_Public_Encryption_512;


    /**
     * JWK Private key using Elliptic Curve cryptography 256 bit
     */
    export interface JWK_EC_Private_Encryption_256 extends JWKBase {
        kty: "EC";
        use: "sig";
        key_ops: ("decrypt" | "unwrapKey")[];
        alg: "ES256";
        /**
         * Type of the curve
         * @see https://www.rfc-editor.org/rfc/rfc7518#section-6.2.1.1
         */
        crv: "P-256";
        /**
         * X coordinate for the curve
         * @see https://www.rfc-editor.org/rfc/rfc7518#section-6.2.1.2
         */
        x: string;
        /**
         * Y coordinate for the curve
         * @see https://www.rfc-editor.org/rfc/rfc7518#section-6.2.1.3
         */
        y: string;
        /**
         * Private key
         * @see https://www.rfc-editor.org/rfc/rfc7518#section-6.2.2.1
         */
        d: string;
    }
    /**
     * JWK Private key using Elliptic Curve cryptography 384 bit
     */
    export interface JWK_EC_Private_Encryption_384 extends JWKBase {
        kty: "EC";
        use: "sig";
        key_ops: ("decrypt" | "unwrapKey")[];
        alg: "ES384";
        /**
         * Type of the curve
         * @see https://www.rfc-editor.org/rfc/rfc7518#section-6.2.1.1
         */
        crv: "P-384";
        /**
         * X coordinate for the curve
         * @see https://www.rfc-editor.org/rfc/rfc7518#section-6.2.1.2
         */
        x: string;
        /**
         * Y coordinate for the curve
         * @see https://www.rfc-editor.org/rfc/rfc7518#section-6.2.1.3
         */
        y: string;
        /**
         * Private key
         * @see https://www.rfc-editor.org/rfc/rfc7518#section-6.2.2.1
         */
        d: string;
    }
    /**
     * JWK Private key using Elliptic Curve cryptography 512 bit
     */
    export interface JWK_EC_Private_Encryption_512 extends JWKBase {
        kty: "EC";
        use: "sig";
        key_ops: ("decrypt" | "unwrapKey")[];
        alg: "ES512";
        /**
         * Type of the curve
         * @see https://www.rfc-editor.org/rfc/rfc7518#section-6.2.1.1
         */
        crv: "P-521";
        /**
         * X coordinate for the curve
         * @see https://www.rfc-editor.org/rfc/rfc7518#section-6.2.1.2
         */
        x: string;
        /**
         * Y coordinate for the curve
         * @see https://www.rfc-editor.org/rfc/rfc7518#section-6.2.1.3
         */
        y: string;
        /**
         * Private key
         * @see https://www.rfc-editor.org/rfc/rfc7518#section-6.2.2.1
         */
        d: string;
    }

    /**
     * Union of all private JWKs using Elliptic Curve cryptography for encryption
     */
    export type JWK_EC_Private_Encryption = JWK_EC_Private_Encryption_256 | JWK_EC_Private_Encryption_384 | JWK_EC_Private_Encryption_512;

    /**
     * Union of Public JWKs using Elliptic Curve cryptography
     */
    export type JWK_EC_Public = JWK_EC_Public_Signature | JWK_EC_Public_Encryption;

    /**
     * Union of Private JWKs using Elliptic Curve cryptography
     */
    export type JWK_EC_Private = JWK_EC_Private_Signature | JWK_EC_Private_Encryption;

    /**
     * Union of all JWKs using Elliptic Curve cryptography for signatures
     */
    export type JWK_EC_Signature = JWK_EC_Public_Signature | JWK_EC_Private_Signature;

    /**
     * Union of all JWKs using Elliptic Curve cryptography for encryption
     */
    export type JWK_EC_Encryption = JWK_EC_Public_Encryption | JWK_EC_Private_Encryption;

    /**
     * Union of all JWKs using Elliptic Curve cryptography
     */
    export type JWK_EC = JWK_EC_Public | JWK_EC_Private;
}

/**
 * Very strictly typed JWK for RSA
 */
export namespace RSA {

    /**
     * JWK Public key using RSA cryptography for signatures
     */
    export interface JWK_RSA_Public_Signature extends JWKBase {
        kty: "RSA";
        use: "sig";
        key_ops: ["verify"];
        alg: RSAAlgorithm;

        /**
         * Modulus
         * @see https://www.rfc-editor.org/rfc/rfc7518#section-6.3.1.1
         */
        n: string;

        /**
         * Exponent
         * @see https://www.rfc-editor.org/rfc/rfc7518#section-6.3.1.2
         */
        e: string;
    }

    /**
     * JWK Private key using RSA cryptography for signatures
     */
    export interface JWK_RSA_Private_Signature extends JWKBase {
        kty: "RSA";
        use: "sig";
        key_ops: ("sign" | "verify")[];
        alg: RSAAlgorithm;

        /**
         * Modulus
         * @see https://www.rfc-editor.org/rfc/rfc7518#section-6.3.1.1
         */
        n: string;
        /**
         * Exponent
         * @see https://www.rfc-editor.org/rfc/rfc7518#section-6.3.1.2
         */
        e: string;

        /**
         * Private exponent
         * @see https://www.rfc-editor.org/rfc/rfc7518#section-6.3.2.1
         */
        d: string;
        /**
         * First prime factor
         * @see https://www.rfc-editor.org/rfc/rfc7518#section-6.3.1.2
         */
        p: string;
        /**
         * Second prime factor
         * @see https://www.rfc-editor.org/rfc/rfc7518#section-6.3.1.3
         */
        q: string;
        /**
         * First factor Chinese Remainder Theorem exponent
         * @see https://www.rfc-editor.org/rfc/rfc7518#section-6.3.1.4
         */
        dp: string;
        /**
         * Second factor Chinese Remainder Theorem exponent
         * @see https://www.rfc-editor.org/rfc/rfc7518#section-6.3.1.5
         */
        dq: string;
        /**
         * First Chinese Remainder Theorem coefficient
         * @see https://www.rfc-editor.org/rfc/rfc7518#section-6.3.1.6
         */
        qi: string;
    }

     /**
     * JWK Public key using RSA cryptography for encryption
     */
    export interface JWK_RSA_Public_Encryption extends JWKBase {
        kty: "RSA";
        use: "enc";
        key_ops: ["encrypt"];
        alg: RSAAlgorithm;

        /**
         * Modulus
         * @see https://www.rfc-editor.org/rfc/rfc7518#section-6.3.1.1
         */
        n: string;

        /**
         * Exponent
         * @see https://www.rfc-editor.org/rfc/rfc7518#section-6.3.1.2
         */
        e: string;
    }

    /**
     * JWK Private key using RSA cryptography for encryption
     */
    export interface JWK_RSA_Private_Encryption extends JWKBase {
        kty: "RSA";
        use: "enc";
        key_ops: ("encrypt" | "decrypt")[];
        alg: RSAAlgorithm;

        /**
         * Modulus
         * @see https://www.rfc-editor.org/rfc/rfc7518#section-6.3.1.1
         */
        n: string;
        /**
         * Exponent
         * @see https://www.rfc-editor.org/rfc/rfc7518#section-6.3.1.2
         */
        e: string;

        /**
         * Private exponent
         * @see https://www.rfc-editor.org/rfc/rfc7518#section-6.3.2.1
         */
        d: string;
        /**
         * First prime factor
         * @see https://www.rfc-editor.org/rfc/rfc7518#section-6.3.1.2
         */
        p: string;
        /**
         * Second prime factor
         * @see https://www.rfc-editor.org/rfc/rfc7518#section-6.3.1.3
         */
        q: string;
        /**
         * First factor Chinese Remainder Theorem exponent
         * @see https://www.rfc-editor.org/rfc/rfc7518#section-6.3.1.4
         */
        dp: string;
        /**
         * Second factor Chinese Remainder Theorem exponent
         * @see https://www.rfc-editor.org/rfc/rfc7518#section-6.3.1.5
         */
        dq: string;
        /**
         * First Chinese Remainder Theorem coefficient
         * @see https://www.rfc-editor.org/rfc/rfc7518#section-6.3.1.6
         */
        qi: string;
    }

    /**
     * Union of all Public JWKs using RSA cryptography
     */
    export type JWK_RSA_Public = JWK_RSA_Public_Signature | JWK_RSA_Public_Encryption;

    /**
     * Union of all Private JWKs using RSA cryptography
     */
    export type JWK_RSA_Private = JWK_RSA_Private_Signature | JWK_RSA_Private_Encryption;

    /**
     * Union of all JWKs using RSA cryptography for signatures
     */
    export type JWK_RSA_Signature = JWK_RSA_Public_Signature | JWK_RSA_Private_Signature;

    /**
     * Union of all JWKs using RSA cryptography for encryption
     */
    export type JWK_RSA_Encryption = JWK_RSA_Public_Encryption | JWK_RSA_Private_Encryption;    

    /**
     * Union of all JWKs using RSA cryptography
     */
    export type JWK_RSA = JWK_RSA_Public | JWK_RSA_Private;
    
}

/**
 * JWKs for OCT keys
 */
export namespace OCT {

    /**
     * JWK for OCT keys
     */
    export interface JWK_OCT extends JWKBase{
        kty: "oct";
        /**
         * Key value
         * @see https://www.rfc-editor.org/rfc/rfc7518#section-6.4.1
         */
        k: string;
    }
}