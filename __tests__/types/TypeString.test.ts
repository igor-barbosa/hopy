import { TypeString } from "../../src/library/types/TypeString";
import { testTypesIfTheRuleMethodReturnInstance, testTypesIfTheRuleMethodCreateDynamicMethodInCommonsVariable, testTypeIfTheRuleMethodNotReturnErrorsWithValidValues, testTypesIfTheRuleMethodReturnObjectErrorWithInvalidValues, testTypesIfTheRuleMethodGenerateErrorsWithMessagePassedInArguments, testTypesIfTheRuleMethodGenerateErrorsWithMessageFunctionsPassedInArguments, testTypesShouldConvertToExpecetedValue, testTypes } from '../../__helperTests__/testTypes';
import { ITypeOptions } from "../../src/interfaces/types/ITypeOptions";

describe('Test TypeString Class', () => {
    
    describe('Test Validation Methods', () => {

        describe('this.isString()', () => {  
            const providerTypeMethod = (options: ITypeOptions = {}) => (
                new TypeString().isString(options)
            )    
            testTypes(
                providerTypeMethod,
                TypeString,
                'string',
                'string',
                ['','abc'],
                [123,[],{}]
            )
        });

        describe('this.isEmail()', () => {  
            const providerTypeMethod = (options: ITypeOptions = {}) => (
                new TypeString().isString().isEmail(options)
            )    
            testTypes(
                providerTypeMethod,
                TypeString,
                'string.email',
                'string',
                ['teste@teste.com','teste@teste.com.br','teste@teste.tk'],
                [
                    'teste@',
                    'teste@teste',
                    'teste@t.',
                    'teste@t.t',
                    '@teste.com.br',
                    'teste@test.',
                    'teste@teste.com.'
                ]
            )
        });

        describe('this.max(3)', () => {  
            const context = { max: 3 };
            const providerTypeMethod = (options: ITypeOptions = {}) => (
                new TypeString().isString().max(context.max, options)
            )    
            testTypes(
                providerTypeMethod,
                TypeString,
                'string.max',
                'string',
                ['a','ab','abc'],
                ['abcd'],
                context
            )
        });
    
        describe('this.min(3)', () => {  
            const context = { min: 3 };
            const providerTypeMethod = (options: ITypeOptions = {}) => (
                new TypeString().isString().min(context.min, options)
            )    
            testTypes(
                providerTypeMethod,
                TypeString,
                'string.min',
                'string',
                ['abc','abcd','abcde'],
                ['ab'],
                context
            )
        });

        describe('this.between(3,5)', () => {  
            const context = { min: 3, max: 5};
            const providerTypeMethod = (options: ITypeOptions = {}) => (
                new TypeString().isString().between(context.min, context.max, options)
            )    
            testTypes(
                providerTypeMethod,
                TypeString,
                'string.between',
                'string',
                ['123','1234','12345'],
                ['12','123456'],
                context
            )
        });

        describe('this.equalTo(Test)', () => {  
            const context = { values : ['Test']};
            const providerTypeMethod = (options: ITypeOptions = {}) => (
                new TypeString().isString().equalTo(context.values[0], options)
            )    

            testTypes(
                providerTypeMethod,
                TypeString,
                'string.equalTo',
                'string',
                ['Test'],
                ['Test2'],
                context
            )
        });

        describe('this.equalTo([teste1, teste2])', () => {  
            const context = { values : ['teste1', 'teste2']};
            const providerTypeMethod = (options: ITypeOptions = {}) => (
                new TypeString().isString().equalTo(context.values, options)
            )    

            testTypes(
                providerTypeMethod,
                TypeString,
                'string.equalTo',
                'string',
                ['teste1', 'teste2'],
                ['test3'],
                context
            )
        });

        describe('this.notEqualTo(Test)', () => {  
            const context = { values : ['Test']};
            const providerTypeMethod = (options: ITypeOptions = {}) => (
                new TypeString().isString().notEqualTo(context.values[0], options)
            )    

            testTypes(
                providerTypeMethod,
                TypeString,
                'string.notEqualTo',
                'string',
                ['Test2'],
                ['Test'],
                context
            )
        });

        describe('this.notEqualTo([Test, Teste3])', () => {  
            const context = { values : ['Test', 'Teste3']};
            const providerTypeMethod = (options: ITypeOptions = {}) => (
                new TypeString().isString().notEqualTo(context.values, options)
            )    

            testTypes(
                providerTypeMethod,
                TypeString,
                'string.notEqualTo',
                'string',
                ['Test2'],
                ['Test','Teste3'],
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

            testTypes(
                providerTypeMethod,
                TypeString,
                'string.regex',
                'string',
                ['123a','531b'],
                ['12','135cs'],
                context
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