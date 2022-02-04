import { ActionTypes } from "../actions/types";

const initialState = {
    notification: []
};

export const notificationReducer = (state = initialState, {type, payload}) => {
    switch(type){
        case ActionTypes.CREATE_NOTIFICATION:
            return {...state, notification: payload};
        case ActionTypes.DELETE_NOTIFICATION:
            return {...state, notification: payload};
        case ActionTypes.FETCH_NOTIFICATIONS:
            return {...state, notification: payload};
        case ActionTypes.UPDATE_NOTIFICATION:
            return {...state, notification: payload};
        case ActionTypes.CLEAR_NOTIFICATION:
            return {...state, notification: []};
        default:
            return state;
      }
}
