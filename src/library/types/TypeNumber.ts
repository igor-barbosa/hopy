import {Types} from "./Types";
import {IField} from "../../interfaces/types/IField";

export class TypeNumber extends Types {

    public isNumber() {
        this.commons.number = async (field: IField) => {
            const verify = typeof field.value !== "number";
            if(this.checkRequirements(field) && verify) {
                return this.applyError (
                    'number',
                    'Valor deve ser numérico',
                    `O campo ${field.label || field.path} é inválido`
                )
            }
        };
        return this;
    }

    public between(min: number, max: number){
        this.commons.between = async (field: IField) => {
            const verify = (field.value < min || field.value > max);
            if(this.checkRequirements(field) && verify) {
                return this.applyError(
                    'number.between',
                    `Valor deve estar entre ${min} e ${max}`,
                    `O campo ${field.label || field.path} é inválido`
                )
            }
        };
        return this;
    }

    public greater(value: number){
        this.commons.greater = async (field: IField) => {
            const verify = (field.value <= value);
            if(this.checkRequirements(field) && verify) {
                return this.applyError(
                    'number.greater',
                    `Valor deve ser maior que ${value}`,
                    `O campo ${field.label || field.path} é inválido`
                )
            }
        };
        return this;
    }

    public less(value: number){
        this.commons.less = async (field: IField) => {
            const verify = (field.value >= value);
            if(this.checkRequirements(field) && verify) {
                return this.applyError(
                    'number.less',
                    `Valor deve ser menor que ${value}`,
                    `O campo ${field.label || field.path} é inválido`
                )
            }
        };
        return this;
    }

    public greaterOrEqual(value: number){
        this.commons.greaterOrEqual = async (field: IField) => {
            const verify = (field.value < value);
            if(this.checkRequirements(field) && verify) {
                return this.applyError(
                    'number.greaterOrEqual',
                    `Valor deve ser maior ou igual a ${value}`,
                    `O campo ${field.label || field.path} é inválido`
                )
            }
        };
        return this;
    }

    public lessOrEqual(value: number){
        this.commons.lessOrEqual = async (field: IField) => {
            const verify = (field.value > value);
            if(this.checkRequirements(field) && verify) {
                return this.applyError(
                    'number.lessOrEqual',
                    `Valor deve ser menor ou igual a ${value}`,
                    `O campo ${field.label || field.path} é inválido`
                )
            }
        };
        return this;
    }

    public notEqual(value: number){
        this.commons.notEqual = async (field: IField) => {
            const verify = (field.value === value);
            if(this.checkRequirements(field) && verify) {
                return this.applyError(
                    'number.notEqual',
                    `Valor deve ser diferente de ${value}`,
                    `O campo ${field.label || field.path} é inválido`
                )
            }
        };
        return this;
    }

    public equalTo(value: number){
        this.commons.equalTo = async (field: IField) => {
            const verify = (field.value !== value);
            if(this.checkRequirements(field) && verify) {
                return this.applyError(
                    'number.equalTo',
                    `Valor deve ser igual a ${value}`,
                    `O campo ${field.label || field.path} é inválido`
                )
            }
        };
        return this;
    }

    public positive(){
        this.commons.positive = async (field: IField) => {
            const verify = (field.value < 0);
            if(this.checkRequirements(field) && verify) {
                return this.applyError(
                    'number.positive',
                    `Valor deve ser positivo`,
                    `O campo ${field.label || field.path} é inválido`
                )
            }
        };
        return this;
    }

    public negative(){
        this.commons.negative = async (field: IField) => {
            const verify = (field.value >= 0);
            if(this.checkRequirements(field) && verify) {
                return this.applyError(
                    'number.negative',
                    `Valor deve ser negativo`,
                    `O campo ${field.label || field.path} é inválido`
                )
            }
        };
        return this;
    }

    public integer(){
        this.commons.integer = async (field: IField) => {
            const verify = (field.value % 1 !== 0);
            if(this.checkRequirements(field) && verify) {
                return this.applyError(
                    'number.integer',
                    `Valor deve ser do tipo inteiro`,
                    `O campo ${field.label || field.path} é inválido`
                )
            }
        };
        return this;
    }

    public float(){
        this.commons.float = async (field: IField) => {
            const verify = (field.value % 1 === 0);
            if(this.checkRequirements(field) && verify) {
                return this.applyError(
                    'number.float',
                    `Valor deve ser decimal`,
                    `O campo ${field.label || field.path} é inválido`
                )
            }
        };
        return this;
    }

    public even(){
        this.commons.even = async (field: IField) => {
            const verify = (field.value % 2 !== 0);
            if(this.checkRequirements(field) && verify) {
                return this.applyError(
                    'number.even',
                    `Valor deve ser par`,
                    `O campo ${field.label || field.path} é inválido`
                )
            }
        };
        return this;
    }

    public odd(){
        this.commons.odd = async (field: IField) => {
            const verify = (field.value % 2 === 0);
            if(this.checkRequirements(field) && verify) {
                return this.applyError(
                    'number.odd',
                    `Valor deve ser ímpar`,
                    `O campo ${field.label || field.path} é inválido`
                )
            }
        };
        return this;
    }

    public isRequired() {

        this.commons.required = async (field: IField) => {
            const verify = !field.value
            if(verify) {
                return this.applyError(
                    'number.required',
                    'Campo obrigatório',
                    `O campo ${field.label || field.path} é obrigatório`
                )
            }
        };

        return this;
    }

}