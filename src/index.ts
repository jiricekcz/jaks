import * as jwt from "./jwt"
import { JWTPayloadOptions } from "./types"

interface TokenOptions extends JWTPayloadOptions {
    iss: string;
    sub: string;
    aud: string;
    nbf: undefined,
    iat: undefined,
    jti: undefined,
}

const token = new jwt.JWTToken<TokenOptions>({
    algorithm: "HS256",
    issuer: "https://example.com",
    subject: "test",
    audience: ["https://example.com"],
    expiration: new Date(Date.now() + 1000 * 60 * 60 * 24),
    signature: "test",

    additionalHeaders: undefined,
    additionalPayload: undefined,
    notBefore: undefined,
    issuedAt: undefined,
    jwtID: undefined,

})

console.log(token.toString())
console.log(jwt.JWTToken.fromString<TokenOptions>(token.toString()).toString())