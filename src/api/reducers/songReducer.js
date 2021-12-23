import { ActionTypes } from "../actions/types";

const initialState = {
    songs: []
};

export const songReducer = (state = initialState, {type, payload}) => {
    switch(type){
        case ActionTypes.CREATE_SONG:
            return {...state, songs: payload};
        case ActionTypes.FETCH_SONGS:
            return {...state, songs: payload};
        case ActionTypes.UPDATE_SONG:
            return {...state, songs: payload};
        case ActionTypes.DELETE_SONG:
            return {...state, songs: payload};
        default:
            return state;
      }
}
