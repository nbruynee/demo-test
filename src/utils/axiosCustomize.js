import axios from "axios";
import nProgress from "nprogress";
import { store } from "../redux/store"

nProgress.configure({
    showSpinner: false,
    trickleSpeed: 100
});

const instance = axios.create({
    baseURL: 'http://localhost:8081/',
});

instance.interceptors.request.use(function (config) {
    // console.log("Check store:", store.getState());
    const access_token = store?.getState()?.user?.account?.access_token;
    config.headers["Authorization"] = `Bearer ${access_token}`;
    nProgress.start();
    return config;
}, function (error) {
    return Promise.reject(error);
});

instance.interceptors.response.use(function (response) {
    nProgress.done();
    return response && response.data ? response.data : response;
}, function (error) {
    nProgress.done();
    // token expired : EC === -999
    if (error.response.data && error.response.data.EC === -999) {
        window.location.href = '/login';
    }

    return error && error.response && error.response.data ? error.response.data : Promise.reject(error);
});

export default instance;