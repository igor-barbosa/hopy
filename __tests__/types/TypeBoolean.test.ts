import { TypeString } from "../../src/library/types/TypeString";
import { ITypeOptions } from "../../src/interfaces/types/ITypeOptions";
import { TypeBoolean } from '../../src/library/types/TypeBoolean';
import { testTypes } from '../../__helperTests__/testTypes';

describe('Test TypeBoolean Class', () => {
    
    describe('Test Validation Methods', () => {

        describe('this.isBoolean()', () => {  
            const providerTypeMethod = (options: ITypeOptions = {}) => (
                new TypeBoolean().isBoolean(options)
            )    
            testTypes(
                providerTypeMethod,
                TypeBoolean,
                'boolean',
                'boolean',
                [true, false],
                ['',0,1]
            )
        });

    })

});