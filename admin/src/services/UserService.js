import axios from "axios";

const url_get_all_user = "http://localhost:5000/user";
const url_get_one_user = "http://localhost:5000/user/";
const UserService = {
    getAllUser: async (accessToken) => {
        try {
            let res = await axios.get(url_get_all_user, {
                headers: { token: `Bearer ${accessToken}` },
            });
            return res;
        } catch (error) {
            console.log(error);
        }
    },
    getOneUser: async (id) => {
        try {
            let response = await axios.get(url_get_one_user + id);
            return response;
        } catch (error) {
            console.log(error);
        }
    },
};

export default UserService;
