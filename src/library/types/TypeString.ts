import {Types} from "./Types";
import {Field} from "../Field";
import { DATA_TYPES_PROVIDER_MESSAGE } from "../DATA_TYPES_PROVIDER_MESSAGE";
import { ITypeOptions } from "../../interfaces/types/ITypeOptions";

export class TypeString extends Types {

    public BASE_STRING = 'string';
    
    public isString(options: ITypeOptions = {}) {
        this.commons.string = async (field: Field) => {            
            if(field.hasRequirements()) {
                const isValid = typeof field.value as String === "string";
                if(!isValid){
                    return this.applyError('string', field, options)  
                }              
            }
        };

        return this;
    }

    public isEmail(options: ITypeOptions = {}) {

        this.commons.email = async(field: Field) => {
            if (field.hasRequirements()){
                const regex =  /^[-!#$%&'*+\/0-9=?A-Z^_a-z{|}~](\.?[-!#$%&'*+\/0-9=?A-Z^_a-z`{|}~])*@[a-zA-Z0-9](-*\.?[a-zA-Z0-9])*\.[a-zA-Z](-?[a-zA-Z0-9])+$/
                const isValid = new RegExp(regex).test(field.value)
                if(!isValid) {
                    return this.applyError('string.email', field, options) 
                }
            }
        }

        return this
    }

    public max(max: number, options: ITypeOptions = {}) {
        this.commons.max = async (field: Field) => {
            if(field.hasRequirements()) {
                const isValid = (field.value.toString().trim().length <= max)
                if(!isValid){
                    return this.applyError('string.max', field, options, { max }) 
                }
            }
        }

        return this
    }

    public min(min: number, options: ITypeOptions = {}) {
        this.commons.min = async (field: Field) => {            
            if(field.hasRequirements()) {
                const isValid = (field.value.toString().trim().length >= min)
                if(!isValid) {
                    return this.applyError('string.min', field, options, { min }) 
                }
            }
        }

        return this
    }

    public between(min: number, max: number, options: ITypeOptions = {}) {
        this.commons.between = async (field: Field) => {
            if(field.hasRequirements()) {
                const isValid = (field.value.toString().trim().length >= min && field.value.toString().trim().length <= max)
                if(!isValid){
                    return this.applyError('string.between', field, options, { min, max }) 
                }
            }
        };

        return this
    }

    public equal(equal:string, options: ITypeOptions = {}){
        this.commons.equal = async(field: Field) => {
            if (field.hasRequirements()){
                const isValid = (field.value === equal)
                if(!isValid){
                    return this.applyError('string.equal', field, options, {equal}) 
                }
            }
        }

        return this
    }

    public regex(regex: string, flags: string, options: ITypeOptions = {}){
        this.commons.regex = async (field: Field) => {            
            if (field.hasRequirements()){
                const isValid = new RegExp(regex, flags).test(field.value);
                if(!isValid){
                    return this.applyError('string.regex', field, options, {regex, flags}) 
                }
            }
        };

        return this
    }

    get trim() {
        this.commons.trim = async (field: Field) => {            
            if(field.hasRequirements()) {
                field.value = field.value.trim()              
            }
        }
        return this;
    }

    get uppercase() {
        this.commons.uppercase = async (field: Field) => {            
            if(field.hasRequirements()) {
                field.value = field.value.toUpperCase()          
            }
        }
        return this;
    }
    
}