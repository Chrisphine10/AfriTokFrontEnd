import { combineReducers } from "redux";
import { videoReducer } from "./videoReducer";
import { videoLikesReducer } from "./videoLikesReducer";

export default reducers = combineReducers({
    allVideos: videoReducer,
    allVideoLikes: videoLikesReducer, 
});
