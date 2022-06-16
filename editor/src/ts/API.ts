import axios from "axios";

class APIOptions {
  withCredentials: boolean;

  constructor(withCredentials: boolean) {
    this.withCredentials = withCredentials;
  }
}

export default class API {
  static instance: API;
  options: APIOptions;
  baseURL: string;

  constructor() {
    this.options = new APIOptions(true);
    this.baseURL = "http://localhost:5000";
  }

  static getInstance() {
    if (!this.instance) {
      this.instance = new API();
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
