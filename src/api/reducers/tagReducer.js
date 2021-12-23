import { ActionTypes } from "../actions/types";

const initialState = {
    tags: []
};

export const tagReducer = (state = initialState, {type, payload}) => {
    switch(type){
        case ActionTypes.CREATE_TAG:
            return {...state, tags: payload};
        case ActionTypes.FETCH_TAGS:
            return {...state, tags: payload};
        case ActionTypes.DELETE_TAG:
            return {...state, tags: payload};
        default:
            return state;
      }
}
