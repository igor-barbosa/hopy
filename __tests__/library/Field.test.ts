import { Field } from "../../src/library/Field";
import { TypeString } from "../../src/library/types/TypeString";

describe('Test Field Class', () => {

    const field = new Field('name', 'value', new TypeString().isString(), 'label');

    it('should set properties by instance class', () => {
        expect(field.path).toEqual('name');
        expect(field.label).toEqual('label');
        expect(field.value).toEqual('value');
        expect(field.type).toBeInstanceOf(TypeString);
    });

    it('should check if field is valid and return true', () => {
        expect(field.isValid()).toEqual(true)
    });

    it('should apply error on field instance and return the error', () => {
        const expected: any = {
            type: 'string',
            shortMessage: 'shortMessage',
            longMessage: 'longMessage',
            context: 'context'
        }

        const result = field.applyError(
            expected.type, 
            expected.shortMessage, 
            expected.longMessage,{
                context: expected.context
            }
        )

        expect(result).toEqual(expected);
        expect(field.error).toEqual(expected);
    });

    it('should check if the field is valid and return false', () => {
        expect(field.isValid()).toEqual(false)
    });

    //TODO: Testar se é possível setar o shadowValue
    //TODO: Testar se é possível setar os valores permitidos "allows"
});