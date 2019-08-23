import {Types} from "./Types";
import {Field} from "../Field";
import moment from 'moment';
import { IDateOptions, ITypeOptions } from "../../interfaces/types/ITypeOptions";
import { isRequired, custom, defaultValue, label } from '../commons';

export class TypeDate extends Types {

    public BASE_STRING = 'date';
    
    public static FORMAT_DEFAULT = 'DD/MM/YYYY';
    
    public isRequired = isRequired<TypeDate>(this);
    public defaultValue = defaultValue<TypeDate>(this)
    public custom = custom<TypeDate>(this)
    public label = label<TypeDate>(this)

    public isDate(options: IDateOptions = {}) {
        return this.addCommon('date', async (field: Field) => {
            if(field.hasRequirements()) {
                const format  = options.format || TypeDate.FORMAT_DEFAULT;
                const momentValue = moment(field.value, format, true)
                if(momentValue.isValid()){                  
                    field.shadowValue = momentValue
                } else {
                    return this.applyError('date', field, options, {
                        format
                    }) 
                }
            }
        });
    }

    isBefore(date: Date, options: ITypeOptions = {}){
        return this.addCommon('before', async (field: Field) => {            
            if(field.hasRequirements()){
                const beforeDate = moment(date);
                const isValid = field.shadowValue.isBefore(beforeDate)
                if(!isValid){
                    return this.applyError('date.before', field, options, {
                        date: beforeDate
                    })  
                } 
            }
        });
    }

    isAfter(date: Date,  options: ITypeOptions = {}){
        return this.addCommon('after', async (field: Field) => {
            if(field.hasRequirements()){
                const afterDate = moment(date);
                const isValid = field.shadowValue.isAfter(afterDate)
                if(!isValid){
                    return this.applyError('date.after', field, options, {
                        date: afterDate
                    })  
                } 
            }
        });
    }
}