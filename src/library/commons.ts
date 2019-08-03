import { Types } from "./types/Types";
import { ITypeOptions } from "../interfaces/types/ITypeOptions";
import { Field } from "./Field";
import { type } from "os";
import { ICustomHandler } from "../interfaces/ICustomHandler";


export function isRequired(type: Types) {
    return (options: ITypeOptions = {}) => {
        type.specifics.required = async (field: Field) => {
            const value = field.value;
            if(value === undefined || value === null || (typeof value === "string" && value.trim() === "")) {
                return type.applyError(`${type.BASE_STRING}.required`, field, options)  
            }
        }

        return type;
    }        
}

export function defaultValue(type: Types){
    return (value: any) => {
        type.specifics.defaultValue = async (field: Field) => {
            field.value = value
        } 
        return type;
    }
}

export function custom(type: Types){
    return (...handlers: ICustomHandler[]) => {
        type.specifics.customHandlers = handlers;
        return type;
    }
}