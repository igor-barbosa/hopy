import {Types} from "./Types";
import {Field} from "../Field";
import { ITypeOptions } from "../../interfaces/types/ITypeOptions";
import { isRequired, defaultValue, custom } from "../commons";

export class TypeString extends Types {

    public BASE_STRING = 'string';
    
    public isRequired = isRequired(this);
    public defaultValue = defaultValue(this)
    public custom = custom(this)
    
    public isString(options: ITypeOptions = {}) {
        return this.addCommon('string', async (field) => {
            if(field.hasRequirements()) {
                const isValid = typeof field.value as String === "string";
                if(!isValid){
                    return this.applyError('string', field, options)  
                }              
            }
        })
    }

    public isEmail(options: ITypeOptions = {}) {
        return this.addCommon('email', async(field: Field) => {
            if (field.hasRequirements()){
                const regex =  /^[-!#$%&'*+\/0-9=?A-Z^_a-z{|}~](\.?[-!#$%&'*+\/0-9=?A-Z^_a-z`{|}~])*@[a-zA-Z0-9](-*\.?[a-zA-Z0-9])*\.[a-zA-Z](-?[a-zA-Z0-9])+$/
                const isValid = new RegExp(regex).test(field.value)
                if(!isValid) {
                    return this.applyError('string.email', field, options) 
                }
            }
        })
    }

    public max(max: number, options: ITypeOptions = {}) {
        return this.addCommon('max', async (field: Field) => {
            if(field.hasRequirements()) {
                const isValid = (field.value.toString().trim().length <= max)
                if(!isValid){
                    return this.applyError('string.max', field, options, { max }) 
                }
            }
        })
    }

    public min(min: number, options: ITypeOptions = {}) {
        return this.addCommon('min', async (field: Field) => {            
            if(field.hasRequirements()) {
                const isValid = (field.value.toString().trim().length >= min)
                if(!isValid) {
                    return this.applyError('string.min', field, options, { min }) 
                }
            }
        })
    }

    public between(min: number, max: number, options: ITypeOptions = {}) {
        return this.addCommon('between', async (field: Field) => {
            if(field.hasRequirements()) {
                const isValid = (field.value.toString().trim().length >= min && field.value.toString().trim().length <= max)
                if(!isValid){
                    return this.applyError('string.between', field, options, { min, max }) 
                }
            }
        })
    }

    public equal(equal:string, options: ITypeOptions = {}){
        return this.addCommon('equal', async(field: Field) => {
            if (field.hasRequirements()){
                const isValid = (field.value === equal)
                if(!isValid){
                    return this.applyError('string.equal', field, options, {equal}) 
                }
            }
        })
    }

    public regex(regex: string, flags: string, options: ITypeOptions = {}){
        return this.addCommon('regex', async (field: Field) => {            
            if (field.hasRequirements()){
                const isValid = new RegExp(regex, flags).test(field.value);
                if(!isValid){
                    return this.applyError('string.regex', field, options, {regex, flags}) 
                }
            }
        })
    }

    get trim() {
        return this.addCommon('trim', async (field: Field) => {            
            if(field.hasRequirements()) {
                field.value = field.value.trim()              
            }
        })
    }

    get uppercase() {
        return this.addCommon('uppercase', async (field: Field) => {            
            if(field.hasRequirements()) {
                field.value = field.value.toUpperCase()          
            }
        });
    }
    
}