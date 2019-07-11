import {DataTypes} from "./src/library/DataTypes";

(async () => {


    const body = {
        name: '',
        address: {}
    };


    const schema = {
        name: DataTypes.isString().between(8, 20).isRequired(),
        address: DataTypes.objectOf({
            country: DataTypes.isString().isRequired()
        }).isRequired()
    };

    const response = await DataTypes.check(body, schema);

    console.log(response)
})();

