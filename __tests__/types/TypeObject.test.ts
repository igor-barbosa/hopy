import { TypeObject } from "../../src/library/types/TypeObject";
import { ITypeOptions } from "../../src/interfaces/types/ITypeOptions";
import { testTypesIfTheRuleMethodReturnInstance, testTypesIfTheRuleMethodCreateDynamicMethodInCommonsVariable, testTypeIfTheRuleMethodNotReturnErrorsWithValidValues, testTypesIfTheRuleMethodReturnObjectErrorWithInvalidValues, testTypesIfTheRuleMethodGenerateErrorsWithMessagePassedInArguments, testTypesIfTheRuleMethodGenerateErrorsWithMessageFunctionsPassedInArguments, testTypes } from '../../__helperTests__/testTypes';
import { TypeString } from "../../src/library/types/TypeString";
import { TypeNumber } from "../../src/library/types/TypeNumber";

describe('Test TypeObject Class', () => {
    
    describe('Test Validation Methods', () => {

        describe('this.isObject()', () => {  
            const providerTypeMethod = (options: ITypeOptions = {}) => (
                new TypeObject().isObject(options)
            )    
            testTypes(
                providerTypeMethod,
                TypeObject,
                'object',
                'object',
                [{}, {works: true}],
                ['string',123,[]]
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