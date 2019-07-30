import { TypeString } from "../../src/library/types/TypeString";
import { Field } from "../../src/library/Field";
import { DATA_TYPES_PROVIDER_MESSAGE } from "../../src/library/DATA_TYPES_PROVIDER_MESSAGE";
import { Types } from "../../src/library/types/Types";
import { testTypesIfTheRuleMethodReturnInstance, testTypesIfTheRuleMethodCreateDynamicMethodInCommonsVariable, testTypeIfTheRuleMethodNotReturnErrorsWithValidValues, testTypesIfTheRuleMethodReturnObjectErrorWithInvalidValues, testTypesIfTheRuleMethodGenerateErrorsWithMessagePassedInArguments, testTypesIfTheRuleMethodGenerateErrorsWithMessageFunctionsPassedInArguments } from "../../__helperTests__/testTypes";
import { ITypeOptions } from "../../src/interfaces/types/ITypeOptions";

describe('Test TypeString Class', () => {
    
    describe('this.isString()', () => {        
        testTypesIfTheRuleMethodReturnInstance(new TypeString().isString(), TypeString)        
        testTypesIfTheRuleMethodCreateDynamicMethodInCommonsVariable(new TypeString().isString(), 'string')        
        testTypeIfTheRuleMethodNotReturnErrorsWithValidValues(new TypeString().isString(), 'string', [
            undefined,
            null,
            '',
            'abc',
        ]);
        testTypesIfTheRuleMethodReturnObjectErrorWithInvalidValues(new TypeString().isString(), 'string', [
            123,
            [],
            {}
        ])
        testTypesIfTheRuleMethodGenerateErrorsWithMessagePassedInArguments(
            (messages: ITypeOptions) => new TypeString().isString(messages),
            'string',
            123
        )
        testTypesIfTheRuleMethodGenerateErrorsWithMessageFunctionsPassedInArguments(
            (messages: ITypeOptions) => new TypeString().isString(messages),
            'string',
            123
        )
    });

});