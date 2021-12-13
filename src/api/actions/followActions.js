import baseAPI from '../baseAPI';
import { ActionTypes } from "./types";

export const addFollowUser = (user, id, date) => {
    return async function (dispatch, getState) {
        const response = await baseAPI.post("follows", {
                "follow": true,
                "followedAt": date,
                "followerId": id,
                "user": user,
        });
        dispatch({type: ActionTypes.ADD_FOLLOW_USER, payload: response.data});
    };
};

export const deleteFollowUser = (id) => {
    return async function (dispatch, getState) {
        const response = await baseAPI.delete("follows/" + id);
        dispatch({type: ActionTypes.DELETE_FOLLOW_USER, payload: response.data});
    };
};

export const fetchFollowUser = (login, id) => {
    return async function (dispatch, getState) {
        const response = await baseAPI.get(login + "/follows/{id}?id=" + id);
        dispatch({type: ActionTypes.FETCH_FOLLOW_USER, payload: response.data});
    };
};

export const removeCurrentFollowUser = () => {
    return {
        type: ActionTypes.CLEAR_FOLLOW_USER,
    }
};