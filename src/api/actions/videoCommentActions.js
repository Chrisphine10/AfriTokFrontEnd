import baseAPI from '../baseAPI';
import { ActionTypes } from "./types";

export const commentVideo = (comment, user, video) => {
    return async function (dispatch, getState) {
        const response = await baseAPI.post("video-comments", {
            body: {
                comment: comment,
                updatedAt: new Date(),
                user: user,
                video: video,
            }
        });
        dispatch({type: ActionTypes.ADD_VIDEO_COMMENT, payload: response.data});
    };
};

export const deleteCommentVideo = (videoComment) => {
    return async function (dispatch, getState) {
        const response = await baseAPI.get("video-comments/" + videoComment.id);
        dispatch({type: ActionTypes.DELETE_VIDEO_COMMENT, payload: response.data});
    };
};

export const fetchVideoComments = (video) => {
    return async function (dispatch, getState) {
        const response = await baseAPI.get("videos/" + video.id+ "/video-comments");
        dispatch({type: ActionTypes.FETCH_VIDEO_COMMENTS, payload: response.data});
    };
};

