import baseAPI from '../baseAPI';
import { ActionTypes } from "./types";

export const createNofitication = (activity) => {
    return async function (dispatch, getState) {
        const response = await baseAPI.post("nofitications", {
                "read": false,
                "sourceId": activity.id,
                "type": activity.type,
                "trash": false,
                "type": activity.type,
                "user": activity.user,
        });
        dispatch({type: ActionTypes.CREATE_NOTIFICATION, payload: response.data});
    };
};

export const deleteNofitication = (id) => {
    return async function (dispatch, getState) {
        const response = await baseAPI.delete("nofitications/" + id);
        dispatch({type: ActionTypes.DELETE_NOTIFICATION, payload: response.data});
    };
};

export const fetchNofitication = (login, id) => {
    return async function (dispatch, getState) {
        const response = await baseAPI.get("nofitications/{id}?id=" + id);
        dispatch({type: ActionTypes.FETCH_NOTIFICATIONS, payload: response.data});
    };
};

export const updateNofitication = (id) => {
    return async function (dispatch, getState) {
        const response = await baseAPI.get("nofitications/" + id);
        dispatch({type: ActionTypes.UPDATE_NOTIFICATION, payload: response.data});
    };
};

export const removeCurrentNofitication = () => {
    return {
        type: ActionTypes.CLEAR_NOTIFICATION,
    }
};