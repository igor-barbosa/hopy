import {Types} from "./Types";
import {IField} from "../../interfaces/types/IField";

export class TypeString extends Types {


    public isString() {
        this.commons.string = async (field: IField) => {
            const verify = typeof field.value !== "string";
            if(this.checkRequirements(field) && verify) {
                return this.applyError (
                    'string',
                    'Campo inválido',
                    `O campo ${field.label || field.path} é inválido`
                )
            }
        };

        return this;
    }

    public max(data: number) {

        this.commons.max = async (field: IField) => {
            const verify = (field.value.toString().trim().length > data)
            if(this.checkRequirements(field) && verify) {
                return this.applyError(
                    'string.max',
                    `Deve ter no máximo ${data} caracteres.`,
                    `O campo ${field.label || field.path} contém uma quantidade de caracteres superior a máxima`
                )
            }
        }

        return this
    }

    public min(data: number) {

        this.commons.min = async (field: IField) => {
            const verify = (field.value.toString().trim().length < data)
            if(this.checkRequirements(field) && verify) {
                return this.applyError(
                    'string.min',
                    `Deve ter no mínimo ${data} caracteres.`,
                    `O campo ${field.label || field.path} contém uma quantidade de caracteres superior a máxima`
                )
            }
        }

        return this
    }

    public between(min: number, max: number) {

        this.commons.between = async (field: IField) => {
            const verify = (field.value.toString().trim().length < min || field.value.toString().trim().length > max)
            if(this.checkRequirements(field) && verify) {
                return this.applyError(
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

    public email(){

        this.commons.email = async(field: IField) => {
            const regex =  /^[-!#$%&'*+\/0-9=?A-Z^_a-z{|}~](\.?[-!#$%&'*+\/0-9=?A-Z^_a-z`{|}~])*@[a-zA-Z0-9](-*\.?[a-zA-Z0-9])*\.[a-zA-Z](-?[a-zA-Z0-9])+$/
            const verify = new RegExp(regex).test(field.value)
            if (this.checkRequirements(field) && !verify){
                return this.applyError(
                    'string.email',
                    'E-mail inválido',
                        `O campo ${field.label || field.path} contém um valor inválido`

                )
            }
        }

        return this
    }

    public equal(data:string){
        this.commons.equal = async(field: IField) => {
            const verify = (field.value === data)
            if (this.checkRequirements(field) && verify){
                return this.applyError(
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
        this.commons.regex = async(field: IField) => {
            const verify = new RegExp(data).test(field.value);
            if (this.checkRequirements(field) && verify){
                return this.applyError(
                    'string.regex',
                    'Valor com caractere ou expressão inválida',
                    `O campo ${field.label || field.path} contém um valor diferente dos definidos`
                )
            }
        }
        return this
    }
    //TODO: CRIAR O MÉTODO EQUAL()
    //TODO: CRIAR O MÉTODO ALLOW

}