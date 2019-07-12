import {Types} from "./types/Types";


export class Field {

    public path: string;
    public value: string;
    public type: Types;

    public label : string|null = null;

    constructor(path: string, value: string, type: Types, label : string|null = null) {
        this.path = path;
        this.value = value;
        this.type = type;
        this.label = label
    }

}