import baseAPI from '../baseAPI';
import { ActionTypes } from "./types";

export const addPost = (user, id, date) => {
    return async function (dispatch, getState) {
        const response = await baseAPI.post("post", {
                "follow": true,
                "followedAt": date,
                "followerId": id,
                "user": user,
        });
        dispatch({type: ActionTypes.ADD_FOLLOW_USER, payload: response.data});
    };
};

export const deletePost = (id) => {
    return async function (dispatch, getState) {
        const response = await baseAPI.delete("post/" + id);
        dispatch({type: ActionTypes.DELETE_FOLLOW_USER, payload: response.data});
    };
};

export const fetchPost = (login, id) => {
    return async function (dispatch, getState) {
        const response = await baseAPI.get(login + "/post/{id}?id=" + id);
        dispatch({type: ActionTypes.FETCH_FOLLOW_USER, payload: response.data});
    };
};

export const updatePost = (login) => {
    return async function (dispatch, getState) {
        const response = await baseAPI.get(login + "/post");
        dispatch({type: ActionTypes.FETCH_USER_FOLLOWS, payload: response.data});
    };
};

export const removeCurrentPost = () => {
    return {
        type: ActionTypes.CLEAR_FOLLOW_USER,
    }
};