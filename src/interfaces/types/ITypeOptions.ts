import { IFieldMessage } from "../DATA_TYPES_PROVIDER_MESSAGE_INTERFACES";

export interface ITypeOptions {
    helperText ?: IFieldMessage,
    message ?: IFieldMessage
}

export interface IDateOptions extends ITypeOptions {
    format ?: string,
}
