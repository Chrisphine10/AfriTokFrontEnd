import baseAPI from '../baseAPI';
import { ActionTypes } from "./types";

export const addUserDetails = (bio, countryCode, phone, user, image) => {
    return async function (dispatch, getState) {
        const response = await baseAPI.post("afrotok-users", {
            "bio": bio,
            "image": image,
            "countryCode": countryCode,
            "phone": phone,
            "user": user,
        });
        dispatch({type: ActionTypes.ADD_USER_DETAILS, payload: response.data});
    };
};

export const fetchUserDetails = (login) => {
    return async function (dispatch, getState) {
        const response = await baseAPI.get("{login}/user-details?login=" + login);
        //console.log(response.data);
        dispatch({type: ActionTypes.FETCH_USER_DETAILS, payload: response.data});
    };
};

export const updateUserDetails = (id) => {
    return async function (dispatch, getState) {
        const response = await baseAPI.put("afrotok-users/" + id);
        dispatch({type: ActionTypes.UPDATE_USER_DETAILS, payload: response.data});
    };
};

export const deleteUserDetails = (id) => {
    return async function (dispatch, getState) {
        const response = await baseAPI.delete("afrotok-users/" + id);
        dispatch({type: ActionTypes.DELETE_USER_DETAILS, payload: response.data});
    };
};

