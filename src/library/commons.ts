import { Types } from "./types/Types";
import { ITypeOptions } from "../interfaces/types/ITypeOptions";
import { Field } from "./Field";
import { type } from "os";
import { ICustomHandler } from "../interfaces/ICustomHandler";


export function isRequired<T extends Types>(type: Types) {
    return (options: ITypeOptions = {}) : T => {
        type.specifics.required = async (field: Field) => {
            const value = field.value;
            if(value === undefined || value === null || (typeof value === "string" && value.trim() === "")) {
                return type.applyError(`${type.BASE_STRING}.required`, field, options)  
            }
        }

        return <T>type;
    }        
}

export function defaultValue<T extends Types>(type: Types){
    return (value: any) : T => {
        type.specifics.defaultValue = async (field: Field) => {
            field.value = value
        } 
        return <T>type;
    }
}

export function custom<T extends Types>(type: Types){
    return (...handlers: ICustomHandler[]) : T => {
        type.specifics.customHandlers = handlers;
        return <T>type;
    }
}