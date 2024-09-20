import { createAction, createReducer } from "@reduxjs/toolkit";
export const setUser = createAction<User>("SET_USERS");

interface User {
  id: number;
  name?: string;
}
//estado inicial, con tipo user
const initialState: User = {
  id: 0,
};
//Reducer para manejar las acciones
export const userReducer = createReducer(initialState, (builder) => {
  builder.addCase(setUser, (_state, action) => {
    return action.payload;
  });
});
