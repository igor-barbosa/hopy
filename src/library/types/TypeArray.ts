import {Types} from "./Types";
import {IField} from "../../interfaces/types/IField";
import {TypeObject} from "./TypeObject";

export class TypeArray extends Types {

    public customType: any;

    public of(schemaOrRule: any) {
        this.customType = (schemaOrRule instanceof Types) ? schemaOrRule : new TypeObject().of(schemaOrRule)
        this.commons.array = async (field: IField) => {
            const verify = !Array.isArray(field.value);
            if(this.checkRequirements(field) && verify) {
                return this.applyError(
                    'array',
                    'Deve ser um array',
                    `O campo ${field.label || field.path} deve ser um array`
                )
            }
        };

        return this;
    }

    public required() {
        this.commons.required = async (field: IField) => {
            const verify = !field.value
            if(verify) {
                return this.applyError(
                    'array.required',
                    'Campo obrigatório',
                    `O campo ${field.label || field.path} é obrigatório`
                )
            }
        };

        return this;
    }

    public min(min: number) {
        this.commons.min = async (field: IField) => {
            const verify = this.checkRequirements(field) && field.value.length < min;
            if(verify) {
                return this.applyError(
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
        this.commons.max = async (field: IField) => {
            const verify = this.checkRequirements(field) && field.value.length > max;
            if(verify) {
                return this.applyError(
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