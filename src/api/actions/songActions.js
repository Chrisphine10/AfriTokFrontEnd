import baseAPI from '../baseAPI';
import { ActionTypes } from "./types";

export const addSong = (album, artist, description, duration, name, url) => {
    return async function (dispatch, getState) {
        const response = await baseAPI.post("songs/", {
            "album": album,
            "artist": artist,
            "description": description,
            "duration": duration,
            "name": name,
            "sauti": url,
          });
        dispatch({type: ActionTypes.CREATE_SONG, payload: response.data});
    };
};

export const fetchSongs = () => {
    return async function (dispatch, getState) {
        const response = await baseAPI.get("songs/");
        dispatch({type: ActionTypes.FETCH_SONGS, payload: response.data});
    };
};

export const updateSong = (album, artist, description, duration, name, url, id) => {
    return async function (dispatch, getState) {
        const response = await baseAPI.put("songs/", {
            "album": album,
            "artist": artist,
            "description": description,
            "duration": duration,
            "name": name,
            "sauti": url,
            "id": id,
          });
        dispatch({type: ActionTypes.UPDATE_SONG, payload: response.data});
    };
};

export const deleteSong = (id) => {
    return async function (dispatch, getState) {
        const response = await baseAPI.delete("songs/" + id);
        dispatch({type: ActionTypes.DELETE_SONG, payload: response.data});
    };
};

