import {Types} from "./Types";
import {Field} from "../Field";
import { ITypeOptions } from "../../interfaces/types/ITypeOptions";
import { isRequired } from "../commons";

export class TypeNumber extends Types {
    static SAFE = {
        MAXIMUM: 9999999999999.99,
        MINIMUM: -9999999999999.99
    }
    
    BASE_STRING = 'number'

    public isRequired = isRequired(this)
    
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

    public notEqual(value: number, options: ITypeOptions = {}){
        this.commons.notEqual = async (field: Field) => {            
            if(field.hasRequirements()) {
                const isValid = (field.value !== value);
                if(!isValid){
                    return this.applyError('number.notEqual', field, options, {value})  
                }
            }
        };
        return this;
    }

    public equalTo(value: number, options: ITypeOptions = {}){
        this.commons.equalTo = async (field: Field) => {            
            if(field.hasRequirements()) {
                const isValid = (field.value === value);
                if(!isValid){
                    return this.applyError('number.equalTo', field, options, {value})  
                }
            }
        };
        return this;
    }

    public isPositive(options: ITypeOptions = {}){
        this.commons.positive = async (field: Field) => {            
            if(field.hasRequirements()) {
                const isValid = (field.value >= 0);
                if(!isValid){
                    return this.applyError('number.positive', field, options)  
                }
            }
        };
        return this;
    }

    public isNegative(options: ITypeOptions = {}){
        this.commons.negative = async (field: Field) => {
            if(field.hasRequirements()) {
                const isValid = (field.value < 0);
                if(!isValid){
                    return this.applyError('number.negative', field, options)  
                }
            }
        };
        return this;
    }

    public isInteger(options: ITypeOptions = {}){
        this.commons.integer = async (field: Field) => {            
            if(field.hasRequirements()) {
                const isValid = Number.isInteger(field.value);
                if(!isValid){
                    return this.applyError('number.integer', field, options)  
                }
            }
        };
        return this;
    }

    public isEven(options: ITypeOptions = {}){
        this.commons.even = async (field: Field) => {            
            if(field.hasRequirements()) {
                const isValid = (field.value % 2 === 0);
                if(!isValid){
                    return this.applyError('number.even', field, options)  
                }
            }
        };

        return this;
    }

    public isOdd(options: ITypeOptions = {}){
        this.commons.odd = async (field: Field) => {            
            if(field.hasRequirements()) {
                const isValid = (field.value % 2 !== 0);
                if(!isValid){
                    return this.applyError('number.odd', field, options)  
                }
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