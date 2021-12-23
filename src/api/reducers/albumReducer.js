import { ActionTypes } from "../actions/types";

const initialState = {
    albums: []
};

export const albumReducer = (state = initialState, {type, payload}) => {
    switch(type){
        case ActionTypes.ADD_ALBUM:
            return {...state, albums: payload};
        case ActionTypes.FETCH_ALBUMS:
            return {...state, albums: payload};
        default:
            return state;
      }
}
