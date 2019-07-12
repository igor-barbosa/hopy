import {Types} from "./Types";
import {IField} from "../../interfaces/types/IField";

export class TypeNumber extends Types {

    public isNumber() {
        this.commons.number = async (field: IField) => {
            const verify = typeof field.value !== "number";
            if(this.checkRequirements(field) && verify) {
                return this.applyError (
                    'required',
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
                    'required',
                    `Valor deve estar entre ${min} e ${max}`,
                    `O campo ${field.label || field.path} é inválido`
                )
            }
        };
        return this;
    }

    public greaterThen(value: number){
        this.commons.greaterThen = async (field: IField) => {
            const verify = (field.value <= value);
            if(this.checkRequirements(field) && verify) {
                return this.applyError(
                    'required',
                    `Valor deve ser maior que ${value}`,
                    `O campo ${field.label || field.path} é inválido`
                )
            }
        };
        return this;
    }

    public lessThen(value: number){
        this.commons.lessThen = async (field: IField) => {
            const verify = (field.value >= value);
            if(this.checkRequirements(field) && verify) {
                return this.applyError(
                    'required',
                    `Valor deve ser menor que ${value}`,
                    `O campo ${field.label || field.path} é inválido`
                )
            }
        };
        return this;
    }

    public greaterOrEqualThen(value: number){
        this.commons.greaterOrEqualThen = async (field: IField) => {
            const verify = (field.value < value);
            if(this.checkRequirements(field) && verify) {
                return this.applyError(
                    'required',
                    `Valor deve ser maior ou igual a ${value}`,
                    `O campo ${field.label || field.path} é inválido`
                )
            }
        };
        return this;
    }

    public lessOrEqualThen(value: number){
        this.commons.lessOrEqualThen = async (field: IField) => {
            const verify = (field.value > value);
            if(this.checkRequirements(field) && verify) {
                return this.applyError(
                    'required',
                    `Valor deve ser menor ou igual a ${value}`,
                    `O campo ${field.label || field.path} é inválido`
                )
            }
        };
        return this;
    }

    public differentThan(value: number){
        this.commons.differentThan = async (field: IField) => {
            const verify = (field.value === value);
            if(this.checkRequirements(field) && verify) {
                return this.applyError(
                    'required',
                    `Valor deve ser diferente de ${value}`,
                    `O campo ${field.label || field.path} é inválido`
                )
            }
        };
        return this;
    }

    public equalThan(value: number){
        this.commons.equalThan = async (field: IField) => {
            const verify = (field.value !== value);
            if(this.checkRequirements(field) && verify) {
                return this.applyError(
                    'required',
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
                    'required',
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
                    'required',
                    `Valor deve ser negativo`,
                    `O campo ${field.label || field.path} é inválido`
                )
            }
        };
        return this;
    }

    public isInteger(){
        this.commons.isInteger = async (field: IField) => {
            const verify = (field.value % 1 !== 0);
            if(this.checkRequirements(field) && verify) {
                return this.applyError(
                    'required',
                    `Valor deve ser do tipo inteiro`,
                    `O campo ${field.label || field.path} é inválido`
                )
            }
        };
        return this;
    }

    public isFloat(){
        this.commons.isFloat = async (field: IField) => {
            const verify = (field.value % 1 === 0);
            if(this.checkRequirements(field) && verify) {
                return this.applyError(
                    'required',
                    `Valor deve ser decimal`,
                    `O campo ${field.label || field.path} é inválido`
                )
            }
        };
        return this;
    }

    public isEven(){
        this.commons.isEven = async (field: IField) => {
            const verify = (field.value % 2 !== 0);
            if(this.checkRequirements(field) && verify) {
                return this.applyError(
                    'required',
                    `Valor deve ser par`,
                    `O campo ${field.label || field.path} é inválido`
                )
            }
        };
        return this;
    }

    public isOdd(){
        this.commons.isOdd = async (field: IField) => {
            const verify = (field.value % 2 === 0);
            if(this.checkRequirements(field) && verify) {
                return this.applyError(
                    'required',
                    `Valor deve ser ímpar`,
                    `O campo ${field.label || field.path} é inválido`
                )
            }
        };
        return this;
    }

}