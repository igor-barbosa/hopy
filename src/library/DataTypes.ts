import {TypeObject} from "./types/TypeObject";
import {TypeString} from "./types/TypeString";
import {TypeArray} from "./types/TypeArray";
import {TypeNumber} from "./types/TypeNumber";
import {ValidateFields} from "./ValidateFields";
import {TypeDate} from "./types/typeDate";
import { TypeConditional, IConditionalCallback } from "./types/TypeConditional";

export class DataTypes {

    public static isString(){
        return new TypeString().isString()
    }

    public static objectOf(schema: any){
        return new TypeObject().isObject().of(schema);
    }

    public static object() {
        return new TypeObject().isObject()
    }

    public static arrayOf(type: any){
        return new TypeArray().isArray().of(type)
    }

    static async check(body: any, schema: any) {
        const vld: ValidateFields = await new ValidateFields().init(body, schema);
        await vld.validate();
        return vld.getResponse();
    }

    static isNumber() {
        return new TypeNumber().isNumber()
    }

    static date() {
        return new TypeDate().date()
    }

    static conditional(callback: IConditionalCallback) {
        return new TypeConditional().conditional(callback)
    }
}