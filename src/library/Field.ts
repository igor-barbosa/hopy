import {Types} from "./types/Types";


export class Field {

    public path: string;
    public value: any;
    public type: Types;
    public allows: any[] = [];
    public label : string|null = null;

    public error: any = null;

    public isValid(){
        return !this.error
    }

    private hasAllowValues() {
        return this.allows.indexOf(this.value) >= 0
    }

    public hasRequirements() {
        console.log({
            invalidAllows: this.hasAllowValues(),
            hasError: !!this.error,
            isNull: this.value !== null && this.value !== undefined
        });

        if(!this.hasAllowValues()){
            return !this.error && this.value !== null && this.value !== undefined;
        } else {
            return false;
        }

    }


    public applyError(type: string, shortMessage: string, longMessage: string, options : any = {}) {
        const {context} = options;
        return this.error = {
            type,
            shortMessage,
            longMessage,
            context: context || null
        }
    }

    constructor(path: string, value: string, type: Types, label : string|null = null) {
        this.path = path;
        this.value = value;
        this.type = type;
        this.label = label
    }

}