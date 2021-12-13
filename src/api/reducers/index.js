import { combineReducers } from "redux";
import { videoReducer } from "./videoReducer";
import { videoLikesReducer } from "./videoLikesReducer";
import { userDetailsReducer } from "./userDetailsReducer";
import { followReducer } from "./followReducer";

export default reducers = combineReducers({
    allVideos: videoReducer,
    allVideoLikes: videoLikesReducer, 
    userDetails: userDetailsReducer,
    allFollows: followReducer,
});
