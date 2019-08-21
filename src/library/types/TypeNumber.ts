import {Types} from "./Types";
import {Field} from "../Field";
import { ITypeOptions } from "../../interfaces/types/ITypeOptions";
import { isRequired, custom, defaultValue } from "../commons";

export class TypeNumber extends Types {
    static SAFE = {
        MAXIMUM: 9999999999999.99,
        MINIMUM: -9999999999999.99
    }
    
    BASE_STRING = 'number'

    public isRequired = isRequired<TypeNumber>(this);
    public defaultValue = defaultValue<TypeNumber>(this)
    public custom = custom<TypeNumber>(this)
    
    public isNumber(options: ITypeOptions = {}) {
        return this.addCommon('number', async (field: Field) => {            
            if(field.hasRequirements()) {
                try {
                    field.value = await this.isValidNumber(field.value)
                } catch(e) {
                    return this.applyError('number', field, options)  
                }
            }
        })
    }

    public max(max: number, options: ITypeOptions = {}) {
        return this.addCommon('max', async (field: Field) => {            
            if(field.hasRequirements()) {
                const isValid = field.value <= max;
                if(!isValid){
                    return this.applyError('number.max', field, options, {
                        max
                    })  
                }
            }
        })
    }

    public min(min: number, options: ITypeOptions = {}) {
        return this.addCommon('min', async (field: Field) => {            
            if(field.hasRequirements()) {
                const isValid = field.value >= min;
                if(!isValid){
                    return this.applyError('number.min', field, options, {
                        min
                    })  
                }
            }
        })
    }

    public isSafe(options: ITypeOptions = {}){
        return this.addCommon('safe', async (field: Field) => {            
            if(field.hasRequirements()) {
                const min = TypeNumber.SAFE.MINIMUM;
                const max = TypeNumber.SAFE.MAXIMUM;
                
                if(!(field.value >=  min && field.value <= max)){
                    return this.applyError('number.safe', field, options, {
                        min, max
                    })
                }
            }
        })
    }

    public between(min: number, max: number, options: ITypeOptions = {}){
        return this.addCommon('between', async (field: Field) => {            
            if(field.hasRequirements()) {
                if(!(field.value >=  min && field.value <= max)){
                    return this.applyError('number.between', field, options, {
                        min, max
                    })
                }
            }
        });
    }

    public greater(value: number, options: ITypeOptions = {}){
        return this.addCommon('greater', async (field: Field) => {
            if(field.hasRequirements()) {
                const isValid = (field.value > value);
                if(!isValid){
                    return this.applyError('number.greater', field, options, {value})  
                }
            }
        });
    }

    public less(value: number, options: ITypeOptions = {}){
        return this.addCommon('less', async (field: Field) => {
            if(field.hasRequirements()) {
                const isValid = (field.value < value);
                if(!isValid){
                    return this.applyError('number.less', field, options, {value})  
                }
            }
        });
    }

    public greaterOrEqual(value: number, options: ITypeOptions = {}){
        return this.addCommon('greaterOrEqual',  async (field: Field) => {
            if(field.hasRequirements()) {
                const isValid = (field.value >= value);
                if(!isValid){
                    return this.applyError('number.greaterOrEqual', field, options, {value})  
                }
            }
        });
    }

    public lessOrEqual(value: number, options: ITypeOptions = {}){
        return this.addCommon('lessOrEqual', async (field: Field) => {
            if(field.hasRequirements()) {
                const isValid = (field.value <= value);
                if(!isValid){
                    return this.applyError('number.lessOrEqual', field, options, {value})  
                }
            }
        });
    }

    public notEqual(value: number, options: ITypeOptions = {}){
        return this.addCommon('notEqual', async (field: Field) => {            
            if(field.hasRequirements()) {
                const isValid = (field.value !== value);
                if(!isValid){
                    return this.applyError('number.notEqual', field, options, {value})  
                }
            }
        });
    }

    public equalTo(value: number, options: ITypeOptions = {}){
        return this.addCommon('equalTo', async (field: Field) => {            
            if(field.hasRequirements()) {
                const isValid = (field.value === value);
                if(!isValid){
                    return this.applyError('number.equalTo', field, options, {value})  
                }
            }
        });
    }

    public isPositive(options: ITypeOptions = {}){
        return this.addCommon('positive', async (field: Field) => {            
            if(field.hasRequirements()) {
                const isValid = (field.value >= 0);
                if(!isValid){
                    return this.applyError('number.positive', field, options)  
                }
            }
        });
    }

    public isNegative(options: ITypeOptions = {}){
        return this.addCommon('negative', async (field: Field) => {
            if(field.hasRequirements()) {
                const isValid = (field.value < 0);
                if(!isValid){
                    return this.applyError('number.negative', field, options)  
                }
            }
        });
    }

    public isInteger(options: ITypeOptions = {}){
        return this.addCommon('integer', async (field: Field) => {            
            if(field.hasRequirements()) {
                const isValid = Number.isInteger(field.value);
                if(!isValid){
                    return this.applyError('number.integer', field, options)  
                }
            }
        });
    }

    public isEven(options: ITypeOptions = {}){
        return this.addCommon('even', async (field: Field) => {            
            if(field.hasRequirements()) {
                const isValid = (field.value % 2 === 0);
                if(!isValid){
                    return this.applyError('number.even', field, options)  
                }
            }
        });
    }

    public isOdd(options: ITypeOptions = {}){
        return this.addCommon('odd', async (field: Field) => {            
            if(field.hasRequirements()) {
                const isValid = (field.value % 2 !== 0);
                if(!isValid){
                    return this.applyError('number.odd', field, options)  
                }
            }
        });
    }

    /**
     * Verifica se é um número, podendo ser um número do tipo
     * string e realiza a conversão para número.
     * @param number 
     */
    private async isValidNumber(number: number|string) : Promise<Number|number> {        
        return new Promise((resolve, reject) => {
            const isNumber = typeof number === "number";
            if(isNumber) resolve(number as number)

            const isStringNumberValid = (typeof number === "string" && new RegExp(/^(\d+|\d+?.\d+)$/,'gi').test(number))
            if(isStringNumberValid) return resolve(parseFloat(number as string))

            reject()
        })
    }

}