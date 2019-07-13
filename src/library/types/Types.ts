export class Types {

    public commons: any = {};

    public customHandlersList: Array<any> = []

    public error: any = null;

    public isValid() {
        return !this.error
    }

    public customHandlers(...handlers: any[]) {
        this.customHandlersList = handlers;

        return this;
    }
}

