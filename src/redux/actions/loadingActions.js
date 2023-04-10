import { loadingTypes } from "../types/loginTypes";

export const toggleLoading = (value = false) => {
    return {
        type: loadingTypes.TOOGGLE_LOADING,
        payload: value,
    };
};
