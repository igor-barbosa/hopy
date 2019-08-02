import {Types} from "./Types";
import {TypeObject} from "./TypeObject";
import {Field} from "../Field";
import { ITypeOptions } from "../../interfaces/types/ITypeOptions";
import { ISchemaOrType } from "../../interfaces/types/ISchemaOrType";
import { isRequired } from "../commons";

export class TypeArray extends Types {

    public BASE_STRING = 'array'

    public isRequired = isRequired(this);
    
    public isArray(options: ITypeOptions = {}){
        this.commons.array = async (field: Field) => {            
            if(field.hasRequirements()) {
                const isValid = Array.isArray(field.value);
                if(!isValid){
                    return this.applyError('array', field, options)  
                }
            }
        };
        return this;
    }

    public of(schemaOrType: ISchemaOrType) {
        this.specifics.array.schemaOrType = (schemaOrType instanceof Types) ? schemaOrType : new TypeObject().isObject().of(schemaOrType)
        return this;
    }

    public min(min: number, options: ITypeOptions = {}) {
        this.commons.min = async (field: Field) => {
            if(field.hasRequirements()) {
                const isValid = field.value.length >= min;
                if(!isValid){
                    return this.applyError('array.min', field, options, {min})  
                }
            }
        };

        return this;
    }

    public max(max: number, options: ITypeOptions = {}) {
        this.commons.max = async (field: Field) => {
            if(field.hasRequirements()) {
                const isValid = field.value.length <= max;
                if(!isValid){
                    return this.applyError('array.max', field, options, {max})  
                }
            }
        };

        return this;
    }

}