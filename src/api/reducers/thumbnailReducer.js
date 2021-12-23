import { ActionTypes } from "../actions/types";

const initialState = {
    files: []
};

export const thumbnailReducer = (state = initialState, {type, payload}) => {
    switch(type){
        case ActionTypes.UPLOAD_THUMB:
            return {...state, files: payload};
        case ActionTypes.DOWNLOAD_THUMB:
            return {...state, files: payload};
        case ActionTypes.DELETE_THUMB:
            return {...state, files: payload};
        case ActionTypes.REMOVE_CURRENT_AWS_THUMB:
            return {};
        default:
            return state;
      }
}
