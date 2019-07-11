import {Types} from "./Types";
import {IField} from "../../interfaces/types/IField";

export class TypeString extends Types {


    public isString() {
        this.commons.string = async (field: IField) => {
            const verify = typeof field.value !== "string";
            if(this.checkRequirements(field) && verify) {
                return this.applyError (
                    'required',
                    'Campo inválido',
                    `O campo ${field.label || field.path} é inválido`
                )
            }
        };

        return this;
    }



    public between(min: number, max: number) {

        this.commons.between = async (field: IField) => {
            const verify = (field.value.toString().trim().length < min || field.value.toString().trim().length > max);
            if(this.checkRequirements(field) && verify) {
                return this.applyError(
                    'between',
                    `Deve ter entre ${min} e ${max} caracteres.`,
                    `O campo ${field.label || field.path} não contém a quantidade de caracteres necessária`,
                    {
                        context: { min, max }
                    }
                )
            }
        };

        return this;
    }
}