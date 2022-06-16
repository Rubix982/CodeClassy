declare class APIOptions {
    withCredentials: boolean;
    constructor(withCredentials: boolean);
}
export default class API {
    static instance: API;
    options: APIOptions;
    baseURL: string;
    constructor();
    static getInstance(): API;
    getFullRequestUrl(__requestUrl: string): string;
    get(__requestUrl: string): Promise<any>;
    post(__requestUrl: string, __data: any): Promise<any>;
    delete(__requestUrl: string): Promise<any>;
    put(__requestUrl: string, __data: any): Promise<any>;
}
export {};
