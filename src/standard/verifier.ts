import jose from "jose";
import { Verifier } from "../tokenManipulationInterfaces";

import { JWTPayloadOptions, JWTPayloadOptionsDefault } from "../types";
import { JWTToken } from "./jwt";
import { JWTTokenParser } from "./parser";

export class JWTTokenVerifier<
    O extends JWTPayloadOptions = JWTPayloadOptionsDefault,
    P extends {} | undefined = undefined,
    H extends {} | undefined = undefined
> extends JWTTokenParser<O, P, H, true> implements Verifier<JWTToken<O, P, H, true>> {

    protected publicKey: jose.KeyLike | Uint8Array;
    constructor(publicOrPrivateKey: jose.KeyLike | Uint8Array) {
        super(true);
        this.publicKey = publicOrPrivateKey; // All private keys can act like public keys in jose
    }

    public async verifyToken(token: JWTToken<O, P, H, true>): Promise<boolean> {
        return token.verifySignature(this.publicKey);
    }

    public async parseThenVerifyToken(token: string): Promise<JWTToken<O, P, H, true> | false> {
        try {
            const parsedToken = await this.parseToken(token);
            if (await this.verifyToken(parsedToken)) return parsedToken;
            return false;
        } catch (e) {
            return false; // Swallows error, not ideal, but when a token has any issues, it should be rejected
        }
    }
}
