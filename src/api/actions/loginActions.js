import authAPi from '../authAPi';
import baseAPI from '../baseAPI';
import adminAPI from '../adminAPI';

import { ActionTypes } from "./types";

export const fetchUser = (login) => {
    return async function (dispatch, getState) {
        const response = await authAPi.get("admin/users/" + login);
        //console.log('response', response);
        dispatch({type: ActionTypes.FETCH_USER, payload: response.data});
    };
};

export const fetchAllUsers = () => {
    return async function (dispatch, getState) {
        const response = await authAPi.get("admin/users");
        dispatch({type: ActionTypes.FETCH_ALL_USERS, payload: response.data});
    };
};

export const registerUser = (user) => {
    const today = new Date();
    return async function (dispatch, getState) {
        const response = await authAPi.post("register", {
            "activated": user.activated,
            "authorities": [
                "ROLE_USER"
            ],
            "createdBy": "InApp",
            "createdDate": today,
            "email": user.email,
            "firstName": user.firstName,
            "lastName": user.lastName,
            "login": user.login,
            "password": user.password,
          });
        dispatch({type: ActionTypes.REGISTER_USER, payload: response.data});
    };
};

export const authenticateUser = (login, password, rememberMe) => {
    return async function (dispatch, getState) {
        const response = await authAPI.post("authenticate", {
            "password": password,
            "rememberMe": rememberMe,
            "username": login
        });
        dispatch({type: ActionTypes.AUTHENTICATE_USER, payload: response.data});
    };
};

export const updateUser = (user) => {
    const today = new Date();
    return async function (dispatch, getState) {
        const response = await adminAPI.put("admin/users", {
            "authorities": [
                user.authorities,
            ],
            "email": user.email,
            "firstName": user.firstName,
            "id": user.id,
            "lastModifiedBy": user.login,
            "lastModifiedDate": today,
            "lastName": user.lastName,
            "login": user.login,
            "langKey": user.langKey,
            "imageUrl": user.imageUrl,
            "activated": user.activated,
            "createdBy": user.createdBy,
            "createdDate": user.createdDate,
            
          });
        dispatch({type: ActionTypes.UPDATE_USER, payload: response.data});
    };
};

export const deleteUser = (login) => {
    return async function (dispatch, getState) {
        const response = await baseAPI.delete("admin/users" + login);
        dispatch({type: ActionTypes.DELETE_USER, payload: response.data});
    };
};

export const requestPasswordReset = (login) => {
    return async function (dispatch, getState) {
        const response = await baseAPI.post(login + "afrotok-users/");
        dispatch({type: ActionTypes.REQUEST_PASSWORD_RESET, payload: response.data});
    };
};


export const finishPasswordReset = (login) => {
    return async function (dispatch, getState) {
        const response = await baseAPI.post(login + "afrotok-users/");
        dispatch({type: ActionTypes.FINISH_PASSWORD_RESET, payload: response.data});
    };
};


export const changePassword = (
    currentPassword, 
    newPassword
    ) => {
    return async function (dispatch, getState) {
        const response = await authAPI.post("account/change-password", {
            "currentPassword": currentPassword,
            "newPassword": newPassword
          });
        dispatch({type: ActionTypes.CHANGE_PASSWORD, payload: response.data});
    };
};


export const activateUser = (login) => {
    return async function (dispatch, getState) {
        const response = await baseAPI.delete(login + "afrotok-users/");
        dispatch({type: ActionTypes.ACTIVATE_USER, payload: response.data});
    };
};

export const removeCurrentUser = () => {
    return {
        type: ActionTypes.REMOVE_CURRENT_USER,
    }
};
