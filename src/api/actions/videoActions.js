import { ActionTypes } from "./types";

export const addVideo = (video) => ({
    type: ActionTypes.ADD_VIDEO,
    payload: video
});

export const setVideo = (video) => ({
    type: ActionTypes.FETCH_VIDEO,
    payload: video
});

export const setVideos = (videos) => ({
    type: ActionTypes.FETCH_VIDEOS,
    payload: videos
});

export const setVideosBySong = (videos) => ({
    type: ActionTypes.FETCH_VIDEOS_BY_SONG,
    payload: videos
});


export const setVideosByUser = (videos) => ({
    type: ActionTypes.FETCH_VIDEOS_BY_USER,
    payload: videos
});

export const updateVideo = (video) => ({
    type: ActionTypes.UPDATE_VIDEO,
    payload: video
});

export const deleteVideo = (video) => ({
    type: ActionTypes.DELETE_VIDEO,
    payload: video
});