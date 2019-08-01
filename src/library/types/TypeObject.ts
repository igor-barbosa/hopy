import {Types} from "./Types";
import {Field} from "../Field";

export class TypeObject extends Types {

    public BASE_STRING = 'object'
    
    public schema: any;

    public of(schema: any) {
        this.schema = schema;
        this.commons.object = async (field: Field) => {
            const verify = typeof field.value !== "object";
            if(field.hasRequirements() && verify) {
                return field.applyError(
                    'object',
                    'Deve ser um objeto',
                    `O campo ${field.label || field.path} deve ser um objeto`
                )
            }
        };

        return this;
    }

}