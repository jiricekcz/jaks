import * as jwt from "./standard/jwt";
import * as parser from "./standard/parser";
import * as issuer from "./standard/issuer";
import * as interfaces from "./types";
import * as utils from "./utils";
import * as jose from "jose";
import {promises as fs} from "fs";
import { JWTPayloadOptions } from "./types";
const jaks = {...jwt, ...parser, ...issuer};



async function main(): Promise<void> {


}


void main();
export default {
    JWTToken: jwt.JWTToken,
    JWTTokenHeader: jwt.JWTHeader,
    JWTPayload: jwt.JWTPayload,
    interfaces,
    utils,
};
