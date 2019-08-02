import {Types} from "./Types";
import {Field} from "../Field";
import { ITypeOptions } from "../../interfaces/types/ITypeOptions";
import { isRequired } from "../commons";

export class TypeObject extends Types {

    public BASE_STRING = 'object'


    public isObject(options: ITypeOptions = {}) {
        this.commons.object = async (field: Field) => {
            if(field.hasRequirements()) {
                const isValid = typeof field.value === "object" && !Array.isArray(field.value);
                if(!isValid){
                    return this.applyError('object', field, options)  
                }
            }
        };

        return this;
    }

    public of(schema: any) {
        this.specifics.object.schema = schema;
        return this;
    }

}