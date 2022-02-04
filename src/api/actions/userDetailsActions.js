import baseAPI from '../baseAPI';
import { ActionTypes } from "./types";

export const addUserDetails = (details) => {
    return async function (dispatch, getState) {
        const response = await baseAPI.post("afrotok-users", {
            "bio": details.bio,
            "image": details.image,
            "countryCode": details.countryCode,
            "phone": details.phone,
            "user": details.user,
            following: 0,
            followers: 0,
            likes: 0,
        });
        //console.log(response.data);
        dispatch({type: ActionTypes.ADD_USER_DETAILS, payload: response.data});
    };
};

export const fetchUserDetails = (login) => {
    return async function (dispatch, getState) {
        const response = await baseAPI.get("{login}/user-details?login=" + login);
        dispatch({type: ActionTypes.FETCH_USER_DETAILS, payload: response.data});
    };
};

export const fetchAllUsers = () => {
    return async function (dispatch, getState) {
        const response = await baseAPI.get("afrotok-users");
        dispatch({type: ActionTypes.FETCH_ALL_USERS, payload: response.data});
    };
};

export const updateUserDetails = (user) => {
    return async function (dispatch, getState) {
        const response = await baseAPI.put("afrotok-users/" + user.id, {
            "id": user.id,
            "bio": user.bio,
            "image": user.image,
            "countryCode": user.countryCode,
            "phone": user.phone,
            "following": user.following,
            "followers": user.followers,
            "likes": user.likes,
            "user": user.user,
        });
        dispatch({type: ActionTypes.UPDATE_USER_DETAILS, payload: response.data});
    };
};

export const deleteUserDetails = (id) => {
    return async function (dispatch, getState) {
        const response = await baseAPI.delete("afrotok-users/" + id);
        dispatch({type: ActionTypes.DELETE_USER_DETAILS, payload: response.data});
    };
};

export const removeUserDetails = () => {
    return {
        type: ActionTypes.REMOVE_CURRENT_USER_DETAILS,
    }
};

