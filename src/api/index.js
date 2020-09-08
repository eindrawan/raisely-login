const axios = require("axios");

const API_URL = window.location.origin.replace(":8000", ":8001");
const api = axios.create({
  baseURL: API_URL,
  timeout: 100000
});
api.interceptors.request.use(
  config => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.authorization = `Bearer ${token}`;
    }
    return config;
  },
  err => Promise.reject(err)
);
export default {
  url: API_URL,
  async post(url, params, opts) {
    let ret = await api.post(url, params, opts).catch(err => {
      return err.response.data;
    });
    return ret.data;
  },
  async get(url, opts) {
    let { data } = await api.get(url, opts);
    return data;
  },
  async fromOutside(opts) {
    return axios(opts);
  }
};
