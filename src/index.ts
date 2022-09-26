import * as jwt from "./jwt";
import { JWTPayloadOptions } from "./types";
import * as interfaces from "./types";
import * as utils from "./utils";
import * as jose from "jose";
interface TokenOptions extends JWTPayloadOptions {
    iss: string;
    sub: string;
    aud: string;
    nbf: undefined;
    iat: undefined;
    jti: undefined;
}
async function main(): Promise<void> {
    const privateKey = await jose.importJWK({
        kty: "EC",
        x: "7aZ6fdb-5OsR4INqSlQvy8fx60ePe7oi8s2Lv-Lr-rQ",
        y: "UXC4bvPPf6pwFvg6q3rh_MOe5MO990zERUYA1FQnUF0",
        crv: "P-256",
        d: "45l6Xa9fxpdqveyM0YbdVRArKqgG4r3ib5sI1_Ge358",
        use: "sig",
        alg: "ES256",
    });
    const publicKey = await jose.importJWK({
        kty: 'EC',
        x: '7aZ6fdb-5OsR4INqSlQvy8fx60ePe7oi8s2Lv-Lr-rQ',
        y: 'UXC4bvPPf6pwFvg6q3rh_MOe5MO990zERUYA1FQnUF0',
        crv: 'P-256',
        use: "sig",
        alg: "ES256",
      });

    const token = new jwt.JWTToken<TokenOptions, undefined, undefined, false>({
        algorithm: "ES256",
        issuer: "https://example.com",
        subject: "test",
        audience: ["https://example.com"],
        expiration: new Date(Date.now() + 1000 * 60 * 60 * 24 * 7),
        signature: undefined,

        additionalHeaders: undefined,
        additionalPayload: undefined,
        notBefore: undefined,
        issuedAt: undefined,
        jwtID: undefined,
    });

    console.log(token.toString());
    console.log(jwt.JWTToken.fromString<TokenOptions>(token.toString()).toString());

    // console.log("Private key:", await jose.exportJWK(privateKey));
    // console.log("Public key:", await jose.exportJWK(publicKey));
    console.log("Public key:", await jose.exportSPKI(publicKey as jose.KeyLike));

    const signedToken = await token.sign(privateKey);
    publicKey;
    // console.log(await signedToken.verifySignature)
    console.log(signedToken.toString());

    console.log(await signedToken.verifySignature(publicKey));
}

void main();
export default {
    JWTToken: jwt.JWTToken,
    JWTTokenHeader: jwt.JWTHeader,
    JWTPayload: jwt.JWTPayload,
    interfaces,
    utils,
};
