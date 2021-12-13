import baseAPI from '../baseAPI';
import { ActionTypes } from "./types";

export const likeVideo = (user, video, date) => {
    return async function (dispatch, getState) {
        const response = await baseAPI.post("video-likes", {
                "like" : true,
                "createdAt" : date,
                "user" : user,
                "video": video,
        });
        dispatch({type: ActionTypes.LIKE_VIDEO, payload: response.data});
    };
};

export const deleteLikeVideo = (videoLike) => {
    return async function (dispatch, getState) {
        const response = await baseAPI.delete("video-likes/" + videoLike);
        dispatch({type: ActionTypes.DELETE_LIKE_VIDEO, payload: response.data});
    };
};

export const fetchVideoLikes = (video) => {
    return async function (dispatch, getState) {
        const response = await baseAPI.get("videos/" + video + "/videoLikes");
        dispatch({type: ActionTypes.FETCH_VIDEO_LIKES, payload: response.data});
    };
};

export const fetchUserVideoLikes = (login, video) => {
    return async function (dispatch, getState) {
        const response = await baseAPI.get(login + "/videos/{id}/videoLike?id=" + video);
        //console.log(response.data);
        dispatch({type: ActionTypes.FETCH_USER_VIDEO_LIKES, payload: response.data});
    };
};

export const removeCurrentLike = () => {
    return {
        type: ActionTypes.REMOVE_CURRENT_LIKE,
    }
};

