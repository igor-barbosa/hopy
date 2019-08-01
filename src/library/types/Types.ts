import {Field} from "../Field";
import { ICustomHandler } from "../../interfaces/ICustomHandler";
import { DATA_TYPES_PROVIDER_MESSAGE } from "../DATA_TYPES_PROVIDER_MESSAGE";

export abstract class Types {

    public commons: any = {};
    public customHandlersList: Array<ICustomHandler> = []
    public error: any = null;
    public checkAllows: any;

    public abstract BASE_STRING : string

    public isValid() {
        return !this.error
    }

    public customHandlers(...handlers: ICustomHandler[]) {
        this.customHandlersList = handlers;

        return this;
    }

    public allow(...values: any[]) {
       this.checkAllows = (field: Field) => {
           field.allows = values
       }

       return this;
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
}

