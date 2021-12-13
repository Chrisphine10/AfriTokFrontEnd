import { ActionTypes } from "../actions/types";

const initialState = {
    details: []
};

export const userDetailsReducer = (state = initialState, {type, payload}) => {
    switch(type){
        case ActionTypes.FETCH_USER_DETAILS:
            return {...state, details: payload};
        case ActionTypes.ADD_USER_DETAILS:
            return {...state, details: payload};
        case ActionTypes.UPDATE_USER_DETAILS:
            return {...state, details: payload};
        case ActionTypes.DELETE_USER_DETAILS:
            return {...state, details: payload};
        default:
            return state;
      }
}
