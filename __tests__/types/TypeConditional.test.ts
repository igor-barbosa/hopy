import { TypeConditional } from "../../src/library/types/TypeConditional";
import { TypeString } from "../../src/library/types/TypeString";

describe('Test TypeConditional Class', () => {
    
    describe('Test Validation Methods', () => {
        it('should guard the callback in spcifics property of types', () => {
            const type = new TypeConditional().conditional(async () => {
                return new TypeString().isString();
            })

            expect(!!type.specifics.conditional).toEqual(true);
        });
    });

});