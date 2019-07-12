import {TypeObject} from "./types/TypeObject";
import {TypeString} from "./types/TypeString";
import {TypeArray} from "./types/TypeArray";
import {TypeNumber} from "./types/TypeNumber";
import {ValidateFields} from "./ValidateFields";

export class DataTypes {

    public static isString(){
        return new TypeString().isString()
    }

    public static objectOf(schema: any){
        return new TypeObject().of(schema);
    }

    public static arrayOf(type: any){
        return new TypeArray().of(type)
    }

    static async check(body: any, schema: any) {
        const vld: ValidateFields = await new ValidateFields().init(body, schema);
        await vld.validate();
        return vld.getResponse();
    }

    static isNumber() {
        return new TypeNumber().isNumber()
    }
}