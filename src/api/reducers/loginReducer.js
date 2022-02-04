import { ActionTypes } from "../actions/types";

const initialState = {
    login: [],
    userDetails: [],
    files: [],
};

export const loginReducer = (state = initialState, {type, payload}) => {
    switch(type){
        case ActionTypes.AUTHENTICATE_USER:
            return {...state, login: payload};
        case ActionTypes.FETCH_USER:
            return {...state, login: payload};
        case ActionTypes.FETCH_ALL_USERS:
            return {...state, userDetails: payload};
        case ActionTypes.REGISTER_USER:
            return {...state, login: payload};
        case ActionTypes.UPDATE_USER:
            return {...state, files: payload};
        case ActionTypes.DELETE_USER:
            return {...state, login: payload};
        case ActionTypes.REQUEST_PASSWORD_RESET:
            return {...state, login: payload};
        case ActionTypes.FINISH_PASSWORD_RESET:
            return {...state, login: payload};
        case ActionTypes.CHANGE_PASSWORD:
            return {...state, login: payload};
        case ActionTypes.ACTIVATE_USER:
            return {...state, login: payload};
        case ActionTypes.REMOVE_CURRENT_USER:
            return initialState;
        default:
            return state;
      }
}
