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

export function testTypesIfTheRuleMethodCreateDynamicMethodInCommonsVariable(type: Types, common: string){
    it(`should create the method ${common} in commons variable of instance`, () => {
        expect(type.hasCommon(common)).toEqual(true)
    });
}

export function testTypeIfTheRuleMethodNotReturnErrorsWithValidValues(type: Types, common: string, values: any []){
    for(const value of values){
        it(`should return undefined because the value "${value}" is valid`, async () => {
            const input = new Field('field',value,type)
            const all = await Promise.all(type.commons.map(fn => fn.method(input)));
            const result = all.filter(item => item)[0] || undefined;            
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
            const all = await Promise.all(type.commons.map(fn => fn.method(input)));
            const result = all.filter(item => item)[0] || undefined;    
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
        const all = await Promise.all(types.commons.map(fn => fn.method(input)));
        const result = all.filter(item => item)[0] || undefined; 
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
        const all = await Promise.all(types.commons.map(fn => fn.method(input)));
        const result = all.filter(item => item)[0] || undefined;     
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
        await types.getCommon(common).method(input)
        expect(input.value).toEqual(expcetedValue)
    });
}

interface IProviderType {
    (options ?: ITypeOptions) : Types
}

export function testTypes(
    providerType: IProviderType,
    instanceOf: any,
    errorType: string,
    common: string,
    validValues: any[],
    invalidValues: any[],
    context: any = null
){
    testTypesIfTheRuleMethodReturnInstance(providerType(), instanceOf) 
    testTypesIfTheRuleMethodCreateDynamicMethodInCommonsVariable(providerType(), common)              
    testTypeIfTheRuleMethodNotReturnErrorsWithValidValues(providerType(), common, validValues)        
    testTypesIfTheRuleMethodReturnObjectErrorWithInvalidValues(
        providerType(), 
        common, 
        errorType, 
        invalidValues,
        context
    )
    testTypesIfTheRuleMethodGenerateErrorsWithMessagePassedInArguments(
        providerType,
        common,
        errorType,
        invalidValues[0],
        context
    )        
    testTypesIfTheRuleMethodGenerateErrorsWithMessageFunctionsPassedInArguments(
        providerType,
        common,
        errorType,
        invalidValues[0],
        context
    )
}