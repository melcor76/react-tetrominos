import { createAction } from "redux-actions";

export const Type = {
  START_PLAYING: "START_PLAYING",
  STOP_PLAYING: "STOP_PLAYING"
}

export const startPlaying = createAction(Type.START_PLAYING);
export const stopPlaying = createAction(Type.STOP_PLAYING);