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
            if(field.value === undefined) {
                field.value = value
            }
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

export function equalTo<T extends Types>(type: Types){
    return (values: any, options: ITypeOptions = {}) : T => {
        type.addCommon('equalTo', async(field: Field) => {
            if (field.hasRequirements()){
                const valuesList = (Array.isArray(values)) ? values: [values];
                const isValid = (valuesList.indexOf(field.value) >= 0)
                if(!isValid){
                    return type.applyError(`${type.BASE_STRING}.equalTo`, field, options, {values: valuesList}) 
                }
            }
        })
        return <T>type;
    }
}

export function notEqualTo<T extends Types>(type: Types){
    return (values: any, options: ITypeOptions = {}) : T => {
        type.addCommon('notEqualTo', async(field: Field) => {
            if (field.hasRequirements()){
                const valuesList = (Array.isArray(values)) ? values: [values];
                const isValid = (valuesList.indexOf(field.value) === -1)
                if(!isValid){
                    return type.applyError(`${type.BASE_STRING}.notEqualTo`, field, options, {values: valuesList}) 
                }
            }
        })
        return <T>type;
    }
}