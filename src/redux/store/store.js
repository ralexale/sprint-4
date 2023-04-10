import { configureStore } from "@reduxjs/toolkit";
import { loadingReducer } from "../reducers/loadingReducer";
import { loginReducer } from "../reducers/loginReducers";
import { restaurantReducer } from "../reducers/restaurantsReducers";

const reducer = {
    login: loginReducer,
    loading: loadingReducer,
    restaurants: restaurantReducer,
};

const store = configureStore({
    reducer,
    devTools: process.env.NODE_ENV !== "production",
});

export default store;
