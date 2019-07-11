import {IField} from "../../interfaces/types/IField";

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

    // TODO: Renomear requisitos.
    public checkRequirements(field: IField) {
        return field.value && this.isValid();
    }

    public isRequired() {

        this.commons.required = async (field: IField) => {
            const verify = !field.value || field.value.toString().trim().length === 0
            if(verify) {
                return this.applyError(
                    'required',
                    'Campo obrigatório',
                    `O campo ${field.label || field.path} é obrigatório`
                )
            }
        };

        return this;
    }
}

