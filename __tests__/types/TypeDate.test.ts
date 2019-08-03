import { TypeDate } from "../../src/library/types/typeDate";
import { ITypeOptions } from "../../src/interfaces/types/ITypeOptions";
import { testTypes } from "../../__helperTests__/testTypes";
import moment = require("moment");

describe('Test TypeDate Class', () => {
    
    describe('Test Validation Methods', () => {

        describe('this.isDate()', () => {  
            const context = { format: TypeDate.FORMAT_DEFAULT }  
            const providerTypeMethod = (options: ITypeOptions = {}) => (
                new TypeDate().isDate(options)
            )    
            testTypes(
                providerTypeMethod,
                TypeDate,
                'date',
                'date',
                ['03/01/1996','01/01/2000'],
                ['01/13/2019','2019/03/01','01/03'],
                context
            )
        });

        describe('this.isDate() custom format', () => {  
            const context = { format: "YYYY-MM-DD" }  
            const providerTypeMethod = (options: ITypeOptions = {}) => (
                new TypeDate().isDate({
                    ...options,
                    format: context.format
                })
            )    
            testTypes(
                providerTypeMethod,
                TypeDate,
                'date',
                'date',
                ['2000-01-01'],
                ['2000-13-01','2000-01'],
                context
            )
        });

        describe('this.isBefore()', () => {  
            const date = new Date('2000/01/01');
            const context = {
                date: moment(date)
            }
            const providerTypeMethod = (options: ITypeOptions = {}) => (
                new TypeDate().isDate().isBefore(date, options)
            )    
            testTypes(
                providerTypeMethod,
                TypeDate,
                'date.before',
                'before',
                ['01/01/1999'],
                ['01/01/2000'],
                context
            )
        });

        describe('this.isAfter()', () => {  
            const date = new Date('2000/01/01');
            const context = {
                date: moment(date)
            }
            const providerTypeMethod = (options: ITypeOptions = {}) => (
                new TypeDate().isDate().isAfter(date, options)
            )    
            testTypes(
                providerTypeMethod,
                TypeDate,
                'date.after',
                'after',
                ['01/01/2001'],
                ['01/01/1999'],
                context
            )
        });

    })

})