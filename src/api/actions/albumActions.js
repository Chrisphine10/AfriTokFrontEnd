import baseAPI from '../baseAPI';
import { ActionTypes } from "./types";

export const addAlbum = (name, image) => {
    return async function (dispatch, getState) {
        const response = await baseAPI.post("albums/", {
            "name": name,
            "image": image,
        });
        dispatch({type: ActionTypes.ADD_ALBUM, payload: response.data});
    };
};

export const fetchAlbum = () => {
    return async function (dispatch, getState) {
        const response = await baseAPI.get("albums/");
        dispatch({type: ActionTypes.FETCH_ALBUMS, payload: response.data});
    };
};


