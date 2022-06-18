import { Request } from "express";
export default class API {
    static instance: API;
    options: any;
    baseURL: string;
    constructor();
    static getInstance(): API;
    getFullRequestUrl(__requestUrl: string): string;
    get(__requestUrl: string, _req: Request): Promise<any>;
    post(__requestUrl: string, __data: any): Promise<any>;
    delete(__requestUrl: string): Promise<any>;
    put(__requestUrl: string, __data: any): Promise<any>;
}
