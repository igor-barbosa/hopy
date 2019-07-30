import { Field } from "../library/Field";

export interface IFieldMessageFunction {
    (field: Field, context: any) : string
} 

export type IFieldMessage = string | IFieldMessageFunction;