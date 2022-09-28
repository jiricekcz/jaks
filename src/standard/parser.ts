import { JWTPayloadOptions, JWTPayloadOptionsDefault } from "../types";
import { JWTToken } from "./jwt";

export class JWTTokenParser<
    O extends JWTPayloadOptions = JWTPayloadOptionsDefault,
    P extends {} | undefined = undefined,
    H extends {} | undefined = undefined,
    SIG extends boolean = true
> {
    public readonly expectSigned: SIG;
    constructor(expectSigned: SIG) {
        this.expectSigned = expectSigned;
    }
    parseToken(token: string): JWTToken<O, P, H, SIG> {
        const t = JWTToken.fromString<O, P, H, SIG>(token);
        if (t.isSigned() !== this.expectSigned)
            throw new Error(this.expectSigned ? "Token is not signed" : "Token is signed");
        return t;
    }
}