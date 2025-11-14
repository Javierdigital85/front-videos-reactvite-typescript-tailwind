import { configureStore } from "@reduxjs/toolkit";
import { userReducer } from "./user";
import { favsReducer } from "./favs";

const store = configureStore({
  reducer: {
    user: userReducer,
    favoritos: favsReducer,
  },
});

export default store;
