import { Types } from "../../library/types/Types";

export interface Schema {
    [key: string] : Types
}

export type ISchemaOrType = Schema|Types;