import {DataTypes} from "./src/library/DataTypes";
import {Field} from "./src/library/Field";

(async () => {


    const body = {
        name: 'igorrbarbosaa@gmail.com'
    };

    const checkIfIsNotIgor = () => {
        return async (field: Field) => {
            if(field.value === 'Igor') {
                return field.applyError(
                    'checkIfIsIgor',
                    'O valor não pode ser igual a Igor',
                    `O campo ${field.label || field.path} não pode ser igual a Igor`
                );
            }
        }
    };

    const schema = {
        name: DataTypes.isString().equal('igor').customHandlers()
    };

    const response = await DataTypes.check(body, schema);

    console.log(JSON.stringify(response, null, 4))
})();
