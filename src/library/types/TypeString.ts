import {Types} from "./Types";
import {Field} from "../Field";
import { DATA_TYPES_PROVIDER_MESSAGE } from "../DATA_TYPES_PROVIDER_MESSAGE";
import { ITypeOptions } from "../../interfaces/types/ITypeOptions";

export class TypeString extends Types {

    public applyError(type: string, field: Field, options: any, context : any = null) {

        const defaultMessage: any = DATA_TYPES_PROVIDER_MESSAGE[type]
        const {helperText, message} = options;
        
        const helperTextString = (typeof helperText === "function") ? helperText(field, context) : helperText;
        const messageString = (typeof message === "function") ? message(field, context) : message;

        return field.applyError (
            type,
            helperTextString || defaultMessage.helperText(field, context),
            messageString || defaultMessage.message(field, context)
        )
    }

    public isString(options: ITypeOptions = {}) {
        this.commons.string = async (field: Field) => {
            const verify = typeof field.value as String !== "string";
            if(field.hasRequirements() && verify) {
                return this.applyError('string', field, options)                
            }
        };

        return this;
    }

    public max(max: number) {

        this.commons.max = async (field: Field) => {
            const verify = (field.value.toString().trim().length > max)
            if(field.hasRequirements() && verify) {
                return field.applyError(
                    'string.max',
                    `Deve ter no máximo ${max} caracteres.`,
                    `O campo ${field.label || field.path} contém uma quantidade de caracteres superior a máxima`,
                    {
                        context: {
                            max
                        }
                    }
                )
            }
        }

        return this
    }

    public min(min: number) {

        this.commons.min = async (field: Field) => {
            const verify = (field.value.toString().trim().length < min)
            if(field.hasRequirements() && verify) {
                return field.applyError(
                    'string.min',
                    `Deve ter no mínimo ${min} caracteres.`,
                    `O campo ${field.label || field.path} contém uma quantidade de caracteres inferior a mínima`,
                    {
                        context: {
                            min
                        }
                    }
                )
            }
        }

        return this
    }

    public between(min: number, max: number) {

        this.commons.between = async (field: Field) => {
            const verify = (field.value.toString().trim().length < min || field.value.toString().trim().length > max)
            if(field.hasRequirements() && verify) {
                return field.applyError(
                    'string.between',
                    `Deve ter entre ${min} e ${max} caracteres.`,
                    `O campo ${field.label || field.path} não contém a quantidade de caracteres necessária`,
                    {
                        context: { min, max }
                    }
                )
            }
        };

        return this
    }

    public email() {

        this.commons.email = async(field: Field) => {
            const regex =  /^[-!#$%&'*+\/0-9=?A-Z^_a-z{|}~](\.?[-!#$%&'*+\/0-9=?A-Z^_a-z`{|}~])*@[a-zA-Z0-9](-*\.?[a-zA-Z0-9])*\.[a-zA-Z](-?[a-zA-Z0-9])+$/
            const verify = new RegExp(regex).test(field.value)
            if (field.hasRequirements() && !verify){
                return field.applyError(
                    'string.email',
                    'E-mail inválido',
                    `O campo ${field.label || field.path} contém um valor inválido`
                )
            }
        }

        return this
    }

    public equal(data:string){
        this.commons.equal = async(field: Field) => {
            const verify = (field.value !== data)
            if (field.hasRequirements() && verify){
                return field.applyError(
                    'string.equal',
                    'Valor inválido',
                    `O campo ${field.label || field.path} contém um valor diferente dos definidos`,
                    {
                        context:{
                            data
                        }
                    }

                )
            }
        }

        return this
    }

    public regex(data:string){
        this.commons.regex = async (field: Field) => {
            const verify = new RegExp(data).test(field.value);
            if (field.hasRequirements() && verify){
                return field.applyError(
                    'string.regex',
                    'Valor com caractere ou expressão inválida',
                    `O campo ${field.label || field.path} contém um valor diferente dos definidos`
                )
            }
        };

        return this
    }

    //TODO: CRIAR O MÉTODO ALLOW

}