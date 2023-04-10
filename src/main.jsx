import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import RouterApp from "./router/RouterApp";
import { Provider } from "react-redux";
import store from "./redux/store/store";

ReactDOM.createRoot(document.getElementById("root")).render(
    <Provider store={store}>
        <RouterApp />
    </Provider>
);
