import { ActionTypes } from "../actions/types";

const initialState = {
    videos: []
};

export const videoReducer = (state = initialState, {type, payload}) => {
    switch(type){
        case ActionTypes.FETCH_VIDEOS:
            return {...state, videos: payload};
        case ActionTypes.FETCH_VIDEOS_BY_SONG:
            return {...state, videos: payload};
        case ActionTypes.FETCH_VIDEOS_BY_USER:
            return {...state, videos: payload};
        case ActionTypes.UPDATE_VIDEO_LIKES:
            return {...state, videos: payload};
        case ActionTypes.UPDATE_VIDEO_COMMENTS:
            return {...state, videos: payload};
        case ActionTypes.DELETE_VIDEO:
            return {...state, videos: payload};
        case ActionTypes.ADD_VIDEO:
            return {...state, videos: payload};
        default:
            return state;
      }
}
