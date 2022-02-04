import axios from "axios";
import { config } from "../constants/config";
import AsyncStorage from '@react-native-async-storage/async-storage';

axios.defaults.baseURL = config.API_AUTH_URL;

const adminAPI = axios.create();

adminAPI.interceptors.request.use(
    async config => {
        const token = await AsyncStorage.getItem('userToken');
        if (token) {
            config.headers.Authorization = 'Bearer ' + token;
        }
        return config
    },
    error => {
        return Promise.reject(error)
    }
)


export default adminAPI;

