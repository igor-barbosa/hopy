import {Field} from "../Field";
import { ICustomHandler } from "../../interfaces/ICustomHandler";
import { DATA_TYPES_PROVIDER_MESSAGE } from "../DATA_TYPES_PROVIDER_MESSAGE";

export class Types {

    public commons: any = {};

    public customHandlersList: Array<ICustomHandler> = []

    public error: any = null;

    public checkAllows: any;

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
}

