import axios from "axios";

const instance = axios.create({
    baseURL: 'http://localhost:8000/api',
    // headers: {
    //     "Content-Type": "application/json",
    // },
})


instance.interceptors.request.use(
  (config:any) => {
    let authTokens = localStorage.getItem('tokenUser') ? JSON.parse(localStorage.getItem('tokenUser') as string) : null
    if (authTokens) {
      config.headers["authTokens"] = authTokens; 
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default instance;