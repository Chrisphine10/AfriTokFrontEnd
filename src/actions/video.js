import {
    ADD_NEW_VIDEO,
    GET_ALL_VIDEOS,
    GET_VIDEOS_BY_SONG,
    GET_VIDEOS_BY_USER,
    UPDATE_VIDEO,
    DELETE_VIDEO,
} from './types';

export const addVideo = (video) => ({
    type: ADD_NEW_VIDEO,
    data: video
});

export const getAllVideo = (key) => ({
    type: GET_ALL_VIDEOS,
    key: key
});

export const getAllVideoBySong = (key) => ({
    type: GET_VIDEOS_BY_SONG,
    key: key
});


export const getAllVideoByUser = (key) => ({
    type: GET_VIDEOS_BY_USER,
    key: key
});

export const updateVideo = (key) => ({
    type: UPDATE_VIDEO,
    key: key
});

export const addVideo = (key) => ({
    type: DELETE_VIDEO,
     key: key
});