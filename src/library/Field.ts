import {Types} from "./types/Types";


export class Field {

    public path: string;
    public value: any;
    public shadowValue: any = null;
    public type: Types;
    public label : string|number|null = null;

    public error: any = null;

    public isValid(){
        return !this.error
    }

    public hasRequirements() {
        return !this.error && (this.value !== null && this.value !== undefined)
    }

    public getLabelOrPath(){
        return this.label || this.path;
    }

    public applyError(type: string, helperText: string, message: string, options : any = {}) {
        const {context} = options;

        return this.error = {
            type,
            helperText,
            message,
            context
        }
    }

    constructor(path: string, value: any, type: Types, label : string|null = null) {
        this.path = path;
        this.value = value;
        this.type = type;
        this.label = label
    }

}