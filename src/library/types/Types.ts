import {Field} from "../Field";

export class Types {

    public commons: any = {};

    public customHandlersList: Array<any> = []

    public error: any = null;

    public checkAllows: any;

    public isValid() {
        return !this.error
    }

    public customHandlers(...handlers: any[]) {
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

