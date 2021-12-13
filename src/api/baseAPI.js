import axios from "axios";
import { config } from "../constants/config";
import AsyncStorage from '@react-native-async-storage/async-storage';

axios.defaults.baseURL = config.API_URL;

const baseAPI = axios.create();

baseAPI.interceptors.request.use(
    async config => {
        const token = await AsyncStorage.getItem('userToken')
        //console.log(token)
        if (token) {
            config.headers.Authorization = 'Bearer ' + token
            //console.log(config.headers.Authorization)
        }
        return config
    },
    error => {
        return Promise.reject(error)
    }
)


export default baseAPI;

