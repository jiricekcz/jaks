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
export interface PayloadOptions extends JWTPayloadOptions { // You define the types of the default parameters extending the interface should make you follow the standard.
    iss: "server1" | "server2" | "server3" | "master"; // The issuer of the token
    sub: string; // The subject of the token (unique identifier of the user)
    aud: "webclient" | "androidapp" | "iosapp" | "winapp"; // The audience of the token (the reciever of the token)
    iat: Date; // You can only put `Date` (for specified issued at) or `undefined` (for not specified issued at)
    nbf: undefined; // You can only put `Date` (for specified not before) or `undefined` (for not specified not before)
    jit: undefined; // Not using JWT ID
}

export interface AdditionalPayload { // You define the types of the additional parameters. Note that these parameters will be added to the payload, so make them compact.
    string: string; // A simple string
    anArray: string[]; // An array of strings
    record: {   // A record of strings
        key1: string;
    }
}

export type AdditionalHeaders = undefined; // You define the types of the additional headers in the same way as the additional payload. Undefined means there are no extra headers.

```

After that you can issue and verify tokens with the TokenIssuer class:

```typescript
import * as jaks from 'jaks';
import { promises as fs } from 'fs';
import { PayloadOptions, AdditionalPayload, AdditionalHeaders } from './tokenDef';

const JWK = JSON.parse(await fs.readFile("jwk.json", "utf8"));
const key = await jose.importJWK(JWK);

const tokenIssuer = new jaks.JWTTokenIssuer<PayloadOptions, AdditionalPayload, AdditionalHeaders>(key, {
    additionalHeaders: undefined, // You can specify the additional headers here
    algorithm: "ES256", // You can specify the algorithm here
    defaultPayload: { // Default payload. Can be changed with each issue, but default is required in case overrides are not provided.
        anArray: ["a", "b", "c"],
        record: {
            key1: "value1"
        },
        string: "string",
    },
    generateJWTID: () => undefined, // JWT ID generator.
    nameOrUrl: "master", // Issuer name or URL
    validityDelayMs: 0, // Delay before the token is valid
    validTimeMs: 1000 * 60 * 60 * 24 * 7, // Valid time of the token
});

const token = await tokenIssuer.issueToken({
    audience: "webclient",
    subject: "user1",
    additionalPayload: { // Any payload overrides can be specified here
        string: "string2"
    }
});

const tokenString = token.toString(); // Get the token as a string

// You can later parse the token and get the token object
const token2 = tokenIssuer.parseToken(tokenString);
```
