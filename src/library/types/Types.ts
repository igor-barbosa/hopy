import {Field} from "../Field";
import { ICustomHandler } from "../../interfaces/ICustomHandler";
import { DATA_TYPES_PROVIDER_MESSAGE } from "../DATA_TYPES_PROVIDER_MESSAGE";

export abstract class Types {

    public commons: any[] = [];
    
    public specifics: any = {
        object:{
            schema: null
        },
        array: {
            schemaOrType: null
        },
        required: null,
        conditional: null,
        customHandlers: [],
        defaultValue: undefined
    }

    public error: any = null;

    public abstract BASE_STRING : string

    public isValid() {
        return !this.error
    }

    public static getProviderDefaultMessageString(type: string, field: Field, context: any = null){
        const provider = DATA_TYPES_PROVIDER_MESSAGE[type];
        const helperText = (typeof provider.helperText === "function") ? provider.helperText(field, context) : provider.helperText
        const message = (typeof provider.message === "function") ? provider.message(field, context) : provider.message
        return {
            helperText,
            message
        }
    }

    public applyError(type: string, field: Field, options: any, context : any = null) {
        const defaultMessage: any = DATA_TYPES_PROVIDER_MESSAGE[type]
        const {helperText, message} = options;
        
        const helperTextString = (typeof helperText === "function") ? helperText(field, context) : helperText;
        const messageString = (typeof message === "function") ? message(field, context) : message;

        return field.applyError (
            type,
            helperTextString || defaultMessage.helperText(field, context),
            messageString || defaultMessage.message(field, context),
            { context }
        )
    }

    public addCommon(common: string, method: (field: Field) => Promise<any>){
        this.commons.push({
            common,
            method
        });

        return this;
    }

    public hasCommon(common: string){
        return (this.commons.filter(item => item.common === common).length > 0)
    }

    public getCommon(common: string){
        return this.commons.filter(item => item.common === common)[0]
    }
}

