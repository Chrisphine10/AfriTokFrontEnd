import { ActionTypes } from "../actions/types";

const initialState = {
    videos: []
};

export const videoReducer = (state = initialState, {type, payload}) => {
    switch(type){
        case ActionTypes.FETCH_VIDEOS:
            return {...state, videos: payload};
        case ActionTypes.FETCH_VIDEO:
            return 
                state
        case ActionTypes.UPDATE_VIDEO:
            return
                state
        case ActionTypes.DELETE_VIDEO:
            return 
                state
        case ActionTypes.FETCH_VIDEOS_BY_SONG:
            return 
                state
        case ActionTypes.FETCH_VIDEOS_BY_USER:
            return 
                state
        case ActionTypes.ADD_VIDEO:
            return
                state
        default:
            return state;
      }
}
