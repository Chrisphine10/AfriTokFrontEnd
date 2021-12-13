import baseAPI from '../baseAPI';

import { ActionTypes } from "./types";

export const fetchUser = (login) => {
    return async function (dispatch, getState) {
        const response = await baseAPI.get("admin/users/" + login);
        dispatch({type: ActionTypes.FETCH_USER, payload: response.data});
    };
};

export const registerUser = (
    login,
    date,
    email,
    firstName,
    lastName,
    password,
    ) => {
    return async function (dispatch, getState) {
        const response = await baseAPI.post("admin/users", {
            "activated": false,
            "authorities": [
                "ROLE_USER"
            ],
            "createdBy": "InApp",
            "createdDate": date,
            "email": email,
            "firstName": firstName,
            "lastName": lastName,
            "login": userName
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

export const updateUser = (
    id,
    login,
    email,
    firstName,
    lastName,
    password,
    activated,
    authorities,
    createdBy,
    createdDate,
    lastModifiedBy,
    lastModifiedDate,
) => {
    return async function (dispatch, getState) {
        const response = await baseAPI.put("admin/users",{
            "activated": activated,
            "authorities": [
              authorities
            ],
            "createdBy": createdBy,
            "createdDate": createdDate,
            "email": email,
            "firstName": firstName,
            "id": id,
            "lastModifiedBy": lastModifiedBy,
            "lastModifiedDate": lastModifiedDate,
            "lastName": lastName,
            "login": login,
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
