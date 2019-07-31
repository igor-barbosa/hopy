import { Field } from "./Field";

export const DATA_TYPES_PROVIDER_MESSAGE: any = {
    "string" : {
        helperText: (field: Field, context: any) => `Precisa ser um texto`,
        message: (field: Field, context: any) => `O campo ${field.getLabelOrPath()} precisa ser um texto`
    },
    "string.email":{
        helperText: (field: Field, context: any) => `Formato de e-mail inválido`,
        message: (field: Field, context: any) => `O campo ${field.getLabelOrPath()} precisa ter um formato deil válido`
    },
    "string.max":{
        helperText: (field: Field, context: any) => `Deve conter no máximo ${context.max} caracteres`,
        message: (field: Field, context: any) => `O campo ${field.getLabelOrPath()} deve conter no máximo ${context.max} caracteres`
    },
    "string.min":{
        helperText: (field: Field, context: any) => `Deve conter no mínimo ${context.max} caracteres`,
        message: (field: Field, context: any) => `O campo ${field.getLabelOrPath()} deve conter no mínimo ${context.max} caracteres`
    },
    "string.between":{
        helperText: (field: Field, context: any) => `Deve conter entre ${context.min} e ${context.max} caracteres`,
        message: (field: Field, context: any) => `O campo ${field.getLabelOrPath()} deve conter entre ${context.min} e ${context.max} caracteres`
    },
    "string.equal":{
        helperText: (field: Field, context: any) => `Deve ser igual a ${context.equal}`,
        message: (field: Field, context: any) => `O campo ${field.getLabelOrPath()} deve ser igual a ${context.equal}`
    },
    "string.regex":{
        helperText: (field: Field, context: any) => `Deve ser igual passar na regex /${context.regex}/${context.flags}`,
        message: (field: Field, context: any) => `O campo ${field.getLabelOrPath()} deve ser igual passar na regex /${context.regex}/${context.flags}`
    }
}