import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signInWithPopup,
    signOut,
    updateProfile,
} from "firebase/auth";
import { auth, dataBase } from "../../firebase/firebaseConfig";
import { logintypes } from "../types/loginTypes";
import { toggleLoading } from "./loadingActions";
import {
    addDoc,
    collection,
    doc,
    getDocs,
    query,
    updateDoc,
    where,
} from "firebase/firestore";
import { getUserCollection } from "../../services/getUserCollection";

const collectionName = "users";
const userCollection = collection(dataBase, collectionName);
//Importaciones necesarias para usar la reacion de usuario con email y contraseña en firebase

const userRegister = ({ name, email, error }) => {
    return {
        type: logintypes.CREATE_USER,
        payload: {
            name,
            email,
            error,
        },
    };
};

export const userRegisterAsync = ({ name, email, password }) => {
    return async (dispatch) => {
        try {
            dispatch(toggleLoading());
            await createUserWithEmailAndPassword(auth, email, password);
            await updateProfile(auth.currentUser, { displayName: name });
            dispatch(userRegister({ name, email, error: false }));
            dispatch(toggleLoading());
        } catch (error) {
            console.log(error);
            dispatch(userRegister({ name, email, error: true }));
        }
    };
};

const userLogin = (user) => {
    return {
        type: logintypes.USER_LOGIN,
        payload: user,
    };
};

export const userLoginAsync = ({ email, password }) => {
    return async (dispatch) => {
        try {
            const { user } = await signInWithEmailAndPassword(
                auth,
                email,
                password
            );
            dispatch(
                userLogin({
                    name: user.user.displayName,
                    email: user.user.email,
                    error: false,
                })
            );
            sessionStorage.setItem(
                "userToken",
                JSON.stringify(user.auth.currentUser)
            );
        } catch (error) {
            dispatch(userLogin({ name: "", email: "", error: true }));
            console.log(error);
        }
    };
};

const userLogout = () => {
    return {
        type: logintypes.USER_LOGOUT,
    };
};

export const userLogoutAsync = () => {
    return async (dispatch) => {
        try {
            await signOut(auth);
            dispatch(userLogout());
        } catch (error) {
            console.log(error);
        }
    };
};

export const userLoginProviderAsync = (provider) => {
    return async (dispatch) => {
        try {
            const { user } = await signInWithPopup(auth, provider);
            dispatch(
                userLogin({
                    name: user.displayName,
                    email: user.email,
                    error: false,
                })
            );
        } catch (error) {
            userLogin({ name: "", email: "", error: true });
            console.log(error);
        }
    };
};

export const createUserWithEmailAndPasswordAsync = (data) => {
    return (dispatch) => {
        createUserWithEmailAndPassword(auth, data.email, data.password)
            .then(async ({ user }) => {
                console.log(user);
                await updateProfile(auth.currentUser, {
                    displayName: data.name,
                    photoURL: data.photo,
                    phoneNumber: data.phone,
                });
                const newUser = {
                    uid: user.auth.currentUser.uid,
                    name: data.name,
                    email: user.auth.currentUser.email,
                    photo: data.photo,
                    location: data.location,
                    phone: data.phone,
                    birthday: data.birthday,
                    typeUser: "client",
                    orders: [{}],
                    recentSearchs: [],
                };
                console.log(newUser);
                const userDocs = await addDoc(userCollection, newUser);
                dispatch(
                    loginUser(
                        { ...newUser, id: userDocs.id },
                        { status: false, message: "" }
                    )
                );
            })
            .catch((error) => {
                console.log(error);
                dispatch(
                    loginUser({}, { status: true, message: error.message })
                );
            });
    };
};

export const createUserWithEmailAsync = (data) => {
    return async (dispatch) => {
        dispatch(toggleLoading());
        try {
            const { user } = await createUserWithEmailAndPassword(
                auth,
                data.email,
                data.password
            );
            console.log(user);
            await updateProfile(auth.currentUser, {
                displayName: data.name,
                photoURL: data.photo,
                phoneNumber: data.phone,
            });
            await updatePhoneNumber(auth.currentUser, data.phone);
            const newUser = {
                uid: user.uid,
                name: data.name,
                email: user.email,
                photo: data.photo,
                location: data.location,
                phone: data.phone,
                birthday: data.birthday,
                typeUser: "client",
                orders: [{}],
                recentSearchs: [],
            };
            console.log(newUser);
            const userDocs = await addDoc(userCollection, newUser);
            dispatch(toggleLoading());
            dispatch(
                loginUser(
                    { ...newUser, id: userDocs.id },
                    { status: false, message: "" }
                )
            );
        } catch (error) {
            console.log(error);
            dispatch(toggleLoading());
            dispatch(loginUser({}, { status: true, message: error.message }));
        }
    };
};

