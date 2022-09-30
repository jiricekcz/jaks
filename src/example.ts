import * as types from "./types";
import * as jaks from "./index"

export interface PayloadOptions extends types.JWTPayloadOptions { // You define the types of the default parameters extending the interface should make you follow the standard.
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


