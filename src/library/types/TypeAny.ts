import { Types } from "./Types";
import { Field } from "../Field";
import { isRequired, defaultValue, custom } from "../commons";

export class TypeAny extends Types {
    
    public BASE_STRING = 'any'
    
    public isRequired = isRequired<TypeAny>(this);
    public defaultValue = defaultValue<TypeAny>(this)
    public custom = custom<TypeAny>(this)

    public any() {
        return this.addCommon('any', async (field: Field) => {
            field.value = this.getBodyValue(field.path);
        })
    }
}