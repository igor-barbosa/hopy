import {Types} from "./Types";
import {Field} from "../Field";
import moment from 'moment';

export class TypeDate extends Types {

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

}