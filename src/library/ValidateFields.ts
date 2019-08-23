import {TypeObject} from "./types/TypeObject";
import {TypeArray} from "./types/TypeArray";
import NestedProperty from "nested-property";
import {Types} from "./types/Types";
import {Field} from "./Field";
import { TypeConditional } from "./types/TypeConditional";

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

    private async createFieldsByObjectOfMethod(path: string, type: TypeObject) {
        await this.validateCommonMethods(type, path);
        if(type.isValid() && type.specifics.object.schema) {
            await this.createFields(type.specifics.object.schema, path);
        }
    }

    private async createFieldsByArrayOfMethod(path: string, typeArray: TypeArray) {
        await this.validateCommonMethods(typeArray, path);
        if(typeArray.isValid()){
            const arr: any[] = NestedProperty.get(this._body, path) || []
            if(typeArray.specifics.array.schemaOrType){
                await Promise.all(arr.map(async(item, key) => {
                    await this.createFieldByType(typeArray.specifics.array.schemaOrType, `${path}.${key}`)
                }));
            }
            NestedProperty.set(this._data, path, []);
        }
    }

    private async createFieldByType(type: Types, pathWithPrefix: string){
        type.setBody(this._body);
        if(type instanceof TypeObject){
            await this.createFieldsByObjectOfMethod(pathWithPrefix, type)
        } else if (type instanceof TypeArray) {
            await this.createFieldsByArrayOfMethod(pathWithPrefix, type)
        } else if(type instanceof TypeConditional) {
            const newType: Types = await type.specifics.conditional({
                getBodyValue: this.getBodyValue,
                value: this.getBodyValue(pathWithPrefix),
                path: pathWithPrefix,
                body: this._body
            })
            this.createFieldByType(newType, pathWithPrefix);
        } else {
            const value = this.getBodyValue(pathWithPrefix);
            await this.createField(pathWithPrefix, value, type);
        }
    }

    private getBodyValue(path: string){
        return NestedProperty.get(this._body, path);
    }

    private async createFields(schema: any, prefix ?: string){
        const withPrefix = (key: string) => ( (prefix) ? `${prefix}.${key}`: `${key}`);
        for(const path of Object.keys(schema)) {
            await this.createFieldByType(schema[path], withPrefix(path))
        }
    }

    private makeField(path: string, type: Types, value: any){
        return new Field(path, value, type);
    }

    private setError(path: string, error: any) {
        this._errors[path] = {
            ...error,
            path
        };
    }

    private async validateCommonMethods(type: Types, path: string) {
        const isObject = type instanceof TypeObject;
        const isArray = type instanceof TypeArray;
        let field: Field;
        if(isObject || isArray){
            field = (isObject) ? this.makeField(path, type, {}) : this.makeField(path, type, [])
        } else {
            field = this._fields[path];
        }
        
        if(type.specifics.required){
            const error = await type.specifics.required(field)
            if(error) this.setError(path, error)
        }

        for(const common of type.commons) {
            const validationFunction = common.method;
            const error = await validationFunction(field);
            if(error) {
                this.setError(path, error);
            }
        }

        for(const customHandler of type.specifics.customHandlers){
            const error = await customHandler(field, this._fields);
            if(error) {
                this.setError(path, error);
            }
        }

        if(type.specifics.defaultValue !== undefined){
            await type.specifics.defaultValue(field)
        }

        
        NestedProperty.set(this._data, path, field.value);
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

    public getLabels(){
        const labels: any = {};
        for(const fieldKey of Object.keys(this._fields)) {
            const field = this._fields[fieldKey];
            labels[field.path] = field.label;
        }

        return labels;
    }

    public getResponse() {
        return {
            errors: (Object.keys(this._errors).length > 0) ? this._errors : false,
            data: this._data,
            labels: this.getLabels()
        }
    }

}