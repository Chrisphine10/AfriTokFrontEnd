import { ActionTypes } from "../actions/types";

const initialState = {
    follow: []
};

export const followReducer = (state = initialState, {type, payload}) => {
    switch(type){
        case ActionTypes.ADD_FOLLOW_USER:
            return {...state, follow: payload};
        case ActionTypes.FETCH_FOLLOW_USER:
            return {...state, follow: payload};
        case ActionTypes.DELETE_FOLLOW_USER:
            return {...state, follow: payload};
        case ActionTypes.CLEAR_FOLLOW_USER:
            return {...state, follow: []};
        case ActionTypes.FETCH_USER_FOLLOWS:
            return {...state, follow: payload};
        default:
            return state;
      }
}
