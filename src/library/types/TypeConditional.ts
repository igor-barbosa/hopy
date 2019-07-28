import { Types } from "./Types";

export interface IConditionalCallback {
    (params: {
        getBodyValue: any,
        value: any,
        path: string,
        body: any
    }) : Promise<Types>
}

export class TypeConditional extends Types {
    
    cond: any;
    
    conditional(callback: IConditionalCallback){
        this.cond = callback;
        return this;
    }
}