import { TypeObject } from "../../src/library/types/TypeObject";
import { ITypeOptions } from "../../src/interfaces/types/ITypeOptions";
import { testTypesIfTheRuleMethodReturnInstance, testTypesIfTheRuleMethodCreateDynamicMethodInCommonsVariable, testTypeIfTheRuleMethodNotReturnErrorsWithValidValues, testTypesIfTheRuleMethodReturnObjectErrorWithInvalidValues, testTypesIfTheRuleMethodGenerateErrorsWithMessagePassedInArguments, testTypesIfTheRuleMethodGenerateErrorsWithMessageFunctionsPassedInArguments } from "../../__helperTests__/testTypes";
import { TypeString } from "../../src/library/types/TypeString";
import { TypeNumber } from "../../src/library/types/TypeNumber";

describe('Test TypeObject Class', () => {
    
    describe('Test Validation Methods', () => {
        describe('this.isObject()', () => {    
            const providerTypeMethod = (options: ITypeOptions = {}) => (
                new TypeObject().isObject(options)
            )
            const errorType = "object"
            const commonName = "object"
            const validValues = [
                {}, {works: true}
            ]
            const invalidValues = [
                'string',123,[]
            ]
    
            testTypesIfTheRuleMethodReturnInstance(providerTypeMethod(), TypeObject) 
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

        describe('this.of(schema)', () => {
            const schema = {
                name: new TypeString().isString(),
                numero: new TypeNumber().isNumber(),
            }

            const type = new TypeObject().isObject().of(schema)
            expect(type.specifics.object.schema).toEqual(schema);
        });
    })

})