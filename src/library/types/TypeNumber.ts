import {Types} from "./Types";
import {Field} from "../Field";
import { ITypeOptions } from "../../interfaces/types/ITypeOptions";

export class TypeNumber extends Types {
    static SAFE = {
        MAXIMUM: 9999999999999.99,
        MINIMUM: -9999999999999.99
    }
        

    public isNumber(options: ITypeOptions = {}) {
        this.commons.number = async (field: Field) => {            
            if(field.hasRequirements()) {
                try {
                    field.value = await this.isValidNumber(field.value)
                } catch(e) {
                    return this.applyError('number', field, options)  
                }
            }
        };
        return this;
    }

    public isSafe(options: ITypeOptions = {}){
        this.commons.safe = async (field: Field) => {            
            if(field.hasRequirements()) {
                const min = TypeNumber.SAFE.MINIMUM;
                const max = TypeNumber.SAFE.MAXIMUM;
                
                if(!(field.value >=  min && field.value <= max)){
                    return this.applyError('number.safe', field, options, {
                        min, max
                    })
                }
            }
        };
        return this;
    }

    public between(min: number, max: number, options: ITypeOptions = {}){
        this.commons.between = async (field: Field) => {            
            if(field.hasRequirements()) {
                if(!(field.value >=  min && field.value <= max)){
                    return this.applyError('number.between', field, options, {
                        min, max
                    })
                }
            }
        };
        return this;
    }

    public greater(value: number, options: ITypeOptions = {}){
        this.commons.greater = async (field: Field) => {
            if(field.hasRequirements()) {
                const isValid = (field.value > value);
                if(!isValid){
                    return this.applyError('number.greater', field, options, {value})  
                }
            }
        };

        return this;
    }

    public less(value: number, options: ITypeOptions = {}){
        this.commons.less = async (field: Field) => {
            if(field.hasRequirements()) {
                const isValid = (field.value < value);
                if(!isValid){
                    return this.applyError('number.less', field, options, {value})  
                }
            }
        };
        return this;
    }

    public greaterOrEqual(value: number, options: ITypeOptions = {}){
        this.commons.greaterOrEqual = async (field: Field) => {
            if(field.hasRequirements()) {
                const isValid = (field.value >= value);
                if(!isValid){
                    return this.applyError('number.greaterOrEqual', field, options, {value})  
                }
            }
        };
        return this;
    }

    public lessOrEqual(value: number, options: ITypeOptions = {}){
        this.commons.lessOrEqual = async (field: Field) => {
            if(field.hasRequirements()) {
                const isValid = (field.value <= value);
                if(!isValid){
                    return this.applyError('number.lessOrEqual', field, options, {value})  
                }
            }
        };
        return this;
    }

    public notEqual(value: number){
        this.commons.notEqual = async (field: Field) => {
            const verify = (field.value === value);
            if(field.hasRequirements() && verify) {
                return field.applyError(
                    'number.notEqual',
                    `Valor deve ser diferente de ${value}`,
                    `O campo ${field.label || field.path} é inválido`
                )
            }
        };
        return this;
    }

    public equalTo(value: number){
        this.commons.equalTo = async (field: Field) => {
            const verify = (field.value !== value);
            if(field.hasRequirements() && verify) {
                return field.applyError(
                    'number.equalTo',
                    `Valor deve ser igual a ${value}`,
                    `O campo ${field.label || field.path} é inválido`
                )
            }
        };
        return this;
    }

    public positive(){
        this.commons.positive = async (field: Field) => {
            const verify = (field.value < 0);
            if(field.hasRequirements() && verify) {
                return field.applyError(
                    'number.positive',
                    `Valor deve ser positivo`,
                    `O campo ${field.label || field.path} é inválido`
                )
            }
        };
        return this;
    }

    public negative(){
        this.commons.negative = async (field: Field) => {
            const verify = (field.value >= 0);
            if(field.hasRequirements() && verify) {
                return field.applyError(
                    'number.negative',
                    `Valor deve ser negativo`,
                    `O campo ${field.label || field.path} é inválido`
                )
            }
        };
        return this;
    }

    public integer(){
        this.commons.integer = async (field: Field) => {
            const verify = (field.value % 1 !== 0);
            if(field.hasRequirements() && verify) {
                return field.applyError(
                    'number.integer',
                    `Valor deve ser do tipo inteiro`,
                    `O campo ${field.label || field.path} é inválido`
                )
            }
        };
        return this;
    }

    public float(){
        this.commons.float = async (field: Field) => {
            const verify = (field.value % 1 === 0);
            if(field.hasRequirements() && verify) {
                return field.applyError(
                    'number.float',
                    `Valor deve ser decimal`,
                    `O campo ${field.label || field.path} é inválido`
                )
            }
        };
        return this;
    }

    public even(){
        this.commons.even = async (field: Field) => {
            const verify = (field.value % 2 !== 0);
            if(field.hasRequirements() && verify) {
                return field.applyError(
                    'number.even',
                    `Valor deve ser par`,
                    `O campo ${field.label || field.path} é inválido`
                )
            }
        };
        return this;
    }

    public odd(){
        this.commons.odd = async (field: Field) => {
            const verify = (field.value % 2 === 0);
            if(field.hasRequirements() && verify) {
                return field.applyError(
                    'number.odd',
                    `Valor deve ser ímpar`,
                    `O campo ${field.label || field.path} é inválido`
                )
            }
        };
        return this;
    }

    public isRequired() {

        this.commons.required = async (field: Field) => {
            const verify = !field.value
            if(verify) {
                return field.applyError(
                    'number.required',
                    'Campo obrigatório',
                    `O campo ${field.label || field.path} é obrigatório`
                )
            }
        };

        return this;
    }

    /**
     * Verifica se é um número, podendo ser um número do tipo
     * string e realiza a conversão para número.
     * @param number 
     */
    private async isValidNumber(number: number) : Promise<Number|number> {        
        return new Promise((resolve, reject) => {
            const isNumber = typeof number === "number";
            if(isNumber) resolve(number)

            const isStringNumberValid = (typeof number === "string" && new RegExp(/^(\d+|\d+?.\d+)$/,'gi').test(number))
            if(isStringNumberValid) return resolve(new Number(number))

            reject()
        })
    }

}