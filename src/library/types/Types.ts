import {Field} from "../Field";
import { ICustomHandler } from "../../interfaces/ICustomHandler";

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



}

