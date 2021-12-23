import baseAPI from '../baseAPI';
import { ActionTypes } from "./types";

export const addTag = (date, name) => {
    return async function (dispatch, getState) {
        const response = await baseAPI.post("tags/", {
            "createdAt": date,
            "name": name,
        });
        dispatch({type: ActionTypes.CREATE_TAG, payload: response.data});
    };
};

export const fetchTags = () => {
    return async function (dispatch, getState) {
        const response = await baseAPI.get("tags/");
        dispatch({type: ActionTypes.FETCH_TAGS, payload: response.data});
    };
};

export const deleteTag = (id) => {
    return async function (dispatch, getState) {
        const response = await baseAPI.delete("tags/" + id);
        dispatch({type: ActionTypes.DELETE_TAG, payload: response.data});
    };
};

