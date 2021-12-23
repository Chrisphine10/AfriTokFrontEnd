import baseAPI from '../baseAPI';
import { ActionTypes } from "./types";

export const uploadFile = (filepath) => {
    let video = {
        uri: filepath,
        type: 'multipart/form-data',
        name: 'afrotok-video-file.mp4',
    };
    const formData = new FormData();
    formData.append('file', video);
    return async function (dispatch, getState) {
        const response = await baseAPI.post("uploadfile", formData, 
        {
            headers: {
            'Content-Type': 'multipart/form-data'
            }
        });  
        dispatch({type: ActionTypes.UPLOAD_FILE, payload: response.data});
    }   
};

export const downloadFile = (filename) => {
    return async function (dispatch, getState) {
        const response = await baseAPI.get("downloadfile/" + filename);
        dispatch({type: ActionTypes.DOWNLOAD_FILE, payload: response.data});
    };
};

export const deleteFile = (filename) => {
    return async function (dispatch, getState) {
        const response = await baseAPI.delete("deletefile/" + filename);
        dispatch({type: ActionTypes.DELETE_FILE, payload: response.data});
    };
};

export const removeCurrentFile = () => {
    return {
        type: ActionTypes.REMOVE_CURRENT_AWS_FILE,
    }
};
