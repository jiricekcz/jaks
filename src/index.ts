import * as jwt from "./standard/jwt";
import * as parser from "./standard/parser";
import * as issuer from "./standard/issuer";
import * as interfaces from "./types";
import * as utils from "./utils";

async function main(): Promise<void> {}

void main();
export default {
    JWTToken: jwt.JWTToken,
    JWTTokenHeader: jwt.JWTHeader,
    JWTPayload: jwt.JWTPayload,
    JWTTokenParser: parser.JWTTokenParser,
    JWTTokenIssuer: issuer.JWTTokenIssuer,
    interfaces,
    utils,
};
