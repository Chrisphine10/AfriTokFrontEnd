import axios from "axios";
import { config } from "../../constants/config";


const Videos = async () => {
  const response = await axios.get(config.API_VIDEOS_URL, {
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${config.API_KEY}`
        }
    }).catch(error => {
        console.log(error)
    });
    return response.data;
};

const Video = async (id) => {
    const response = await axios.get(config.API_VIDEOS_URL + `${id}`, {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${config.API_KEY}`
            }
    }).catch(error => {
        console.log(error)
    });
    return response.data;
};

export default Videos;