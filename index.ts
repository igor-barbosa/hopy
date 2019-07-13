import {DataTypes} from "./src/library/DataTypes";
import {Field} from "./src/library/Field";

(async () => {


    const body = {
        name: 'Igor'
    };


    const schema = {
        cpf: DataTypes.isString().customHandlers()
    };

    const response = await DataTypes.check(body, schema);

    console.log(JSON.stringify(response, null, 4))
})();
