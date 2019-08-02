import {DataTypes} from "./src/library/DataTypes";
import {Field} from "./src/library/Field";
import moment from 'moment'
import { TypeArray } from "./src/library/types/TypeArray";
import { TypeNumber } from "./src/library/types/TypeNumber";

(async () => {

    const body = {
        name: 'Igor2',
        list: [1]
    };


    const schema = {
        list: new TypeArray().isArray().of(new TypeNumber().isNumber()).min(2)
    };

    const response = await DataTypes.check(body, schema);

    console.log(JSON.stringify(response, null, 4))
})();
