import {DataTypes} from "./src/library/DataTypes";
import {Field} from "./src/library/Field";
import moment from 'moment'

(async () => {

    const body = {
        formations: [
            {
                startDate: '01/01/2000',
                endDate: '01/01/1996'
            }
        ]
    };


    const schema = {
        formations: DataTypes.arrayOf({
            startDate: DataTypes.date(),
            endDate: DataTypes.date(),
        }).min(1)
    };

    const response = await DataTypes.check(body, schema);

    console.log(JSON.stringify(response, null, 4))
})();
