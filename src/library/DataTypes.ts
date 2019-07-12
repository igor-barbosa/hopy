import NestedProperty from "nested-property";
import {TypeObject} from "./types/TypeObject";
import {TypeString} from "./types/TypeString";
import {TypeNumber} from "./types/TypeNumber";

export class DataTypes {

    private _fields: any = {};
    private _body: any;
    private _schema: any;
    private _errors: any = {};

    private async _createField(path: string, value: any, commons: any){
        if(!this._fields[path]) {
            this._fields[path] = {
                path,
                value,
                commons
            }
        } else {
            throw new Error('O path '+path+' já existe na lista de fields');
        }
    }

    private async _createFieldsByObjectOf(path: string, typeObject: TypeObject) {
        await this._validateCommonMethods(typeObject.commons, path);
        if(typeObject.isValid()) {
            await this._createFields(typeObject.schema, path);
        }
    }

    private async _createFields(schema: any, prefix ?: string){

        const withPrefix = (key: string) => ( (prefix) ? `${prefix}.${key}`: `${key}`);

        for(const path of Object.keys(schema)) {
            if(schema[path] instanceof TypeObject){
                await this._createFieldsByObjectOf(withPrefix(path), schema[path])
            } else {
                const value = NestedProperty.get(this._body, withPrefix(path));
                const commons = schema[path].commons;
                await this._createField(withPrefix(path), value, commons);
            }

        }
    }

    private async _validateCommonMethods(commons: any, path: string, label : string|null = null) {
        for(const commonKey of Object.keys(commons)){
            const value = NestedProperty.get(this._body, path);
            const validationFunction = commons[commonKey];
            const error = await validationFunction({
                value,
                path
            });

            if(error) this._errors[path] = {
                ...error,
                path,
                label: label || null
            }

        }
    }

    public async init(body: any, schema: any) : Promise<DataTypes> {
        this._body = body;
        this._schema = schema;
        await this._createFields(schema);
        return this;
    }



    public async validate() {
        for(const fieldKey of Object.keys(this._fields)) {
            const field = this._fields[fieldKey];
            const { path, label , commons} = field;
            await this._validateCommonMethods(commons, path, label);
        }

        console.log(this._errors);
    }

    public static isString(){
        return new TypeString().isString()
    }

    public static objectOf(schema: any){
        return new TypeObject().of(schema);
    }

    static async check(body: any, schema: any) {
        const datatypes: DataTypes = await new DataTypes().init(body, schema);
        await datatypes.validate();
    }

    static isNumber() {
        return new TypeNumber().isNumber()
    }
}