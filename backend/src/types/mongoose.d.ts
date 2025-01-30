import { Document } from "mongoose";

interface Iuser extends Document {
    firstName   : string,
    lastName ?  : string,
    email       : string,
    password    : string
}

export {Iuser}