import {DataTypes} from "./src/library/DataTypes";
import {Field} from "./src/library/Field";
import moment from 'moment'

(async () => {

    const body = {
        name: 'Igor2'
    };


    const schema = {
        name: DataTypes.isString()
    };

    const response = await DataTypes.check(body, schema);

    console.log(JSON.stringify(response, null, 4))
})();
