import * as jwt from "./jwt";
import { JWTPayloadOptions } from "./types";
import * as interfaces from "./types";
import * as utils from "./utils";
interface TokenOptions extends JWTPayloadOptions {
    iss: string;
    sub: string;
    aud: string;
    nbf: undefined;
    iat: undefined;
    jti: undefined;
}
async function main(): Promise<void> {
    const token = new jwt.JWTToken<TokenOptions, undefined, undefined, false>({
        algorithm: "ES256",
        issuer: "https://example.com",
        subject: "test",
        audience: ["https://example.com"],
        expiration: new Date(166516576000 + 1000 * 60 * 60 * 24 * 7),
        signature: undefined,

        additionalHeaders: undefined,
        additionalPayload: undefined,
        notBefore: undefined,
        issuedAt: undefined,
        jwtID: undefined,
    });

    console.log(token.toString());
    console.log(jwt.JWTToken.fromString<TokenOptions>(token.toString()).toString());
    
    console.log("Private key:", privateKey.toJSON(true));
    console.log("Public key:", publicKey.toJSON(false));
    
    const signedToken = await token.sign(privateKey);
    publicKey;
    console.log(await signedToken.verifySignature)
    console.log(signedToken.toString());
}

void main();
export default {
    JWTToken: jwt.JWTToken,
    JWTTokenHeader: jwt.JWTHeader,
    JWTPayload: jwt.JWTPayload,
    interfaces,
    utils,
};
