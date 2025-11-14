import { createAction, createReducer } from "@reduxjs/toolkit";
export const setFavs = createAction<Favs[]>("SET_FAVS");

interface Favs {
  id: number;
}

//estado inicial con tipp favs
const initialState: Favs[] = [];

//Reducer para manejar las acciones
export const favsReducer = createReducer(initialState, (builder) => {
  builder.addCase(setFavs, (_state, action) => {
    return action.payload;
  });
});
