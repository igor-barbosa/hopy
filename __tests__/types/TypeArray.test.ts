import { TypeObject } from "../../src/library/types/TypeObject";
import { ITypeOptions } from "../../src/interfaces/types/ITypeOptions";
import { testTypesIfTheRuleMethodReturnInstance, testTypesIfTheRuleMethodCreateDynamicMethodInCommonsVariable, testTypeIfTheRuleMethodNotReturnErrorsWithValidValues, testTypesIfTheRuleMethodReturnObjectErrorWithInvalidValues, testTypesIfTheRuleMethodGenerateErrorsWithMessagePassedInArguments, testTypesIfTheRuleMethodGenerateErrorsWithMessageFunctionsPassedInArguments, testTypes } from "../../__helperTests__/testTypes";
import { TypeString } from "../../src/library/types/TypeString";
import { TypeNumber } from "../../src/library/types/TypeNumber";
import { TypeArray } from "../../src/library/types/TypeArray";

describe('Test TypeArray Class', () => {
    
    describe('Test Validation Methods', () => {

        describe('this.isArray()', () => {    
            const providerTypeMethod = (options: ITypeOptions = {}) => (
                new TypeArray().isArray(options)
            )    
            testTypes(
                providerTypeMethod,
                TypeArray,
                'array',
                'array',
                [[1,2,3],[{}],[]],
                ['string',123,{}]
            )
        });

        describe('this.min(2)', () => {
            const context = {min: 2}
            const providerTypeMethod = (options: ITypeOptions = {}) => (
                new TypeArray().isArray().min(context.min, options)
            )
            testTypes(
                providerTypeMethod,
                TypeArray,
                'array.min',
                'min',
                [[1,2],[1,2,3]],
                [[],[1]],
                context
            )
        });

        describe('this.max(3)', () => {
            const context = {max: 3}
            const providerTypeMethod = (options: ITypeOptions = {}) => (
                new TypeArray().isArray().max(context.max, options)
            )
            testTypes(
                providerTypeMethod,
                TypeArray,
                'array.max',
                'max',
                [[1,2],[1,2,3]],
                [[1,2,3,4]],
                context
            )
        });

        describe('this.of(schema)', () => {
            const schema = {
                name: new TypeString().isString(),
                numero: new TypeNumber().isNumber(),
            }

            const type = new TypeArray().isArray().of(schema)
            expect(type.specifics.array.schemaOrType).toBeInstanceOf(TypeObject)
            expect(type.specifics.array.schemaOrType.specifics.object.schema).toEqual(schema);
        });
    })

})