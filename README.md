# JAKS

JAKS is a highly opinionated, object-oriented authentication and authorization cryptographic library for TypeScripy and JavaScript. One of the main goals of JAKS is to provide a complete solution for web applications that can provide the same interfaces for both Node.js and the browser. JAKS follows and extends the [JOSE](https://tools.ietf.org/html/rfc7515) standard where possible. The npm package [jose](https://www.npmjs.com/package/jose) is used to provide the JOSE cryptographic functionality. For maximum performace native crypto interfaces are used when available.

## JAKS Json Web Token (JWT)

JAKS provides extended and strongly typed JWT Tokens. It offers (will offer) multiple different tokens. Each token will have its provided Parser, Verifier and Issuer classes.  
  
The *Parser* can parse tokens from a string form into a JAKS object form. It usually doesn't reaquire any keys or secrets.  
The *Verifier* extends the Parser and thus can in addition to verifing tokens also parse them. The verifier verifies a signature of a token. It will require a public key or a secret. The main use of the Verifier is for private/public key Tokens, but can be used with symmetric keys for code clarity or upgradibility.  
The *Issuer* can Issue, Verify and Parse tokens. It will require a private key or a secret and thus should be constructed only on the server that should have the ability to issue any token.  
  
As JAKS is an object oriented library focused on code reusebility and type safety, the best practise when using JAKS classes is considered to be creating a common file with all types and common configurations, that will be used both on the frontend and backend. An example of these files for each token could be found bellow.

### Standard JWT (`class JWTToken`)

Standard JWT Token doesn't provide much extra functionallity, but offers simple stringification and parsing with maximum type safety. 

An example of a token declaration file:
`tokenDef.ts`

```typescript
import * as jaks from "jaks";
export interface PayloadOptions extends jaks.types.JWTPayloadOptions {
    // You define the types of the default parameters extending the interface should make you follow the standard.
    iss: "server1" | "server2" | "server3" | "master"; // The issuer of the token
    sub: string; // The subject of the token (unique identifier of the user)
    aud: "webclient" | "androidapp" | "iosapp" | "winapp"; // The audience of the token (the reciever of the token)
    iat: Date; // You can only put `Date` (for specified issued at) or `undefined` (for not specified issued at)
    nbf: undefined; // You can only put `Date` (for specified not before) or `undefined` (for not specified not before)
    jit: undefined; // Not using JWT ID
}

export interface AdditionalPayload {
    // You define the types of the additional parameters. Note that these parameters will be added to the payload, so make them compact.
    string: string; // A simple string
    anArray: string[]; // An array of strings
    record: {
        // A record of strings
        key1: string;
    };
}

export type AdditionalHeaders = undefined; // You define the types of the additional headers in the same way as the additional payload. Undefined means there are no extra headers.

export class Token<SIGNED extends boolean> extends jaks.standardJWTToken.Token<
    PayloadOptions,
    AdditionalPayload,
    AdditionalHeaders,
    SIGNED
> {}

export class Parser extends jaks.standardJWTToken.Parser<PayloadOptions, AdditionalPayload, AdditionalHeaders> {}
export class Verifier extends jaks.standardJWTToken.Verifier<PayloadOptions, AdditionalPayload, AdditionalHeaders> {}
export class Issuer extends jaks.standardJWTToken.Issuer<PayloadOptions, AdditionalPayload, AdditionalHeaders> {
    constructor(privateKey: jaks.types.Key, issuerName: PayloadOptions["iss"]) { // You can redefine the constructor to make it more convenient to use.
        super(privateKey, {
            algorithm: "ES256",
            additionalHeaders: undefined,
            defaultPayload: {
                string: "string",
                anArray: ["string1", "string2"],
                record: {
                    key1: "string",
                },
            },
            generateJWTID: () => undefined,
            nameOrUrl: issuerName,
            validityDelayMs: 0,
            validTimeMs: 1000 * 60 * 60 * 24 * 7,
        });
    }

    get anArray(): string[] { // You can also define getters or other functions to make it more convenient to use.
        return this.defaultAdditionalPayload.anArray;
    } 
}
```

After that you can issue and verify tokens with the TokenIssuer class:

```typescript
import { Issuer, Verifier } from "./tokenDef.ts"; // You import your classes from the difinition file
import { jose } from "jaks"; // Jose is a dependency library used by JAKS
const JWK = JSON.parse(await fs.readFile("jwk.json", "utf8")); // You load the JWK from a file
const key = await jose.importJWK(JWK);

const issuer = new Issuer(key, "server1"); // You create an issuer
const token = await issuer.issueToken({
    // You issue a token
    additionalPayload: {
        string: "newString",
    },
    audience: "androidapp",
    subject: "user2",
});

const tokenString = token.toString(); // You can convert the token to a string

// Then you can verify the token elsewhere
const verifier = new Verifier(key); // You create a verifier
const signatureValid = await verifier.parseThenVerifyToken(tokenString); // You parse and verify the signature of the token
```
