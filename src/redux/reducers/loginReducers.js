import { logintypes } from "../types/loginTypes";

const initialState = {
    user: {
        location: "",
        birthday: "",
        email: "",
        id: "",
        name: "",
        number: "",
        photo: "",
        typeUser: "",
        uid: "",
        orders: [],
        recentSearchs: [],
    },
    error: {
        state: undefined,
        message: "",
    },
    loading: false,
    isLogged: false,
};

export const loginReducer = (state = initialState, action) => {
    switch (action.type) {
        case logintypes.CREATE_USER:
            return {
                ...state,
                user: action.payload.user,
                error: action.payload.error,
                isLogged: true,
            };
        case logintypes.LOGIN:
            return {
                ...state,
                user: action.payload.user,
                error: action.payload.error,
                isLogged: true,
            };
        case logintypes.TOGGLE_ERROR:
            return {
                ...state,
                error: {
                    ...state.error,
                    status: action.payload,
                },
            };
        case logintypes.LOGOUT:
            return {
                ...initialState,
            };
        case logintypes.TOGGLE_LOADING:
            return {
                ...state,
                loading: !state.loading,
            };
        case logintypes.UPDATE_LOCATION:
            return {
                ...state,
                user: {
                    ...state.user,
                    location: action.payload,
                },
            };
        case logintypes.RECENT_SEARCH:
            return {
                ...state,
                user: {
                    ...state.user,
                    recentSearchs: action.payload,
                },
            };
        case logintypes.UPDATE_ORDERS:
            return {
                ...state,
                user: {
                    ...state.user,
                    orders: action.payload,
                },
            };
        default:
            return state;
    }
};
