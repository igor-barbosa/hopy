import NestedProperty from "nested-property";
import {TypeObject} from "./types/TypeObject";
import {TypeString} from "./types/TypeString";
import {TypeArray} from "./types/TypeArray";
import {Types} from "./types/Types";
import {TypeNumber} from "./types/TypeNumber";

export class DataTypes {

    private _fields: any = {};
    private _body: any;
    private _schema: any;
    private _errors: any = {};
    private _data : any = {};

    private async _createField(path: string, value: any, type: any){
        if(!this._fields[path]) {
            this._fields[path] = {
                path,
                value,
                type
            }
        } else {
            throw new Error('O path '+path+' já existe na lista de fields');
        }
    }

    private async _createFieldsByObjectOf(path: string, typeObject: TypeObject) {
        await this._validateCommonMethods(typeObject, path);
        if(typeObject.isValid()) {
            await this._createFields(typeObject.schema, path);
        }
    }

    private async _createFieldsByArrayOf(path: string, typeArray: TypeArray) {
        await this._validateCommonMethods(typeArray, path);
        if(typeArray.isValid()){
            const arr: any[] = NestedProperty.get(this._body, path) || []
            for(const key of arr.keys()){
                await this._createFieldByType(typeArray.customType, `${path}.${key}`)
            }

            NestedProperty.set(this._data, path, []);
        }
    }

    private async _createFieldByType(type: Types, pathWithPrefix: string){
        if(type instanceof TypeObject){
            await this._createFieldsByObjectOf(pathWithPrefix, type)
        } else if (type instanceof TypeArray) {
            await this._createFieldsByArrayOf(pathWithPrefix, type)
        } else {
            const value = NestedProperty.get(this._body, pathWithPrefix);
            await this._createField(pathWithPrefix, value, type);
        }
    }

    private async _createFields(schema: any, prefix ?: string){
        const withPrefix = (key: string) => ( (prefix) ? `${prefix}.${key}`: `${key}`);
        for(const path of Object.keys(schema)) {
            await this._createFieldByType(schema[path], withPrefix(path))
        }
    }

    private makeField(path: string){
        return {
            path,
            value: NestedProperty.get(this._body, path)
        }
    }

    private async _validateCommonMethods(type: Types, path: string) {
        for(const commonKey of Object.keys(type.commons)) {
            const field = (type instanceof TypeObject || type instanceof TypeArray) ? this.makeField(path) : this._fields[path];
            const validationFunction = type.commons[commonKey];
            const error = await validationFunction(field);
            if(error) {
                this._errors[path] = {
                    ...error,
                    path
                }
            } else {
                NestedProperty.set(this._data, path, field.value);
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
            const { path , type} = field;
            await this._validateCommonMethods(type, path);
        }

        console.log(JSON.stringify({ errors: this._errors, data: this._data }, null, 4));
    }

    public static isString(){
        return new TypeString().isString()
    }

    public static objectOf(schema: any){
        return new TypeObject().of(schema);
    }

    public static arrayOf(type: any){
        return new TypeArray().of(type)
    }

    static async check(body: any, schema: any) {
        const datatypes: DataTypes = await new DataTypes().init(body, schema);
        await datatypes.validate();
    }

    static isNumber() {
        return new TypeNumber().isNumber()
    }
}