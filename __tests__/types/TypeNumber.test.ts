import {TypeNumber} from './../../src/library/types/TypeNumber'
import { testTypesIfTheRuleMethodReturnInstance, testTypesIfTheRuleMethodCreateDynamicMethodInCommonsVariable, testTypeIfTheRuleMethodNotReturnErrorsWithValidValues, testTypesIfTheRuleMethodReturnObjectErrorWithInvalidValues, testTypesIfTheRuleMethodGenerateErrorsWithMessagePassedInArguments, testTypesIfTheRuleMethodGenerateErrorsWithMessageFunctionsPassedInArguments, testTypesShouldConvertToExpecetedValue } from "../../__helperTests__/testTypes";
import { ITypeOptions } from "../../src/interfaces/types/ITypeOptions";


describe('Test TypeNumber Class', () => {

    describe('Test Validation Methods', () => {

        describe('this.isNumber()', () => {        
            const providerTypeMethod = (options: ITypeOptions = {}) => new TypeNumber().isNumber(options)
            const errorType = "number"
            const commonName = "number"
            const validValues = [
                123,0,-1,100.201,-145.151,'20', null, undefined
            ]
            const invalidValues = [
                "abc",false,true,{}, []
            ]
    
            testTypesIfTheRuleMethodReturnInstance(providerTypeMethod(), TypeNumber) 
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

        describe('this.isSafe()', () => { 

            const min = TypeNumber.SAFE.MINIMUM;
            const max = TypeNumber.SAFE.MAXIMUM;

            const providerTypeMethod = (options: ITypeOptions = {}) => new TypeNumber().isNumber().isSafe(options)
            const errorType = "number.safe"
            const commonName = "safe"
            const validValues = [
                99999,999999.99999
            ]
            const invalidValues = [
                -999999999999999999999999,
                999999999999999999999999
            ]
    
            testTypesIfTheRuleMethodReturnInstance(providerTypeMethod(), TypeNumber) 
            testTypesIfTheRuleMethodCreateDynamicMethodInCommonsVariable(providerTypeMethod(), commonName)              
            testTypeIfTheRuleMethodNotReturnErrorsWithValidValues(providerTypeMethod(), commonName, validValues)        
            testTypesIfTheRuleMethodReturnObjectErrorWithInvalidValues(
                providerTypeMethod(), 
                commonName, 
                errorType, 
                invalidValues,
                {min, max}
            )
            testTypesIfTheRuleMethodGenerateErrorsWithMessagePassedInArguments(
                providerTypeMethod,
                commonName,
                errorType,
                invalidValues[0],
                {min, max}
            )        
            testTypesIfTheRuleMethodGenerateErrorsWithMessageFunctionsPassedInArguments(
                providerTypeMethod,
                commonName,
                errorType,
                invalidValues[0],
                {min, max}
            )
        });

        describe('this.between(10,100)', () => { 

            const min = 10;
            const max = 100;

            const providerTypeMethod = (options: ITypeOptions = {}) => new TypeNumber().isNumber().between(min, max, options)
            const errorType = "number.between"
            const commonName = "between"
            const validValues = [
                10,50,99,100
            ]
            const invalidValues = [
                9,101
            ]
    
            testTypesIfTheRuleMethodReturnInstance(providerTypeMethod(), TypeNumber) 
            testTypesIfTheRuleMethodCreateDynamicMethodInCommonsVariable(providerTypeMethod(), commonName)              
            testTypeIfTheRuleMethodNotReturnErrorsWithValidValues(providerTypeMethod(), commonName, validValues)        
            testTypesIfTheRuleMethodReturnObjectErrorWithInvalidValues(
                providerTypeMethod(), 
                commonName, 
                errorType, 
                invalidValues,
                {min, max}
            )
            testTypesIfTheRuleMethodGenerateErrorsWithMessagePassedInArguments(
                providerTypeMethod,
                commonName,
                errorType,
                invalidValues[0],
                {min, max}
            )        
            testTypesIfTheRuleMethodGenerateErrorsWithMessageFunctionsPassedInArguments(
                providerTypeMethod,
                commonName,
                errorType,
                invalidValues[0],
                {min, max}
            )
        });

        describe('this.greater(5)', () => { 

            const value = 5;
            const providerTypeMethod = (options: ITypeOptions = {}) => new TypeNumber().isNumber().greater(value, options)
            const errorType = "number.greater"
            const commonName = "greater"
            const validValues = [
                6,7,8
            ]
            const invalidValues = [
                4,5
            ]
    
            testTypesIfTheRuleMethodReturnInstance(providerTypeMethod(), TypeNumber) 
            testTypesIfTheRuleMethodCreateDynamicMethodInCommonsVariable(providerTypeMethod(), commonName)              
            testTypeIfTheRuleMethodNotReturnErrorsWithValidValues(providerTypeMethod(), commonName, validValues)        
            testTypesIfTheRuleMethodReturnObjectErrorWithInvalidValues(
                providerTypeMethod(), 
                commonName, 
                errorType, 
                invalidValues,
                {value}
            )
            testTypesIfTheRuleMethodGenerateErrorsWithMessagePassedInArguments(
                providerTypeMethod,
                commonName,
                errorType,
                invalidValues[0],
                {value}
            )        
            testTypesIfTheRuleMethodGenerateErrorsWithMessageFunctionsPassedInArguments(
                providerTypeMethod,
                commonName,
                errorType,
                invalidValues[0],
                {value}
            )
        });

        describe('this.less(5)', () => { 

            const value = 5;
            const providerTypeMethod = (options: ITypeOptions = {}) => new TypeNumber().isNumber().less(value, options)
            const errorType = "number.less"
            const commonName = "less"
            const validValues = [
                3,4
            ]
            const invalidValues = [
                5,6
            ]
    
            testTypesIfTheRuleMethodReturnInstance(providerTypeMethod(), TypeNumber) 
            testTypesIfTheRuleMethodCreateDynamicMethodInCommonsVariable(providerTypeMethod(), commonName)              
            testTypeIfTheRuleMethodNotReturnErrorsWithValidValues(providerTypeMethod(), commonName, validValues)        
            testTypesIfTheRuleMethodReturnObjectErrorWithInvalidValues(
                providerTypeMethod(), 
                commonName, 
                errorType, 
                invalidValues,
                {value}
            )
            testTypesIfTheRuleMethodGenerateErrorsWithMessagePassedInArguments(
                providerTypeMethod,
                commonName,
                errorType,
                invalidValues[0],
                {value}
            )        
            testTypesIfTheRuleMethodGenerateErrorsWithMessageFunctionsPassedInArguments(
                providerTypeMethod,
                commonName,
                errorType,
                invalidValues[0],
                {value}
            )
        });

        describe('this.greaterOrEqual(5)', () => { 

            const value = 5;
            const providerTypeMethod = (options: ITypeOptions = {}) => new TypeNumber().isNumber().greaterOrEqual(value, options)
            const errorType = "number.greaterOrEqual"
            const commonName = "greaterOrEqual"
            const validValues = [
                5,6
            ]
            const invalidValues = [
                4
            ]
    
            testTypesIfTheRuleMethodReturnInstance(providerTypeMethod(), TypeNumber) 
            testTypesIfTheRuleMethodCreateDynamicMethodInCommonsVariable(providerTypeMethod(), commonName)              
            testTypeIfTheRuleMethodNotReturnErrorsWithValidValues(providerTypeMethod(), commonName, validValues)        
            testTypesIfTheRuleMethodReturnObjectErrorWithInvalidValues(
                providerTypeMethod(), 
                commonName, 
                errorType, 
                invalidValues,
                {value}
            )
            testTypesIfTheRuleMethodGenerateErrorsWithMessagePassedInArguments(
                providerTypeMethod,
                commonName,
                errorType,
                invalidValues[0],
                {value}
            )        
            testTypesIfTheRuleMethodGenerateErrorsWithMessageFunctionsPassedInArguments(
                providerTypeMethod,
                commonName,
                errorType,
                invalidValues[0],
                {value}
            )
        });

        describe('this.lessOrEqual(5)', () => { 

            const value = 5;
            const providerTypeMethod = (options: ITypeOptions = {}) => new TypeNumber().isNumber().lessOrEqual(value, options)
            const errorType = "number.lessOrEqual"
            const commonName = "lessOrEqual"
            const validValues = [
                4,5
            ]
            const invalidValues = [
                6
            ]
    
            testTypesIfTheRuleMethodReturnInstance(providerTypeMethod(), TypeNumber) 
            testTypesIfTheRuleMethodCreateDynamicMethodInCommonsVariable(providerTypeMethod(), commonName)              
            testTypeIfTheRuleMethodNotReturnErrorsWithValidValues(providerTypeMethod(), commonName, validValues)        
            testTypesIfTheRuleMethodReturnObjectErrorWithInvalidValues(
                providerTypeMethod(), 
                commonName, 
                errorType, 
                invalidValues,
                {value}
            )
            testTypesIfTheRuleMethodGenerateErrorsWithMessagePassedInArguments(
                providerTypeMethod,
                commonName,
                errorType,
                invalidValues[0],
                {value}
            )        
            testTypesIfTheRuleMethodGenerateErrorsWithMessageFunctionsPassedInArguments(
                providerTypeMethod,
                commonName,
                errorType,
                invalidValues[0],
                {value}
            )
        });

        describe('this.notEqual(5)', () => { 

            const value = 5;
            const providerTypeMethod = (options: ITypeOptions = {}) => new TypeNumber().isNumber().notEqual(value, options)
            const errorType = "number.notEqual"
            const commonName = "notEqual"
            const validValues = [
                6
            ]
            const invalidValues = [
                5
            ]
    
            testTypesIfTheRuleMethodReturnInstance(providerTypeMethod(), TypeNumber) 
            testTypesIfTheRuleMethodCreateDynamicMethodInCommonsVariable(providerTypeMethod(), commonName)              
            testTypeIfTheRuleMethodNotReturnErrorsWithValidValues(providerTypeMethod(), commonName, validValues)        
            testTypesIfTheRuleMethodReturnObjectErrorWithInvalidValues(
                providerTypeMethod(), 
                commonName, 
                errorType, 
                invalidValues,
                {value}
            )
            testTypesIfTheRuleMethodGenerateErrorsWithMessagePassedInArguments(
                providerTypeMethod,
                commonName,
                errorType,
                invalidValues[0],
                {value}
            )        
            testTypesIfTheRuleMethodGenerateErrorsWithMessageFunctionsPassedInArguments(
                providerTypeMethod,
                commonName,
                errorType,
                invalidValues[0],
                {value}
            )
        });
    })

    describe('this.notEqual(5)', () => { 

        const value = 5;
        const providerTypeMethod = (options: ITypeOptions = {}) => new TypeNumber().isNumber().equalTo(value, options)
        const errorType = "number.equalTo"
        const commonName = "equalTo"
        const validValues = [
            5
        ]
        const invalidValues = [
            6
        ]

        testTypesIfTheRuleMethodReturnInstance(providerTypeMethod(), TypeNumber) 
        testTypesIfTheRuleMethodCreateDynamicMethodInCommonsVariable(providerTypeMethod(), commonName)              
        testTypeIfTheRuleMethodNotReturnErrorsWithValidValues(providerTypeMethod(), commonName, validValues)        
        testTypesIfTheRuleMethodReturnObjectErrorWithInvalidValues(
            providerTypeMethod(), 
            commonName, 
            errorType, 
            invalidValues,
            {value}
        )
        testTypesIfTheRuleMethodGenerateErrorsWithMessagePassedInArguments(
            providerTypeMethod,
            commonName,
            errorType,
            invalidValues[0],
            {value}
        )        
        testTypesIfTheRuleMethodGenerateErrorsWithMessageFunctionsPassedInArguments(
            providerTypeMethod,
            commonName,
            errorType,
            invalidValues[0],
            {value}
        )
    });

    describe('this.isPositive()', () => { 
        const providerTypeMethod = (options: ITypeOptions = {}) => new TypeNumber().isNumber().isPositive(options)
        const errorType = "number.positive"
        const commonName = "positive"
        const validValues = [
            0,1
        ]
        const invalidValues = [
            -1
        ]

        testTypesIfTheRuleMethodReturnInstance(providerTypeMethod(), TypeNumber) 
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

    describe('this.isNegative()', () => {
        const providerTypeMethod = (options: ITypeOptions = {}) => new TypeNumber().isNumber().isNegative(options)
        const errorType = "number.negative"
        const commonName = "negative"
        const validValues = [
            -1
        ]
        const invalidValues = [
            0,1
        ]

        testTypesIfTheRuleMethodReturnInstance(providerTypeMethod(), TypeNumber) 
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

    describe('this.isInteger()', () => { 
        const providerTypeMethod = (options: ITypeOptions = {}) => new TypeNumber().isNumber().isInteger(options)
        const errorType = "number.integer"
        const commonName = "integer"
        const validValues = [
            -1,0,1
        ]
        const invalidValues = [
            1.53,1.50
        ]

        testTypesIfTheRuleMethodReturnInstance(providerTypeMethod(), TypeNumber) 
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

    describe('this.isRequired()', () => {
        const providerTypeMethod = (options: ITypeOptions = {}) => new TypeNumber().isNumber().isRequired(options)
        const errorType = "number.required"
        const commonName = "required"
        const validValues = [
            0,1
        ]
        const invalidValues = [
            undefined, null,''
        ]

        testTypesIfTheRuleMethodReturnInstance(providerTypeMethod(), TypeNumber) 
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

    describe('this.isEven()', () => { 
        const providerTypeMethod = (options: ITypeOptions = {}) => new TypeNumber().isNumber().isEven(options)
        const errorType = "number.even"
        const commonName = "even"
        const validValues = [
            0,2,4
        ]
        const invalidValues = [
            1,3,5
        ]

        testTypesIfTheRuleMethodReturnInstance(providerTypeMethod(), TypeNumber) 
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

    describe('this.isOdd()', () => { 
        const providerTypeMethod = (options: ITypeOptions = {}) => new TypeNumber().isNumber().isOdd(options)
        const errorType = "number.odd"
        const commonName = "odd"
        const validValues = [
            1,3,5
        ]
        const invalidValues = [
            0,2,4
        ]

        testTypesIfTheRuleMethodReturnInstance(providerTypeMethod(), TypeNumber) 
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
})