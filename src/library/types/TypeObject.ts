import {Types} from "./Types";
import {Field} from "../Field";
import { ITypeOptions } from "../../interfaces/types/ITypeOptions";
import { defaultValue, custom, label } from '../commons';


export class TypeObject extends Types {

    public BASE_STRING = 'object'

    public defaultValue = defaultValue<TypeObject>(this)
    public custom = custom<TypeObject>(this)
    public label = label<TypeObject>(this)

    public isObject(options: ITypeOptions = {}) {
        return this.addCommon('object', async (field: Field) => {
            if(field.hasRequirements()) {
                const isValid = typeof field.value === "object" && !Array.isArray(field.value);
                if(!isValid){
                    return this.applyError('object', field, options)  
                }
            }
        })
    }

    public of(schema: any) {
        this.specifics.object.schema = schema;
        return this;
    }

}