import {Types} from "./Types";
import {Field} from "../Field";
import moment from 'moment';

export class TypeDate extends Types {

    public BASE_STRING = 'date';
    
    public date() {

        this.commons.date = async (field: Field) => {
            if(field.hasRequirements()) {
                const verifyMask = (typeof field.value as String !== "string" || !new RegExp(/^(\d){2}\/(\d){2}\/(\d){4}$/gm).test(field.value));
                if(verifyMask) {
                    return field.applyError (
                        'date.mask',
                        'Formato válido: 00/00/0000',
                        `O campo ${field.label || field.path} é inválido`
                    )
                } else {
                    field.value = field.value.split('/').reverse().join('-');
                    field.shadowValue = moment(field.value);
                    if(!field.shadowValue.isValid()){
                        return field.applyError(
                            'date',
                            'Campo inválido',
                            `O campo ${field.label || field.path} é inválido`
                        )
                    }
                }
            }
        };

        return this;
    }

    isBefore(date: Date){
        this.commons.isBefore = async (field: Field) => {
            const beforeDate = moment(date);
            const isValid = field.shadowValue.isBefore(beforeDate)
            if(field.hasRequirements() && !isValid){
                return field.applyError(
                    'date.isBefore',
                    `A data deve ser menor que ${beforeDate.format('DD/MM/YYYY')}`,
                    `O campo ${field.label || field.path} deve ser uma data menor que ${beforeDate.format('DD/MM/YYYY')}`
                )
            }
        }

        return this
    }

    isAfter(date: Date){
        this.commons.isAfter = async (field: Field) => {
            const beforeDate = moment(date)
            const isValid = field.shadowValue.isAfter(beforeDate)
            if(field.hasRequirements() && !isValid){
                return field.applyError(
                    'date.isAfter',
                    `A data deve ser maior que ${beforeDate.format('DD/MM/YYYY')}`,
                    `O campo ${field.label || field.path} deve ser uma data maior que ${beforeDate.format('DD/MM/YYYY')}`
                )
            }
        }

        return this
    }
}