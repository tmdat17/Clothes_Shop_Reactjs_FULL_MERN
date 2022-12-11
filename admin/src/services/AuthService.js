import axios from "axios";
import {
    loginFailed,
    loginStart,
    loginSuccess,
    logoutStart,
    logoutSuccess,
    logoutFailed,
} from "../redux/authSlice";

const url_login = "http://localhost:5000/auth/login";
const url_logout_user = "http://localhost:5000/auth/logout/";

const AuthService = {
    loginUser: async (user, dispatch, navigate) => {
        dispatch(loginStart());
        try {
            const res = await axios.post(url_login, user);
            if (!res.data.admin) {
                dispatch(loginFailed("Bạn không có quyền truy cập!!"));
                navigate("/login");
            } else {
                dispatch(loginSuccess(res.data));
                navigate("/");
            }
        } catch (error) {
            dispatch(loginFailed(error.response.data));
        }
    },
    logoutUser: async (dispatch, id, navigate, accessToken) => {
        dispatch(logoutStart());
        try {
            await axios.post(url_logout_user, id, {
                headers: { token: `Bearer ${accessToken}` },
            });
            dispatch(logoutSuccess());
            navigate("/login");
        } catch (error) {
            dispatch(logoutFailed());
        }
    },
};

export default AuthService;
