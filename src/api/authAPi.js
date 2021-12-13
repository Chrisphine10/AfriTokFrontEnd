import axios from "axios";
import { config } from "../constants/config";

export default axios.create({
    baseURL: config.API_AUTH_URL,
    headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
        //"Authorization": `Bearer ${config.API_KEY}`,
    }
});