import axios from "axios";
import { Request } from "express";

export default class API {
  static instance: API;
  options: any;
  baseURL: string;

  constructor({ _req }: { _req: Request }) {
    this.options = {
      headers: {
        accessToken: _req.cookies.accessToken,
      },
    };
    this.baseURL = "http://localhost:5000";
  }

  static getInstance({ _req }: { _req: Request }) {
    if (!this.instance) {
      this.instance = new API({ _req: _req });
    }
    return this.instance;
  }

  getFullRequestUrl(__requestUrl: string): string {
    return `${this.baseURL}/${__requestUrl}`;
  }

  async get(__requestUrl: string): Promise<any> {
    const fullRequestUrl = this.getFullRequestUrl(__requestUrl);
    const response = await axios.get(fullRequestUrl, this.options);
    return response;
  }

  async post(__requestUrl: string, __data: any): Promise<any> {
    const fullRequestUrl = this.getFullRequestUrl(__requestUrl);
    const response = await axios.post(fullRequestUrl, __data, this.options);
    return response;
  }

  async delete(__requestUrl: string): Promise<any> {
    const fullRequestUrl = this.getFullRequestUrl(__requestUrl);
    const response = await axios.delete(fullRequestUrl, this.options);
    return response;
  }

  async put(__requestUrl: string, __data: any): Promise<any> {
    const fullRequestUrl = this.getFullRequestUrl(__requestUrl);
    const response = await axios.put(fullRequestUrl, __data, this.options);
    return response;
  }
}
