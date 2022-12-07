import axios from "axios";

const url_get_all_category = "http://localhost:5000/category/";

const CategoryService = {
    getAllCategory: async () => {
        try {
            let response = await axios.get(url_get_all_category);
            return response;
        } catch (error) {
            console.log(error);
        }
    },
};

export default CategoryService;
