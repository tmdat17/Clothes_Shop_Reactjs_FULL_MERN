import { createSlice } from '@reduxjs/toolkit';

const authSlice = createSlice({
    name: 'auth',
    initialState: {
        login: {
            currentUser: null,
            isFetching: false,
            error: false,
        },

        logout: {
            isFetching: false,
            error: false,
        },
        msgLogin: '',
    },

    reducers: {
        loginStart: (state) => {
            state.login.isFetching = true;
        },
        loginSuccess: (state, action) => {
            state.login.isFetching = false;
            state.login.currentUser = action.payload;
            state.login.error = false;
            state.msgLogin = '';
            state.msgRegister = '';
        },

        loginFailed: (state, action) => {
            state.login.isFetching = false;
            state.login.error = true;
            state.msgLogin = action.payload;
        },

        logoutStart: (state) => {
            state.logout.isFetching = true;
        },
        logoutSuccess: (state) => {
            state.logout.isFetching = false;
            state.login.currentUser = null;
            state.logout.error = false;
            state.msgLogin = '';
            state.msgRegister = '';
        },

        logoutFailed: (state, action) => {
            state.logout.isFetching = false;
            state.logout.error = true;
        },
    },
});

export const {
    loginStart,
    loginFailed,
    loginSuccess,

    logoutStart,
    logoutSuccess,
    logoutFailed,
} = authSlice.actions;

export default authSlice.reducer;
