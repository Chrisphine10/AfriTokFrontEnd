import { combineReducers } from "redux";
import { videoReducer } from "./videoReducer";
import { videoLikesReducer } from "./videoLikesReducer";
import { userDetailsReducer } from "./userDetailsReducer";
import { followReducer } from "./followReducer";
import { awsReducer } from "./awsReducer";
import { thumbnailReducer } from "./thumbnailReducer";
import { songReducer } from "./songReducer";
import { albumReducer } from "./albumReducer";
import { tagReducer } from "./tagReducer";


export default reducers = combineReducers({
    allVideos: videoReducer,
    allVideoLikes: videoLikesReducer, 
    userDetails: userDetailsReducer,
    allFollows: followReducer,
    allAWSFiles: awsReducer,
    allThumbnails: thumbnailReducer,
    allTags: tagReducer,
    allSongs: songReducer,
    allAlbums: albumReducer,
});
