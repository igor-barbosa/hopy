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

    public BASE_STRING = 'conditional'
 
    conditional(callback: IConditionalCallback){
        this.specifics.conditional = callback;
        return this;
    }
}