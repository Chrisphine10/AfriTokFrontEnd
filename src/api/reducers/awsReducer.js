import { ActionTypes } from "../actions/types";

const initialState = {
    files: []
};

export const awsReducer = (state = initialState, {type, payload}) => {
    switch(type){
        case ActionTypes.UPLOAD_FILE:
            return {...state, files: payload};
        case ActionTypes.DOWNLOAD_FILE:
            return {...state, files: payload};
        case ActionTypes.DELETE_FILE:
            return {...state, files: payload};
        case ActionTypes.REMOVE_CURRENT_AWS_FILE:
            return {};
        default:
            return state;
      }
}
