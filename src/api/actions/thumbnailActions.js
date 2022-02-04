import baseAPI from '../baseAPI';
import { ActionTypes } from "./types";

export const uploadThumb = (thumbpath) => {
    let video = {
        uri: thumbpath,
        type: 'multipart/form-data',
        name: 'afrotok-video-thumb.jpg',
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
        dispatch({type: ActionTypes.UPLOAD_THUMB, payload: response.data});
    }   
};

export const downloadThumb = (thumbname) => {
    return async function (dispatch, getState) {
        const response = await baseAPI.get("downloadthumb/" + thumbname);
        dispatch({type: ActionTypes.DOWNLOAD_THUMB, payload: response.data});
    };
};

export const deleteThumb = (thumbname) => {
    return async function (dispatch, getState) {
        const response = await baseAPI.delete("deletethumb/" + thumbname);
        dispatch({type: ActionTypes.DELETE_THUMB, payload: response.data});
    };
};

export const removeCurrentThumb = () => {
    return {
        type: ActionTypes.REMOVE_CURRENT_AWS_THUMB,
    }
};
