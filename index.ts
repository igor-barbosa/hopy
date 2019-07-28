import {DataTypes} from "./src/library/DataTypes";
import {Field} from "./src/library/Field";
import moment from 'moment'

(async () => {

    const body = {
        name: 'Igor2'
    };


    const schema = {
        name: DataTypes.conditional(async (params) => {
            return params.value === 'Igor' ? DataTypes.isString().max(3) : DataTypes.isString().max(2)
        })
    };

    const response = await DataTypes.check(body, schema);

    console.log(JSON.stringify(response, null, 4))
})();
