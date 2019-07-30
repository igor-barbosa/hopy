import {Types} from "./types/Types";


export class Field {

    public path: string;
    public value: any;
    public shadowValue: any = null;
    public type: Types;
    public allows: any[] = [];
    public label : string|null = null;

    public error: any = null;

    public isValid(){
        return !this.error
    }

    private hasAllowValues() {
        if(this.allows.length){
            return this.allows.indexOf(this.value) >= 0
        } else {
            return false;
        }
    }

    public hasRequirements() {
        return !this.error && (this.value !== null && this.value !== undefined)
        // if(!this.hasAllowValues()){
        //     return !this.error && (this.value !== null && this.value !== undefined);
        // } else {
        //     return false;
        // }

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
            context: context || null
        }
    }

    constructor(path: string, value: any, type: Types, label : string|null = null) {
        this.path = path;
        this.value = value;
        this.type = type;
        this.label = label
    }

}