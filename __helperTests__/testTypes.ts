import { Types } from "../src/library/types/Types";
import { Field } from "../src/library/Field";
import { ITypeOptions } from "../src/interfaces/types/ITypeOptions";

/**
 * 
 * @param type 
 * @param instanceOfType
 * 
 * @example 
 * testTypesIfTheRuleMethodReturnInstance(new TypeString().isString(), TypeString)  
 */
export function testTypesIfTheRuleMethodReturnInstance(type: Types, instanceOfType: any) {
    it(`should return the instance of type ${instanceOfType.name}`, () => {
        expect(type).toBeInstanceOf(instanceOfType);
    });
}

export function testTypesIfTheRuleMethodCreateDynamicMethodInCommonsVariable(type: Types, method: string){
    it(`should create the method ${method} in commons variable of instance`, () => {
        expect(type.commons).toHaveProperty(method)
    });
}

export function testTypeIfTheRuleMethodNotReturnErrorsWithValidValues(type: Types, common: string, values: any []){
    for(const value of values){
        it(`should return undefined because the value "${value}" is valid`, async () => {
            const input = new Field('field',value,type)
            const result: any = await type.commons[common](input);            
            expect(result).toEqual(undefined);
        });
    }    
}

export function testTypesIfTheRuleMethodReturnObjectErrorWithInvalidValues(
    type: Types, 
    common: string, 
    errorType: string, 
    values: any [], 
    context: any = null
) {
    for(const value of values){
        const textValue = (Array.isArray(value)) ? '[Array]' : value;
        it(`should return object error because the value "${textValue}" is invalid`, async () => {
            const input = new Field('field',value,type)
            const result: any = await type.commons[common](input); 
            const errorResonse = {
                type: errorType,
                ...Types.getProviderDefaultMessageString(errorType, input, context),
                context
            }        
            expect(result).toEqual(errorResonse);
            expect(result).toEqual(input.error);
        });
    }
}

export function testTypesIfTheRuleMethodGenerateErrorsWithMessagePassedInArguments(
    typesFn: (messages: ITypeOptions) => Types,
    common: string, 
    errorType: string,
    value: any,
    context: any = null
){
    it('should return the message that was passed as argument', async () => {
        const options = {
            helperText: 'TEST HELPER TEXT',
            message: 'TEST MESSAGE'
        }
        const types = typesFn(options)
        const input = new Field('field',value,types)
        const result: any = await types.commons[common](input); 
        const errorResonse = {
            type: errorType,
            ...options,
            context
        }        
        expect(result).toEqual(errorResonse);
        expect(result).toEqual(input.error);
    });

}

export function testTypesIfTheRuleMethodGenerateErrorsWithMessageFunctionsPassedInArguments(
    typesFn: (messages: ITypeOptions) => Types, 
    common: string,
    errorType: string,
    value: any,
    context: any = null
){
    it('should return the message string that was passed as message function in arguments', async () => {
        const options = {
            helperText: () => 'TEST HELPER TEXT',
            message: () => 'TEST MESSAGE'
        }
        const types = typesFn(options)
        const input = new Field('field',value,types)
        const result: any = await types.commons[common](input); 
        const errorResonse = {
            type: errorType,
            helperText: options.helperText(),
            message: options.message(),
            context
        }        
        expect(result).toEqual(errorResonse);
        expect(result).toEqual(input.error);
    });

}

export function testTypesShouldConvertToExpecetedValue(
    testDescription: string,
    types: Types,
    common: string,
    value: any,
    expcetedValue: any ){
    it(testDescription, async () => {
        const input = new Field('field',value,types)
        await types.commons[common](input)
        expect(input.value).toEqual(expcetedValue)
    });
}