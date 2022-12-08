import axios from "axios";

const url_get_all_product = "http://localhost:5000/product/";
const url_get_one_product = "http://localhost:5000/product/";
const url_add_new_product = "http://localhost:5000/product/add";
const url_delete_product = "http://localhost:5000/product/delete/";
const url_edit_product = "http://localhost:5000/product/update/";
const ProductService = {
    getAllProduct: async () => {
        try {
            let response = await axios.get(url_get_all_product);
            return response;
        } catch (error) {
            console.log(error);
        }
    },
    getOneProduct: async (idProduct) => {
        try {
            let response = await axios.get(url_get_one_product + idProduct);
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

    deleteOneProduct: async (idProduct) => {
        try {
            let response = await axios.delete(url_delete_product + idProduct);
            return response;
        } catch (error) {
            console.log(error);
        }
    },
    updateOneProduct: async (idProduct, productUpdate) => {
        try {
            let response = await axios.put(
                url_edit_product + idProduct,
                productUpdate
            );
            return response;
        } catch (error) {
            console.log(error);
        }
    },
};

export default ProductService;
