import {Types} from "./Types";
import {TypeObject} from "./TypeObject";
import {Field} from "../Field";
import { ITypeOptions } from "../../interfaces/types/ITypeOptions";
import { ISchemaOrType } from "../../interfaces/types/ISchemaOrType";
import { isRequired, defaultValue, custom } from "../commons";

export class TypeArray extends Types {

    public BASE_STRING = 'array'

    public isRequired = isRequired<TypeArray>(this);
    public defaultValue = defaultValue<TypeArray>(this)
    public custom = custom<TypeArray>(this)
    
    public isArray(options: ITypeOptions = {}){
        return this.addCommon('array', async (field: Field) => {            
            if(field.hasRequirements()) {
                const isValid = Array.isArray(field.value);
                if(!isValid){
                    return this.applyError('array', field, options)  
                }
            }
        });
    }

    public of(schemaOrType: ISchemaOrType) {
        this.specifics.array.schemaOrType = (schemaOrType instanceof Types) ? schemaOrType : new TypeObject().isObject().of(schemaOrType)
        return this;
    }

    public min(min: number, options: ITypeOptions = {}) {
        return this.addCommon('min',  async (field: Field) => {
            if(field.hasRequirements()) {
                const isValid = field.value.length >= min;
                if(!isValid){
                    return this.applyError('array.min', field, options, {min})  
                }
            }
        });
    }

    public max(max: number, options: ITypeOptions = {}) {
        return this.addCommon('max', async (field: Field) => {
            if(field.hasRequirements()) {
                const isValid = field.value.length <= max;
                if(!isValid){
                    return this.applyError('array.max', field, options, {max})  
                }
            }
        });
    }

}