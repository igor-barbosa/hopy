import {Types} from "./Types";
import {Field} from "../Field";
import { ITypeOptions } from "../../interfaces/types/ITypeOptions";
import { isRequired, defaultValue, custom, label } from '../commons';

export class TypeBoolean extends Types {

    public BASE_STRING = 'boolean';
    
    public isRequired = isRequired<TypeBoolean>(this);
    public defaultValue = defaultValue<TypeBoolean>(this)
    public label = label<TypeBoolean>(this)
    
    public get boolean(){
        return this.isBoolean();
    }

    public isBoolean(options: ITypeOptions = {}) {
        return this.addCommon('boolean', async (field) => {
            if(field.hasRequirements()) {
                const isBoolean = typeof field.value as String === "boolean";
                if(!isBoolean) {                    
                    return this.applyError('boolean', field, options)  
                }          
            }
        })
    }
    
}