import {TypeNumber} from './../../src/library/types/TypeNumber'
import { testTypesIfTheRuleMethodReturnInstance, testTypesIfTheRuleMethodCreateDynamicMethodInCommonsVariable, testTypeIfTheRuleMethodNotReturnErrorsWithValidValues, testTypesIfTheRuleMethodReturnObjectErrorWithInvalidValues, testTypesIfTheRuleMethodGenerateErrorsWithMessagePassedInArguments, testTypesIfTheRuleMethodGenerateErrorsWithMessageFunctionsPassedInArguments, testTypesShouldConvertToExpecetedValue, testTypes } from "../../__helperTests__/testTypes";
import { ITypeOptions } from "../../src/interfaces/types/ITypeOptions";


describe('Test TypeNumber Class', () => {

    describe('Test Validation Methods', () => {

        describe('this.isNumber()', () => {  
            const providerTypeMethod = (options: ITypeOptions = {}) => (
                new TypeNumber().isNumber(options)
            )    
            testTypes(
                providerTypeMethod,
                TypeNumber,
                'number',
                'number',
                [123,0,-1,100.201,-145.151,'20'],
                ["abc",false,true,{}, []]
            )
        });

        describe('this.isSafe()', () => {  
            const min = TypeNumber.SAFE.MINIMUM;
            const max = TypeNumber.SAFE.MAXIMUM;
            const context = {min, max};
            const providerTypeMethod = (options: ITypeOptions = {}) => (
                new TypeNumber().isNumber().isSafe(options)
            )    
            testTypes(
                providerTypeMethod,
                TypeNumber,
                'number.safe',
                'number',
                [99999,999999.99999, -99999, -999999.99999],
                [-999999999999999999999999,999999999999999999999999],
                context
            )
        });

        describe('this.between(10,100)', () => { 
            
            const min = 10;
            const max = 100;

            const context = {min, max};
            const providerTypeMethod = (options: ITypeOptions = {}) => (
                new TypeNumber().isNumber().between(min, max, options)
            )    
            testTypes(
                providerTypeMethod,
                TypeNumber,
                'number.between',
                'number',
                [10,50,99,100],
                [9,101],
                context
            )
        });

        describe('this.greater(5)', () => { 
            
            const context = {value: 5};
            const providerTypeMethod = (options: ITypeOptions = {}) => (
                new TypeNumber().isNumber().greater(context.value, options)
            )    
            testTypes(
                providerTypeMethod,
                TypeNumber,
                'number.greater',
                'number',
                [6,7,8],
                [4,5],
                context
            )
        });

        describe('this.less(5)', () => { 
            
            const context = {value: 5};
            const providerTypeMethod = (options: ITypeOptions = {}) => (
                new TypeNumber().isNumber().less(context.value, options)
            )    
            testTypes(
                providerTypeMethod,
                TypeNumber,
                'number.less',
                'number',
                [3,4],
                [5,6],
                context
            )
        });

        describe('this.max(5)', () => {   
            const context = {max: 5} 
            const providerTypeMethod = (options: ITypeOptions = {}) => (
                new TypeNumber().isNumber().max(context.max,options)
            )    
            testTypes(
                providerTypeMethod,
                TypeNumber,
                'number.max',
                'max',
                [4,5],
                [6],
                context
            )
        });

        describe('this.min(5)', () => {   
            const context = {min: 5} 
            const providerTypeMethod = (options: ITypeOptions = {}) => (
                new TypeNumber().isNumber().min(context.min,options)
            )    
            testTypes(
                providerTypeMethod,
                TypeNumber,
                'number.min',
                'min',
                [5,6],
                [4],                
                context
            )
        });

        describe('this.equalTo(5)', () => {   
            const context = {values: [5]} 
            const providerTypeMethod = (options: ITypeOptions = {}) => (
                new TypeNumber().isNumber().equalTo(context.values[0],options)
            )    
            testTypes(
                providerTypeMethod,
                TypeNumber,
                'number.equalTo',
                'number',
                [5],
                [4],                
                context
            )
        });

        describe('this.equalTo(5,3)', () => {   
            const context = {values: [5, 3]} 
            const providerTypeMethod = (options: ITypeOptions = {}) => (
                new TypeNumber().isNumber().equalTo(context.values,options)
            )    
            testTypes(
                providerTypeMethod,
                TypeNumber,
                'number.equalTo',
                'number',
                context.values,
                [4],                
                context
            )
        });

        describe('this.notEqualTo(5)', () => {   
            const context = {values: [5]} 
            const providerTypeMethod = (options: ITypeOptions = {}) => (
                new TypeNumber().isNumber().notEqualTo(context.values[0],options)
            )    
            testTypes(
                providerTypeMethod,
                TypeNumber,
                'number.notEqualTo',
                'number',
                [4],
                [5],                
                context
            )
        });

        describe('this.notEqualTo(5,3)', () => {   
            const context = {values: [5,3]} 
            const providerTypeMethod = (options: ITypeOptions = {}) => (
                new TypeNumber().isNumber().notEqualTo(context.values,options)
            )    
            testTypes(
                providerTypeMethod,
                TypeNumber,
                'number.notEqualTo',
                'number',
                [4],
                context.values,                
                context
            )
        });

        describe('this.isPositive()', () => {   
            const providerTypeMethod = (options: ITypeOptions = {}) => (
                new TypeNumber().isNumber().isPositive(options)
            )    
            testTypes(
                providerTypeMethod,
                TypeNumber,
                'number.positive',
                'number',
                [0,1],
                [-1]
            )
        });
        
        describe('this.isNegative()', () => {   
            const providerTypeMethod = (options: ITypeOptions = {}) => (
                new TypeNumber().isNumber().isNegative(options)
            )    
            testTypes(
                providerTypeMethod,
                TypeNumber,
                'number.negative',
                'number',
                [-1],
                [0,1]
            )
        });

        describe('this.isInteger()', () => {   
            const providerTypeMethod = (options: ITypeOptions = {}) => (
                new TypeNumber().isNumber().isInteger(options)
            )    
            testTypes(
                providerTypeMethod,
                TypeNumber,
                'number.integer',
                'number',
                [-1,0,1],
                [1.53,1.50]
            )
        });

        describe('this.isEven()', () => {   
            const providerTypeMethod = (options: ITypeOptions = {}) => (
                new TypeNumber().isNumber().isEven(options)
            )    
            testTypes(
                providerTypeMethod,
                TypeNumber,
                'number.even',
                'number',
                [0,2,4],
                [1,3,5]
            )
        });

        describe('this.isOdd()', () => {   
            const providerTypeMethod = (options: ITypeOptions = {}) => (
                new TypeNumber().isNumber().isOdd(options)
            )    
            testTypes(
                providerTypeMethod,
                TypeNumber,
                'number.odd',
                'number',
                [1,3,5],
                [0,2,4]
            )
        });
    })
    
})