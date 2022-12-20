# JAKS

## What is JAKS?

JAKS is an exetention of the JWT standard. This means every JAKS token is a valid JWT token, JAKS only adds additional requirements for the token. JAKS is mainly designd as a standard with a reference implementation in TypeScript.

### Why JAKS?

The JWT standard is very flexible, but this also means that it is very easy to make mistakes. JAKS is designed to make it easier to follow the JWT standard. JAKS also adds some additional requirements to the JWT standard, to make it easier to use JWT tokens in a secure way and to simplify the usage of multiple JWTs in a single application. The standard also allows for more comprehensive libraries to be written, because the standard is more strict.

## What is JWT?

### Overview

JWT or JSON Web Token is a standard, that describes a multipurpose token format. It is defined in [RFC 7519](https://tools.ietf.org/html/rfc7519). JWT tokens are used mainly for authorization, but can also be used for other purposes. JWT tokens can be signed and/or encrypted, so they can be verified and/or decrypted by the receiver. JWT tokens are usually sent in the Authorization header of HTTP requests, but can also be sent in other ways. They have a wide spread usage, because they are easy to use and can be used in many different ways.

### Structure

A quick summary of the structure of a JWT token can be found here. This is NOT in any way everything, full standard can be found in [RFC 7519](https://tools.ietf.org/html/rfc7519).  
The tokens is comprised of three parts: Header, Payload, Signature.  
The Header is a JSON object, that contains information about the token.  
The Payload is a JSON object, that contains the data of the token.  
The Signature is a string, that is used to verify the token. It is not required, but without it the token can't be verified.  
The parts are then encoded in Base64URL, and then joined and separated by a dot to form the encoded token.  
Examples can be found in [Appendix A of RFC 7519](https://www.rfc-editor.org/rfc/rfc7519#appendix-A).

#### Header

The header contains information about the token. It is a JSON object, that contains the following properties:

* `alg` - The algorithm used to sign the token. This is required, if the token is signed. The value must be a string, that is a valid algorithm name. The algorithm name must be a valid algorithm name, as defined in [RFC 7518](https://tools.ietf.org/html/rfc7518#section-3.1).

Other properities can be included, but it is discouraged.

#### Payload
The payload consists of claims. Claims are key-value pairs, where the key is a string and the value is a JSON value. The following claims are defined in the standard:

* `iss` - The issuer of the token. This is a string, that identifies the issuer of the token. More iformation can be found in [RFC 7519](https://tools.ietf.org/html/rfc7519#section-4.1.1).
* `sub` - The subject of the token. This is a string, that identifies the subject of the token. More iformation can be found in [RFC 7519](https://tools.ietf.org/html/rfc7519#section-4.1.2).
* `aud` - The audience of the token. This is a string or an array of strings, that identifies the audience of the token. More iformation can be found in [RFC 7519](https://tools.ietf.org/html/rfc7519#section-4.1.3).
* `exp` - The expiration time of the token. This is a number, that represents the expiration time of the token. More iformation can be found in [RFC 7519](https://tools.ietf.org/html/rfc7519#section-4.1.4).
* `nbf` - The not before time of the token. This is a number, that represents the time before which the token is not valid. More iformation can be found in [RFC 7519](https://tools.ietf.org/html/rfc7519#section-4.1.5).
* `iat` - The issued at time of the token. This is a number, that represents the time at which the token was issued. More iformation can be found in [RFC 7519](https://tools.ietf.org/html/rfc7519#section-4.1.6).
* `jti` - The JWT ID of the token. This is a string, that represents the ID of the token. More iformation can be found in [RFC 7519](https://tools.ietf.org/html/rfc7519#section-4.1.7).

Other information about the token should be included as a claim in the payload.

#### Signature

The signature is a string, that is used to verify the token. It is not required, but without it the token can't be verified. The signature is created by signing the header and the payload with a secret. The secret is used to verify the signature. The signature is created by using the algorithm specified in the header. The signature is then encoded in Base64URL. The signature is then appended to the token, separated by a dot.

## JAKS Standard

As mentioned before, JAKS Standard extends the JWT standard, so all restrictions found in [RFC 7519](https://tools.ietf.org/html/rfc7519) also apply to JAKS tokens. The following section describes the additional requirements of JAKS tokens.  

The JAKS standard is mainly meant for authorization, but its extendibility allows it to be used for other purposes as well.  

The current version of this standard DOES NOT support encrypted tokens, it only supports signed tokens. Support for ecrypted tokens is planned, but because it is rarely used, it is not a priority.  

JAKS prioritizes clarity, simplicity and extensibility over raw performance (both time and space). This means libraries will usually be slower and use more memory than libraries that are more focused on performance. Tokens will also be a bit larger than necessary to allow for more extensibility and backwards compatibility.  

JAKS tries to prevent the need for breaking changes as much as possible. However they can never be avoided completely and it is better to be prepared for them. That is the reason why JAKS is versioned. Even if breaking changes will be present, they will probably still be minor, but due to the nature of this package, even the smallest breaking changes MUST be marked as a new version. Adding features (even large ones) will not be considered a breaking change, but removing features or changing the behavior of existing features will be considered breaking changes.  

Behaviour when presented with a non-supported algorithm or other is undefined, unless specified differently in the standard. For that reason, you SHOULD always check all parameters of the token you are interested in, before using them. This is necessary in order for the standard to be upgradeable without introducing breaking changes. 

The JAKS standard works with so called *plugins*. Plugins add additional features to the token.

### Default JWT traits

JWT gives a few default defined traits with restrictions. JAKS gives a few additional restrictions to these traits.

#### Issuer

The `iss` claim describes the issuer of the token. In normal JWT standard, this claim is OPTIONAl, in JAKS it is REQUIRED. This claim mus also be a string, that is not empty and satisfies the StringOrURI requirements (if string includes a colon, it must be a valid URI).

#### Subject

The `sub` claim describes the subject of the token. In normal JWT standard, this claim is OPTIONAL, in JAKS it is REQUIRED. This claim must also be a string, that is not empty and satisfies the StringOrURI requirements. The `sub` claim is in standard applications used to describe the user, so this value SHOULD be unique.

#### Audience

The `aud` claim describes the audience of the token. In normal JWT standard, this claim is OPTIONAL and can be a string or an array of strings. In JAKS, this claim is REQUIRED to be an array of strings, but the array can be empty. This claim must also be a string, that is not empty and satisfies the StringOrURI requirements. Audience is used to describe for what validator this token is intended. This claim is used to prevent tokens from being used by other validators.

#### Expiration time

The `exp` claim describes the expiration time of the token. In normal JWT standard, this claim is OPTIONAL, in JAKS it is REQUIRED. This claim must also be a number, that is not negative and is not greater than 2^53. The expiration time is used to prevent tokens from being used after a certain time. It is a timestamp in epoch seconds.

#### Not before time

The `nbf` claim describes the time before which the token is not valid. In normal JWT standard, this claim is OPTIONAL, in JAKS it remains OPTIONAL. Other requirements from `exp` apply. The not before time is used to prevent tokens from being used before a certain time. It is a timestamp in epoch seconds.

#### Issued at time

The `iat` claim describes the time at which the token was issued. In normal JWT standard, this claim is OPTIONAL, in JAKS it is REQUIRED. Other requirements from `exp` apply. This claim has questionable use, in JAKS it is isuued mainly for future use. It is a timestamp in epoch seconds.

#### JWT ID

The `jti` claim describes the ID of the token. In normal JWT standard, this claim is OPTIONAL, in JAKS it is the same.

### JAKS traits

