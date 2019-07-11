declare module "nested-property" {
    export default class NestedProperty {
        public static get(obj: any, path: string) : any
        public static set(obj: any, path: string, value: any) : any
    }
}