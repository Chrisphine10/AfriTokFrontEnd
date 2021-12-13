import { ActionTypes } from "../actions/types";

const initialState = {
    likes: []
};

export const videoLikesReducer = (state = initialState, {type, payload}) => {
    switch(type){
        case ActionTypes.FETCH_VIDEO_LIKES:
            return {...state, likes: payload};
        case ActionTypes.LIKE_VIDEO:
            return {...state, likes: payload};
        case ActionTypes.DELETE_LIKE_VIDEO:
            return {};
        case ActionTypes.FETCH_USER_VIDEO_LIKES:
            return {...state, likes: payload};
        case ActionTypes.REMOVE_CURRENT_LIKE:
            return {};
        default:
            return state;
      }
}
