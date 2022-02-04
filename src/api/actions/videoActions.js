import baseAPI from '../baseAPI';
import { ActionTypes } from "./types";

export const addVideo = (
    clip, 
    screenshot, 
    language, 
    post, 
    privateVideo, 
    duet, 
    approved, 
    duration,
    likes,
    comments,
    section,
    song,
    user,
    tag
    ) => {
    return async function (dispatch, getState) {
        const today = new Date();
        const response = await baseAPI.post("videos", {
                "clip": clip,
                "screenshot": screenshot, 
                "language": language,
                "post": post, 
                "privateVideo": privateVideo, 
                "duet": duet,
                "approved": approved, 
                "duration": duration,
                "likes": likes,
                "comments": comments,
                "section": section,
                "song": song,
                "user": user,
                "tags": tag,
                "createdAt": today,
            }
        );
        dispatch({type: ActionTypes.ADD_VIDEO, payload: response.data});
    };
};

export const fetchVideos = () => {
    return async function (dispatch, getState) {
        const response = await baseAPI.get("videos");
        dispatch({type: ActionTypes.FETCH_VIDEOS, payload: response.data});
    };
};

export const fetchVideosBySong = (song) => {
    return async function (dispatch, getState) {
        const response = await baseAPI.get("songs/"+ song.id + "/videos");
        dispatch({type: ActionTypes.FETCH_VIDEOS_BY_SONG, payload: response.data});
    };
};

export const fetchVideosByUser = (login) => {
    return async function (dispatch, getState) {
        const response = await baseAPI.get(login + "/videos");
        dispatch({type: ActionTypes.FETCH_VIDEOS_BY_USER, payload: response.data});
    };
};

export const fetchVideosLikedByUser = (login) => {
    return async function (dispatch, getState) {
        const response = await baseAPI.get(login + "/videoLikes");
        dispatch({type: ActionTypes.FETCH_VIDEO_LIKES_BY_USER, payload: response.data});
    };
};

export const updateVideoLikes = (video, totalLikes) => {
    return async function (dispatch, getState) {
        const response = await baseAPI.patch("videos/" + video.id, {
                likes: totalLikes,
            });
        dispatch({type: ActionTypes.UPDATE_VIDEO_LIKES, payload: response.data});
    };
};

export const updateVideoComments = (video, totalComments) => {
    return async function (dispatch, getState) {
        const response = await baseAPI.patch("videos/" + video.id, {
                comments: totalComments,
            });
        dispatch({type: ActionTypes.UPDATE_VIDEO_COMMENTS, payload: response.data});
    };
};

export const deleteVideo= (video) => {
    return async function (dispatch, getState) {
        const response = await baseAPI.get("videos/" + video.id);
        dispatch({type: ActionTypes.DELETE_VIDEO, payload: response.data});
    };
};

export const removeCurrentVideo = () => {
    return {
        type: ActionTypes.REMOVE_CURRENT_VIDEO,
    }
};
