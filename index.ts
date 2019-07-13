import {DataTypes} from "./src/library/DataTypes";
import {Field} from "./src/library/Field";

(async () => {


    const body = {
        date: '03/01/1996'
    };


    const schema = {
        date: DataTypes.date()
    };

    const response = await DataTypes.check(body, schema);

    console.log(JSON.stringify(response, null, 4))
})();
