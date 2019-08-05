import {TypeObject} from "./types/TypeObject";
import {TypeString} from "./types/TypeString";
import {TypeArray} from "./types/TypeArray";
import {TypeNumber} from "./types/TypeNumber";
import {ValidateFields} from "./ValidateFields";
import {TypeDate} from "./types/typeDate";
import { TypeConditional, IConditionalCallback } from "./types/TypeConditional";
import { ITypeOptions, IDateOptions } from "../interfaces/types/ITypeOptions";
import { TypeAny } from "./types/TypeAny";

export class Hopy {

    public static isString(options: ITypeOptions = {}){
        return new TypeString().isString(options)
    }

    public static get string(){
        return new TypeString().isString()
    }

    public static objectOf(schema: any, options: ITypeOptions = {}){
        return new TypeObject().isObject(options).of(schema);
    }

    public static isObject(options: ITypeOptions = {}) {
        return new TypeObject().isObject(options)
    }

    public static get object(){
        return new TypeObject().isObject()
    }

    public static arrayOf(type: any, options: ITypeOptions = {}){
        return new TypeArray().isArray(options).of(type)
    }

    public static isArray(options: ITypeOptions = {}){
        return new TypeArray().isArray(options)
    }

    public static get array(){
        return new TypeArray().isArray()
    }

    public static isNumber(options: ITypeOptions = {}) {
        return new TypeNumber().isNumber(options)
    }

    public static get number() {
        return new TypeNumber().isNumber()
    }

    public static isDate(options: IDateOptions = {}){
        return new TypeDate().isDate(options)
    }

    public static get date(){
        return new TypeDate().isDate();
    }

    public static async check(body: any, schema: any) {
        const vld: ValidateFields = await new ValidateFields().init(body, schema);
        await vld.validate();
        return vld.getResponse();
    }

    public static conditional(callback: IConditionalCallback) {
        return new TypeConditional().conditional(callback)
    }

    public static get any(){
        return new TypeAny().any()
    }
}