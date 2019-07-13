export class Types {

    public commons: any = {};

    public error: any = null;

    public isValid() {
        return !this.error
    }

    protected applyError(type: string, shortMessage: string, longMessage: string, options : any = {}) {
        const {context} = options;
        return this.error = {
            type,
            shortMessage,
            longMessage,
            context: context || null
        }
    }

    public customHandlers(...handlers: any[]) {

    }
}

