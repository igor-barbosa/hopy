import { TypeString } from "../../src/library/types/TypeString";
import { testTypesIfTheRuleMethodReturnInstance, testTypesIfTheRuleMethodCreateDynamicMethodInCommonsVariable, testTypeIfTheRuleMethodNotReturnErrorsWithValidValues, testTypesIfTheRuleMethodReturnObjectErrorWithInvalidValues, testTypesIfTheRuleMethodGenerateErrorsWithMessagePassedInArguments, testTypesIfTheRuleMethodGenerateErrorsWithMessageFunctionsPassedInArguments, testTypesShouldConvertToExpecetedValue } from "../../__helperTests__/testTypes";
import { ITypeOptions } from "../../src/interfaces/types/ITypeOptions";

describe('Test TypeString Class', () => {
    
    describe('Test Validation Methods', () => {
        describe('this.isString()', () => {        
            testTypesIfTheRuleMethodReturnInstance(new TypeString().isString(), TypeString) 
    
            testTypesIfTheRuleMethodCreateDynamicMethodInCommonsVariable(new TypeString().isString(), 'string')  
    
            const validValues = [undefined, null, '','abc']     
            testTypeIfTheRuleMethodNotReturnErrorsWithValidValues(new TypeString().isString(), 'string', validValues)
    
            const invalidValues = [123,[],{}]
            testTypesIfTheRuleMethodReturnObjectErrorWithInvalidValues(new TypeString().isString(), 'string', 'string',invalidValues)
    
            testTypesIfTheRuleMethodGenerateErrorsWithMessagePassedInArguments(
                (messages: ITypeOptions) => new TypeString().isString(messages),
                'string',
                'string',
                123
            )
    
            testTypesIfTheRuleMethodGenerateErrorsWithMessageFunctionsPassedInArguments(
                (messages: ITypeOptions) => new TypeString().isString(messages),
                'string',
                'string',
                123
            )
        });
    
        describe('this.isEmail()', () => {        
            const providerTypeMethod = (options: ITypeOptions = {}) => new TypeString().isString().isEmail(options)
            const errorType = "string.email"
            const commonName = "email"
            const validValues = [
                'teste@teste.com',
                'teste@teste.com.br',
                'teste@teste.tk'
            ]
            const invalidValues = [
                'teste@',
                'teste@teste',
                'teste@t.',
                'teste@t.t',
                '@teste.com.br',
                'teste@test.',
                'teste@teste.com.'
            ]
    
            testTypesIfTheRuleMethodReturnInstance(providerTypeMethod(), TypeString) 
            testTypesIfTheRuleMethodCreateDynamicMethodInCommonsVariable(providerTypeMethod(), commonName)              
            testTypeIfTheRuleMethodNotReturnErrorsWithValidValues(providerTypeMethod(), commonName, validValues)        
            testTypesIfTheRuleMethodReturnObjectErrorWithInvalidValues(providerTypeMethod(), commonName, errorType, invalidValues)
            testTypesIfTheRuleMethodGenerateErrorsWithMessagePassedInArguments(
                providerTypeMethod,
                commonName,
                errorType,
                invalidValues[0]
            )        
            testTypesIfTheRuleMethodGenerateErrorsWithMessageFunctionsPassedInArguments(
                providerTypeMethod,
                commonName,
                errorType,
                invalidValues[0]
            )
        });
    
        describe('this.max(3)', () => {        
            const max = 3;
            const providerTypeMethod = (options: ITypeOptions = {}) => new TypeString().isString().max(max, options)
            const errorType = "string.max"
            const commonName = "max"
            const validValues = [
                'a','ab','abc'
            ]
            const invalidValues = [
                'abcd'
            ]
    
            testTypesIfTheRuleMethodReturnInstance(providerTypeMethod(), TypeString) 
            testTypesIfTheRuleMethodCreateDynamicMethodInCommonsVariable(providerTypeMethod(), commonName)              
            testTypeIfTheRuleMethodNotReturnErrorsWithValidValues(providerTypeMethod(), commonName, validValues)        
            testTypesIfTheRuleMethodReturnObjectErrorWithInvalidValues(
                providerTypeMethod(), 
                commonName, 
                errorType, 
                invalidValues, 
                { max }
            )
            testTypesIfTheRuleMethodGenerateErrorsWithMessagePassedInArguments(
                providerTypeMethod,
                commonName,
                errorType,
                invalidValues[0],
                { max }
            )        
            testTypesIfTheRuleMethodGenerateErrorsWithMessageFunctionsPassedInArguments(
                providerTypeMethod,
                commonName,
                errorType,
                invalidValues[0],
                { max }
            )
        });
    
        describe('this.min(3)', () => {        
            const context = { min: 3};
            const providerTypeMethod = (options: ITypeOptions = {}) => new TypeString().isString().min(context.min, options)
            const errorType = "string.min"
            const commonName = "min"
            const validValues = [
                'abc','abcd','abcde'
            ]
            const invalidValues = [
                'ab'
            ]
    
            testTypesIfTheRuleMethodReturnInstance(providerTypeMethod(), TypeString) 
            testTypesIfTheRuleMethodCreateDynamicMethodInCommonsVariable(providerTypeMethod(), commonName)              
            testTypeIfTheRuleMethodNotReturnErrorsWithValidValues(providerTypeMethod(), commonName, validValues)        
            testTypesIfTheRuleMethodReturnObjectErrorWithInvalidValues(
                providerTypeMethod(), 
                commonName, 
                errorType, 
                invalidValues, 
                context
            )
            testTypesIfTheRuleMethodGenerateErrorsWithMessagePassedInArguments(
                providerTypeMethod,
                commonName,
                errorType,
                invalidValues[0],
                context
            )        
            testTypesIfTheRuleMethodGenerateErrorsWithMessageFunctionsPassedInArguments(
                providerTypeMethod,
                commonName,
                errorType,
                invalidValues[0],
                context
            )
        });
    
        describe('this.between(3,5)', () => {        
            const context = { min: 3, max: 5};
            const providerTypeMethod = (options: ITypeOptions = {}) => (
                new TypeString().isString().between(context.min, context.max, options)
            )
            const errorType = "string.between"
            const commonName = "between"
            const validValues = [
                '123','1234','12345'
            ]
            const invalidValues = [
                '12','123456'
            ]
    
            testTypesIfTheRuleMethodReturnInstance(providerTypeMethod(), TypeString) 
            testTypesIfTheRuleMethodCreateDynamicMethodInCommonsVariable(providerTypeMethod(), commonName)              
            testTypeIfTheRuleMethodNotReturnErrorsWithValidValues(providerTypeMethod(), commonName, validValues)        
            testTypesIfTheRuleMethodReturnObjectErrorWithInvalidValues(
                providerTypeMethod(), 
                commonName, 
                errorType, 
                invalidValues, 
                context
            )
            testTypesIfTheRuleMethodGenerateErrorsWithMessagePassedInArguments(
                providerTypeMethod,
                commonName,
                errorType,
                invalidValues[0],
                context
            )        
            testTypesIfTheRuleMethodGenerateErrorsWithMessageFunctionsPassedInArguments(
                providerTypeMethod,
                commonName,
                errorType,
                invalidValues[0],
                context
            )
        });
    
        describe('this.equal(Test)', () => {        
            const context = { equal : 'Test'};
            const providerTypeMethod = (options: ITypeOptions = {}) => (
                new TypeString().isString().equal(context.equal, options)
            )
            const errorType = "string.equal"
            const commonName = "equal"
            const validValues = [
                'Test'
            ]
            const invalidValues = [
                'Test2'
            ]
    
            testTypesIfTheRuleMethodReturnInstance(providerTypeMethod(), TypeString) 
            testTypesIfTheRuleMethodCreateDynamicMethodInCommonsVariable(providerTypeMethod(), commonName)              
            testTypeIfTheRuleMethodNotReturnErrorsWithValidValues(providerTypeMethod(), commonName, validValues)        
            testTypesIfTheRuleMethodReturnObjectErrorWithInvalidValues(
                providerTypeMethod(), 
                commonName, 
                errorType, 
                invalidValues, 
                context
            )
            testTypesIfTheRuleMethodGenerateErrorsWithMessagePassedInArguments(
                providerTypeMethod,
                commonName,
                errorType,
                invalidValues[0],
                context
            )        
            testTypesIfTheRuleMethodGenerateErrorsWithMessageFunctionsPassedInArguments(
                providerTypeMethod,
                commonName,
                errorType,
                invalidValues[0],
                context
            )
        });
    
        const regex = `^([\\d]{3})([a-zA-Z])$`;
        const flags = `gi`
        describe(`this.regex(/${regex}/${flags})`, () => {        
            const context = { regex : regex , flags: flags };
            const providerTypeMethod = (options: ITypeOptions = {}) => (
                new TypeString().isString().regex(context.regex, context.flags, options)
            )
            const errorType = "string.regex"
            const commonName = "regex"
            const validValues = [
                '123a','531b'
            ]
            const invalidValues = [
                '12','135cs'
            ]
    
            testTypesIfTheRuleMethodReturnInstance(providerTypeMethod(), TypeString) 
            testTypesIfTheRuleMethodCreateDynamicMethodInCommonsVariable(providerTypeMethod(), commonName)              
            testTypeIfTheRuleMethodNotReturnErrorsWithValidValues(providerTypeMethod(), commonName, validValues)        
            testTypesIfTheRuleMethodReturnObjectErrorWithInvalidValues(
                providerTypeMethod(), 
                commonName, 
                errorType, 
                invalidValues, 
                context
            )
            testTypesIfTheRuleMethodGenerateErrorsWithMessagePassedInArguments(
                providerTypeMethod,
                commonName,
                errorType,
                invalidValues[0],
                context
            )        
            testTypesIfTheRuleMethodGenerateErrorsWithMessageFunctionsPassedInArguments(
                providerTypeMethod,
                commonName,
                errorType,
                invalidValues[0],
                context
            )
        });

        describe('this.isRequired()', () => {    
            const providerTypeMethod = (options: ITypeOptions = {}) => (
                new TypeString().isString().isRequired(options)
            )
            const errorType = "string.required"
            const commonName = "required"
            const validValues = [
                'teste'
            ]
            const invalidValues = [
                undefined, null, ''
            ]
    
            testTypesIfTheRuleMethodReturnInstance(providerTypeMethod(), TypeString) 
            testTypesIfTheRuleMethodCreateDynamicMethodInCommonsVariable(providerTypeMethod(), commonName)              
            testTypeIfTheRuleMethodNotReturnErrorsWithValidValues(providerTypeMethod(), commonName, validValues)        
            testTypesIfTheRuleMethodReturnObjectErrorWithInvalidValues(
                providerTypeMethod(), 
                commonName, 
                errorType, 
                invalidValues
            )
            testTypesIfTheRuleMethodGenerateErrorsWithMessagePassedInArguments(
                providerTypeMethod,
                commonName,
                errorType,
                invalidValues[0]
            )        
            testTypesIfTheRuleMethodGenerateErrorsWithMessageFunctionsPassedInArguments(
                providerTypeMethod,
                commonName,
                errorType,
                invalidValues[0]
            )
        });
    });

    describe('Test Convertion Methods', () => {       

        describe('this.trim', () => {
            const providerTypeMethod = (options: ITypeOptions = {}) => new TypeString().isString().trim
            const value = ' with space on right and left ';
            const expectedValue = 'with space on right and left'
            testTypesShouldConvertToExpecetedValue(
                'should remove the spaces of left and right',
                providerTypeMethod(),
                'trim',
                value,
                expectedValue
            )
        });

        describe('this.uppercase', () => {
            const providerTypeMethod = (options: ITypeOptions = {}) => new TypeString().isString().uppercase
            const value = 'teste';
            const expectedValue = 'TESTE'
            testTypesShouldConvertToExpecetedValue(
                'should convert all letters for uppercase',
                providerTypeMethod(),
                'uppercase',
                value,
                expectedValue
            )
        });
    });

});