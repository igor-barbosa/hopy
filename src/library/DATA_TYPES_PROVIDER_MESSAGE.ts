import { Field } from "./Field";

export const DATA_TYPES_PROVIDER_MESSAGE: any = {
    "string" : {
        helperText: (field: Field, context: any) => `Precisa ser um texto`,
        message: (field: Field, context: any) => `O campo ${field.getLabelOrPath()} precisa ser um texto`
    }
}

