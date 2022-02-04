import { ActionTypes } from "../actions/types";

const initialState = {
    details: [],
    login: [],
    files: [],
};

export const userDetailsReducer = (state = initialState, {type, payload}) => {
    switch(type){
        case ActionTypes.FETCH_USER_DETAILS:
            return {...state, login: payload};
        case ActionTypes.ADD_USER_DETAILS:
            return {...state, details: payload};
        case ActionTypes.UPDATE_USER_DETAILS:
            return {...state, files: payload};
        case ActionTypes.DELETE_USER_DETAILS:
            return {...state, login: payload};
        case ActionTypes.FETCH_ALL_USERS:
            return {...state, details: payload};
        case ActionTypes.REMOVE_CURRENT_USER_DETAILS:
            return initialState;
        default:
            return state;
      }
}
