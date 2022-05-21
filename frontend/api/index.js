import axios from "axios";

class API {
  static instance;

  constructor() {
    this.options = { withCredentials: true };
    this.baseUrl = "http://20.74.254.252:5000";
  }

  static getInstance() {
    if (!this.instance) {
      this.instance = new API();
    }
    return this.instance;
  }

  getFullRequestUrl(__requestUrl) {
    return `${this.baseUrl}/${__requestUrl}`;
  }

  async get(__requestUrl) {
    const fullRequestUrl = this.getFullRequestUrl(__requestUrl);
    const response = await axios.get(fullRequestUrl, this.options);
    return response;
  }

  async post(__requestUrl, __data) {
    const fullRequestUrl = this.getFullRequestUrl(__requestUrl);
    const response = await axios.post(fullRequestUrl, __data, this.options);
    return response;
  }

  async delete(__requestUrl) {
    const fullRequestUrl = this.getFullRequestUrl(__requestUrl);

    const response = await axios.delete(fullRequestUrl, this.options);

    return response;
  }

  async put(__requestUrl, __data) {
    const fullRequestUrl = this.getFullRequestUrl(__requestUrl);

    const response = await axios.put(fullRequestUrl, __data, this.options);

    return response;
  }
}

export default API;
