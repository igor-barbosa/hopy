import {Types} from "./Types";
import {IField} from "../../interfaces/types/IField";

export class TypeObject extends Types {

    public schema: any;

    public of(schema: any) {
        this.schema = schema;
        this.commons.object = async (field: IField) => {
            const verify = typeof field.value !== "object";
            if(this.checkRequirements(field) && verify) {
                return this.applyError(
                    'object',
                    'Deve ser um objeto',
                    `O campo ${field.label || field.path} deve ser um objeto`
                )
            }
        };

        return this;
    }

}