export const updateProfileAsync = (user) => {
    return async (dispatch) => {
        dispatch(toggleLoading());
        try {
            console.log(user);
            const userAuth = auth.currentUser;
            await updateProfile(userAuth, {
                displayName: user.name,
                photoURL: user.photo,
                phoneNumber: user.phone,
            });
            await updatePassword(userAuth, user.password);
            await updateEmail(userAuth, user.email);
            //
            const newUser = {
                uid: userAuth.uid,
                name: user.name,
                email: user.email,
                photo: user.photo,
                location: user.location,
                number: userAuth.phoneNumber,
                birthday: user.birthday,
                typeUser: "client",
            };
            console.log(newUser);
            const userDocs = await addDoc(userCollection, newUser);
            dispatch(toggleLoading());
            dispatch(
                loginUser(
                    {
                        ...newUser,
                        id: userDocs.id,
                    },
                    { status: false, message: "" }
                )
            );
        } catch (error) {
            dispatch(toggleLoading());
            dispatch(loginUser({}, { status: true, message: error.message }));
        }
    };
};

const updateLocation = (data) => {
    return {
        type: logintypes.UPDATE_LOCATION,
        payload: data,
    };
};

export const updateLocationAsync = (location) => {
    return async (dispatch) => {
        const currentUser = auth.currentUser;
        dispatch(toggleLoading());
        let lastLocation = "";
        let id;
        try {
            const q = query(
                userCollection,
                where("uid", "==", currentUser.uid)
            );
            const userDoc = await getDocs(q);
            userDoc.forEach((user) => {
                id = user.id;
                lastLocation = user.data().location;
            });
            const userRef = doc(dataBase, collectionName, id);
            await updateDoc(userRef, { location: location });
            dispatch(updateLocation(location));
            dispatch(toggleError(false));
            dispatch(toggleLoading());
        } catch (error) {
            console.log(error);
            dispatch(toggleError(true));
            dispatch(toggleLoading());
            dispatch(updateLocation(lastLocation));
        }
    };
};

export const recentSearchs = (data) => {
    return {
        type: logintypes.RECENT_SEARCH,
        payload: data,
    };
};

export const updateRecentAsync = (data) => {
    return async (dispatch) => {
        const currentUser = auth.currentUser;
        dispatch(toggleLoading());
        let id;
        let array;
        try {
            const q = query(
                userCollection,
                where("uid", "==", currentUser.uid)
            );
            const userDoc = await getDocs(q);
            userDoc.forEach((user) => {
                id = user.id;
                array = user.data().recentSearchs;
            });
            if (data.delete) {
                array = array.filter((item) => item !== data.value);
            } else {
                if (array[0] == "") {
                    array = [data.value];
                } else {
                    array = [...array, data.value];
                }
            }
            const userRef = doc(dataBase, collectionName, id);
            await updateDoc(userRef, { recentSearchs: array });
            dispatch(recentSearchs(array));
            dispatch(toggleError(false));
            dispatch(toggleLoading());
        } catch (error) {
            console.log(error);
            dispatch(toggleError(true));
            dispatch(toggleLoading());
        }
    };
};

const updateOrder = (data) => {
    return {
        type: logintypes.UPDATE_ORDERS,
        payload: data,
    };
};

export const updateOrderAsync = (data) => {
    return async (dispatch) => {
        const currentUser = auth.currentUser;
        dispatch(toggleLoading());
        let id;
        let array;
        try {
            const q = query(
                userCollection,
                where("uid", "==", currentUser.uid)
            );
            const userDoc = await getDocs(q);
            userDoc.forEach((user) => {
                id = user.id;
                array = user.data().orders;
            });
            if (data.delete) {
                array = array.filter((item) => item !== data.value);
            } else {
                if (!array.length) {
                    array = [data.value];
                } else {
                    array = [...array, data.value];
                }
            }
            const userRef = doc(dataBase, collectionName, id);
            await updateDoc(userRef, { orders: array });
            dispatch(updateOrder(array));
            dispatch(toggleError(false));
            dispatch(toggleLoading());
        } catch (error) {
            console.log(error);
            dispatch(toggleError(true));
            dispatch(toggleLoading());
        }
    };
};

export const toggleError = (data) => {
    return {
        type: logintypes.TOGGLE_ERROR,
        payload: data,
    };
};

export const verifyCodeAsync = (code) => {
    return (dispatch) => {
        window.confirmationResult
            .confirm(code)
            .then(async (result) => {
                const user = result.user.auth.currentUser;
                const userCollection = await getUserCollection(user.uid);
                dispatch(
                    loginUser(
                        {
                            ...userCollection,
                        },
                        { status: false, message: "" }
                    )
                );
            })
            .catch((error) => {
                console.log(error);
                dispatch(
                    loginUser({}, { status: true, message: error.message })
                );
            });
    };
};

export const loginWithEmail = (user) => {
    console.log(user);
    return async (dispatch) => {
        dispatch(toggleLoading());
        try {
            const email = user.email;
            const password = user.password;
            const userAuth = await signInWithEmailAndPassword(
                auth,
                email,
                password
            );
            const userCollection = await getUserCollection(userAuth.user.uid);
            console.log(userCollection);
            dispatch(
                loginUser(
                    {
                        ...userCollection,
                    },
                    { status: false, message: "" }
                )
            );
            dispatch(toggleLoading());
        } catch (error) {
            dispatch(toggleLoading());
            dispatch(loginUser({}, { status: true, message: error.message }));
        }
    };
};
