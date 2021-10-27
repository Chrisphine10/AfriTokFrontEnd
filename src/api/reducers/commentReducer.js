import { ActionTypes } from "../actions/types";

const initialState = {
    comments: []
};

export const commentReducer = (state = initialState, {type, payload}) => {
    switch(type){
        case ActionTypes.ADD_VIDEO_COMMENT:
            return {...state, comments: payload};
        case ActionTypes.FETCH_VIDEO_COMMENTS:
            return {...state, comments: payload};
        case ActionTypes.DELETE_VIDEO_COMMENT:
            return {...state, comments: payload};
        default:
            return state;
      }
}
