import axios from "axios";

class API {
  static instance;

  constructor() {
    this.options = { withCredentials: true };
    this.baseUrl = "http://localhost:5000";
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
    await axios.post(fullRequestUrl, __data, this.options);
  }
}

export default API;
