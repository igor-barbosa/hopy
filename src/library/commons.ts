import { Types } from "./types/Types";
import { ITypeOptions } from "../interfaces/types/ITypeOptions";
import { Field } from "./Field";


export function isRequired(type: Types) {
    return (options: ITypeOptions = {}) => {
        type.commons.required = async (field: Field) => {
            const value = field.value;
            if(value === undefined || value === null || (typeof value === "string" && value.trim() === "")) {
                return type.applyError(`${type.BASE_STRING}.required`, field, options)  
            }
        };

        return type;
    }        
}
