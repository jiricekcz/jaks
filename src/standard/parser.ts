import { JWTPayloadOptions, JWTPayloadOptionsDefault, Parser } from "../types";
import { JWTToken } from "./jwt";

export class JWTTokenParser<
    O extends JWTPayloadOptions = JWTPayloadOptionsDefault,
    P extends {} | undefined = undefined,
    H extends {} | undefined = undefined,
    SIG extends boolean = true
> implements Parser<JWTToken<O, P, H, SIG>>{
    public readonly expectSigned: SIG;
    constructor(expectSigned: SIG) {
        this.expectSigned = expectSigned;
    }
    parseToken(token: string): Promise<JWTToken<O, P, H, SIG>> {
        const t = JWTToken.fromString<O, P, H, SIG>(token);
        if (t.isSigned() !== this.expectSigned)
            throw new Error(this.expectSigned ? "Token is not signed" : "Token is signed");
        return Promise.resolve(t);
    }
}
