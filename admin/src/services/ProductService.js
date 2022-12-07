import axios from "axios";

const url_get_all_product = "http://localhost:5000/product/";
const url_add_new_product = "http://localhost:5000/product/add";

const ProductService = {
    getAllProduct: async () => {
        try {
            let response = await axios.get(url_get_all_product);
            return response;
        } catch (error) {
            console.log(error);
        }
    },

    addNewProduct: async (newProduct) => {
        try {
            let response = await axios.post(url_add_new_product, newProduct);
            return response;
        } catch (error) {
            console.log(error);
        }
    },
};

export default ProductService;
