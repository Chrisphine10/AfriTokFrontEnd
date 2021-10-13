import {
    ADD_NEW_VIDEO,
    GET_ALL_VIDEOS,
    GET_VIDEOS_BY_SONG,
    GET_VIDEOS_BY_USER,
    UPDATE_VIDEO,
    DELETE_VIDEO,
} from '../actions/types'; 

const initialState = {
    videoList: []
}

const videoReducer = (state = initialState, action) => {
    switch(action.type){
        case ADD_NEW_VIDEO:
            return {
                ...state,
                videoList: state.videoList.concat({
                    clip: action
                    post: action
                    
                })
            }
        case GET_ALL_VIDEOS:
            return ;
        case GET_VIDEOS_BY_SONG:
            return ;
        case GET_VIDEOS_BY_USER:
            return ;
        case UPDATE_VIDEO:
            return ;
        case DELETE_VIDEO:
            return ;

        default:
            return state;
      }
}

export default videoReducer;