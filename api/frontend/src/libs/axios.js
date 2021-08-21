import Vue from "vue";
const isDev = process.env.NODE_ENV !== "production";
// axios
import axios from "axios";

const axiosIns = axios.create({
    // You can add your headers here
    // ================================
    baseURL: isDev
        ? "http://localhost:8000/api/"
        : "https://api.justyours.me/api/"
    // timeout: 1000,
    // headers: {'X-Custom-Header': 'foobar'}
});

Vue.prototype.$http = axiosIns;

export default axiosIns;
