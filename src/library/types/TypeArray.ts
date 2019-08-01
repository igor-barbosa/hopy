import {Types} from "./Types";
import {IField} from "../../interfaces/types/IField";
import {TypeObject} from "./TypeObject";
import {Field} from "../Field";

export class TypeArray extends Types {

    public BASE_STRING = 'array'
    
    public customType: any;

    public of(schemaOrRule: any) {
        this.customType = (schemaOrRule instanceof Types) ? schemaOrRule : new TypeObject().of(schemaOrRule)
        this.commons.array = async (field: Field) => {
            const verify = !Array.isArray(field.value);
            if(field.hasRequirements() && verify) {
                return field.applyError(
                    'array',
                    'Deve ser um array',
                    `O campo ${field.label || field.path} deve ser um array`
                )
            }
        };

        return this;
    }

    public required() {
        this.commons.required = async (field: Field) => {
            const verify = !field.value
            if(verify) {
                return field.applyError(
                    'array.required',
                    'Campo obrigatório',
                    `O campo ${field.label || field.path} é obrigatório`
                )
            }
        };

        return this;
    }

    public min(min: number) {
        this.commons.min = async (field: Field) => {
            const verify = field.hasRequirements() && field.value.length < min;
            if(verify) {
                return field.applyError(
                    'array.min',
                    'Campo obrigatório',
                    `O campo ${field.label || field.path} é obrigatório`,
                    {
                        context: {
                            min
                        }
                    }
                )
            }
        };

        return this;
    }

    public max(max: number) {
        this.commons.max = async (field: Field) => {
            const verify = field.hasRequirements() && field.value.length > max;
            if(verify) {
                return field.applyError(
                    'array.max',
                    'Campo obrigatório',
                    `O campo ${field.label || field.path} é obrigatório`,
                    {
                        context: {
                            max
                        }
                    }
                )
            }
        };

        return this;
    }

}