import {TypeObject} from "./types/TypeObject";
import {TypeArray} from "./types/TypeArray";
import NestedProperty from "nested-property";
import {Types} from "./types/Types";
import {Field} from "./Field";

export class ValidateFields {

    private _fields: any = {};
    private _body: any;
    private _schema: any;
    private _errors: any = {};
    private _data : any = {};

    private async createField(path: string, value: any, type: any){
        if(!this._fields[path]) {
            this._fields[path] = new Field(path, value, type);
         }
         else {
            throw new Error('O path '+path+' já existe na lista de fields');
        }
    }

    private async createFieldsByObjectOfMethod(path: string, typeObject: TypeObject) {
        await this.validateCommonMethods(typeObject, path);
        if(typeObject.isValid()) {
            await this.createFields(typeObject.schema, path);
        }
    }

    private async createFieldsByArrayOfMethod(path: string, typeArray: TypeArray) {
        await this.validateCommonMethods(typeArray, path);
        if(typeArray.isValid()){
            const arr: any[] = NestedProperty.get(this._body, path) || []
            for(const key of arr.keys()){
                await this.createFieldByType(typeArray.customType, `${path}.${key}`)
            }

            NestedProperty.set(this._data, path, []);
        }
    }

    private async createFieldByType(type: Types, pathWithPrefix: string){
        if(type instanceof TypeObject){
            await this.createFieldsByObjectOfMethod(pathWithPrefix, type)
        } else if (type instanceof TypeArray) {
            await this.createFieldsByArrayOfMethod(pathWithPrefix, type)
        } else {
            const value = NestedProperty.get(this._body, pathWithPrefix);
            await this.createField(pathWithPrefix, value, type);
        }
    }

    private async createFields(schema: any, prefix ?: string){
        const withPrefix = (key: string) => ( (prefix) ? `${prefix}.${key}`: `${key}`);
        for(const path of Object.keys(schema)) {
            await this.createFieldByType(schema[path], withPrefix(path))
        }
    }

    private makeField(path: string){
        return new Field(path, NestedProperty.get(this._body, path), new Types());
    }

    private async validateCommonMethods(type: Types, path: string) {
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

    public async init(body: any, schema: any) : Promise<ValidateFields> {
        this._body = body;
        this._schema = schema;
        await this.createFields(schema);
        return this;
    }

    public async validate() {
        for(const fieldKey of Object.keys(this._fields)) {
            const field = this._fields[fieldKey];
            const { path , type} = field;
            await this.validateCommonMethods(type, path);
        }
    }

    public getResponse() {
        return {
            errors: this._errors,
            data: this._data
        }
    }

}