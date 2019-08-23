import { Field } from "./Field";

export const DATA_TYPES_PROVIDER_MESSAGE: any = {
    "string" : {
        helperText: (field: Field, context: any) => `Valor inválido`,
        message: (field: Field, context: any) => `O campo ${field.getLabelOrPath()} contém um valor inválido.`
    },
    "string.email":{
        helperText: (field: Field, context: any) => `Formato de e-mail inválido`,
        message: (field: Field, context: any) => `O campo ${field.getLabelOrPath()} contém o formato de e-mail válido.`
    },
    "string.max":{
        helperText: (field: Field, context: any) => `Máximo caracteres: ${context.max}`,
        message: (field: Field, context: any) => `O campo ${field.getLabelOrPath()} deve conter no máximo ${context.max} caracteres`
    },
    "string.min":{
        helperText: (field: Field, context: any) => `Mínimo caracteres: ${context.max}`,
        message: (field: Field, context: any) => `O campo ${field.getLabelOrPath()} deve conter no mínimo ${context.max} caracteres`
    },
    "string.between":{
        helperText: (field: Field, context: any) => `Deve conter entre ${context.min} e ${context.max} caracteres`,
        message: (field: Field, context: any) => `O campo ${field.getLabelOrPath()} deve conter entre ${context.min} e ${context.max} caracteres`
    },
    "string.equalTo":{
        helperText: (field: Field, context: any) => `Deve ser igual a ${context.values.join(',')}`,
        message: (field: Field, context: any) => `O campo ${field.getLabelOrPath()} deve ser igual a ${context.values.join(',')}`
    },
    "string.notEqualTo":{
        helperText: (field: Field, context: any) => `Não deve ser igual a ${context.values.join(',')}`,
        message: (field: Field, context: any) => `O campo ${field.getLabelOrPath()} não deve ser igual a ${context.values.join(',')}`
    },
    "string.regex":{
        helperText: (field: Field, context: any) => `Formato inválido`,
        message: (field: Field, context: any) => `O campo ${field.getLabelOrPath()} cotém o formato inválido`
    },
    "string.required":{
        helperText: (field: Field, context: any) => `Campo obrigatório`,
        message: (field: Field, context: any) => `O campo ${field.getLabelOrPath()} é obrigatório`
    },
    /**
     * Number
     */
    "number":{
        helperText: (field: Field, context: any) => `Deve ser um número`,
        message: (field: Field, context: any) => `O campo ${field.getLabelOrPath()} deve ser numérico`
    },
    "number.safe":{
        helperText: (field: Field, context: any) => `Deve conter entre ${context.min} e ${context.max} caracteres`,
        message: (field: Field, context: any) => `O campo ${field.getLabelOrPath()} deve conter entre ${context.min} e ${context.max} caracteres`
    },
    "number.between":{
        helperText: (field: Field, context: any) => `Deve ser um número entre ${context.min} e ${context.max}`,
        message: (field: Field, context: any) => `O campo ${field.getLabelOrPath()} deve ser um número entre ${context.min} e ${context.max}`
    },
    "number.greater":{
        helperText: (field: Field, context: any) => `Deve ser um número maior que ${context.value}`,
        message: (field: Field, context: any) => `O campo ${field.getLabelOrPath()} deve ser um número maior que ${context.value}`
    },
    "number.less":{
        helperText: (field: Field, context: any) => `Deve ser um número menor que ${context.value}`,
        message: (field: Field, context: any) => `O campo ${field.getLabelOrPath()} deve ser um número menor que ${context.value}`
    },
    "number.notEqualTo":{
        helperText: (field: Field, context: any) => `Não deve ser igual a ${context.values.join(',')}`,
        message: (field: Field, context: any) => `O campo ${field.getLabelOrPath()} não deve ser igual a ${context.values.join(',')}`
    },
    "number.equalTo":{
        helperText: (field: Field, context: any) => `Deve ser igual a ${context.values.join(',')}`,
        message: (field: Field, context: any) => `O campo ${field.getLabelOrPath()} deve ser igual a ${context.values.join(',')}`
    },
    "number.positive":{
        helperText: (field: Field, context: any) => `Deve ser um número positivo`,
        message: (field: Field, context: any) => `O campo ${field.getLabelOrPath()} deve ser um número positivo`
    },
    "number.negative":{
        helperText: (field: Field, context: any) => `Deve ser um número negativo`,
        message: (field: Field, context: any) => `O campo ${field.getLabelOrPath()} deve ser um número negativo`
    },
    "number.integer":{
        helperText: (field: Field, context: any) => `Deve ser um número inteiro`,
        message: (field: Field, context: any) => `O campo ${field.getLabelOrPath()} deve ser um número inteiro`
    },
    "number.required":{
        helperText: (field: Field, context: any) => `Campo obrigatório`,
        message: (field: Field, context: any) => `O campo ${field.getLabelOrPath()} é obrigatório`
    },
    "number.even":{
        helperText: (field: Field, context: any) => `Deve ser um número par`,
        message: (field: Field, context: any) => `O campo ${field.getLabelOrPath()} deve ser um número par`
    },
    "number.odd":{
        helperText: (field: Field, context: any) => `Deve ser um número impar`,
        message: (field: Field, context: any) => `O campo ${field.getLabelOrPath()} deve ser um número impar`
    },
    "number.max":{
        helperText: (field: Field, context: any) => `Deve ser um número menor ou igual a ${context.max}`,
        message: (field: Field, context: any) => `O campo ${field.getLabelOrPath()} deve ser um número menor ou igual a ${context.max}`        
    },
    "number.min":{
        helperText: (field: Field, context: any) => `Deve ser um número maior ou igual a ${context.min}`,
        message: (field: Field, context: any) => `O campo ${field.getLabelOrPath()} deve ser um número maior ou igual a ${context.min}`
    },
    /**
     * Object
     */
    "object":{
        helperText: (field: Field, context: any) => `Fomarto invalido`,
        message: (field: Field, context: any) => `O campo ${field.getLabelOrPath()} contém o formato inválido`
    },
    /**
     * Array
     */
    "array":{
        helperText: (field: Field, context: any) => `Fomarto invalido`,
        message: (field: Field, context: any) => `O campo ${field.getLabelOrPath()} contém o formato inválido`
    },
    "array.min":{
        helperText: (field: Field, context: any) => `Deve conter no mínimo ${context.min} itens`,
        message: (field: Field, context: any) => `O campo ${field.getLabelOrPath()} deve conter no mínimo ${context.min} itens`
    },
    "array.max":{
        helperText: (field: Field, context: any) => `Deve conter no máximo ${context.max} itens`,
        message: (field: Field, context: any) => `O campo ${field.getLabelOrPath()} deve conter no mínimo ${context.max} itens`
    },
    "array.required":{
        helperText: (field: Field, context: any) => `Campo obrigatório`,
        message: (field: Field, context: any) => `O campo ${field.getLabelOrPath()} é obrigatório`
    },
    /**
     * DATE
     */
    "date":{
        helperText: (field: Field, context: any) => `Data inválida`,
        message: (field: Field, context: any) => `O campo ${field.getLabelOrPath()} deve ser uma data válida.`
    },
    "date.before":{
        helperText: (field: Field, context: any) => `Deve ser anterior a ${context.date.format('DD/MM/YYYY')}`,
        message: (field: Field, context: any) => `O campo ${field.getLabelOrPath()} deve ser anterior a ${context.date.format('DD/MM/YYYY')}`
    },
    "date.after":{
        helperText: (field: Field, context: any) => `Deve ser posterior a ${context.date.format('DD/MM/YYYY')}`,
        message: (field: Field, context: any) => `O campo ${field.getLabelOrPath()} deve ser posterior a ${context.date.format('DD/MM/YYYY')}`
    },
    /**
     * boolean
     */
    "boolean":{
        helperText: (field: Field, context: any) => `Valor inválido`,
        message: (field: Field, context: any) => `O campo ${field.getLabelOrPath()} contém um valor inválido`
    },
}   