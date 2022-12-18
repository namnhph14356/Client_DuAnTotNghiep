import axios from "axios";

const instance = axios.create({
    baseURL: 'https://serverduantotnghiep-production-53a7.up.railway.app/api',
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