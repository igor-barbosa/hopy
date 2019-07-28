import { Field } from "../library/Field";

export interface ICustomHandler {
    (field: Field, fields: Field[]) : Promise<any>
}