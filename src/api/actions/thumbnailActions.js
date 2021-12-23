import baseAPI from '../baseAPI';
import { ActionTypes } from "./types";

export const uploadThumb = (thumbpath) => {
    let video = {
        uri: thumbpath,
        type: 'multipart/form-data',
        name: 'afrotok-video-thumb.mp4',
    };
    const formData = new FormData();
    formData.append('thumb', video);
    return async function (dispatch, getState) {
        const response = await baseAPI.post("uploadthumb/", formData, 
        {
            headers: {
            'Content-Type': 'multipart/form-data'
            }
        });  
        dispatch({type: ActionTypes.UPLOAD_FILE, payload: response.data});
    }   
};

export const downloadThumb = (thumbname) => {
    return async function (dispatch, getState) {
        const response = await baseAPI.get("downloadthumb/" + thumbname);
        dispatch({type: ActionTypes.DOWNLOAD_FILE, payload: response.data});
    };
};

export const deleteThumb = (thumbname) => {
    return async function (dispatch, getState) {
        const response = await baseAPI.delete("deletethumb/" + thumbname);
        dispatch({type: ActionTypes.DELETE_FILE, payload: response.data});
    };
};

export const removeCurrentThumb = () => {
    return {
        type: ActionTypes.REMOVE_CURRENT_AWS_FILE,
    }
};
