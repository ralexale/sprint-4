import { loadingTypes } from "../types/loginTypes";

const initalState = false;

export const loadingReducer = (state = initalState, action) => {
    switch (action.type) {
        case loadingTypes.TOOGGLE_LOADING:
            return !state;

        default:
            return state;
    }
};
