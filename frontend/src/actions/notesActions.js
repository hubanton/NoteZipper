import {
  NOTE_LIST_FAIL,
  NOTE_LIST_REQUEST,
  NOTE_LIST_SUCCESS,
  NOTE_CREATE_FAIL,
  NOTE_CREATE_REQUEST,
  NOTE_CREATE_SUCCESS,
  NOTE_UPDATE_REQUEST,
  NOTE_UPDATE_SUCCESS,
  NOTE_UPDATE_FAIL,
  NOTE_DELETE_REQUEST,
  NOTE_DELETE_SUCCESS,
  NOTE_DELETE_FAIL,
} from "../constants/notesConstants";

import axios from "axios";

export const listNotes = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: NOTE_LIST_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();
    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.get("/api/notes", config);

    dispatch({ type: NOTE_LIST_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: NOTE_LIST_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const createNoteAction =
  (title, content, category) => async (dispatch, getState) => {
    try {
      dispatch({
        type: NOTE_CREATE_REQUEST,
      });

      const {
        userLogin: { userInfo },
      } = getState();
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userInfo.token}`,
        },
      };

      const { data } = await axios.post(
        "/api/notes/create",
        { title, content, category },
        config
      );

      dispatch({ type: NOTE_CREATE_SUCCESS, payload: data });
    } catch (error) {
      dispatch({
        type: NOTE_CREATE_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };

export const updateNoteAction =
  (title, content, category, noteID) => async (dispatch, getState) => {
    try {
      dispatch({
        type: NOTE_UPDATE_REQUEST,
      });

      const {
        userLogin: { userInfo },
      } = getState();

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userInfo.token}`,
        },
      };

      const { data } = await axios.put(
        `/api/notes/${noteID}`,
        { title, content, category },
        config
      );

      dispatch({ type: NOTE_UPDATE_SUCCESS, payload: data });
    } catch (error) {
      dispatch({
        type: NOTE_UPDATE_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };

export const deleteNoteAction = (noteID) => async (dispatch, getState) => {
  try {
    dispatch({
      type: NOTE_DELETE_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    console.log(userInfo.token);
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.delete(`/api/notes/${noteID}`, config);

    dispatch({ type: NOTE_DELETE_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: NOTE_DELETE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
