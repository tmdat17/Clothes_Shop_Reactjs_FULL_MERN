import axios from "axios";

const url_add_new_galery = "http://localhost:5000/galery/add";
const url_get_all_galery = "http://localhost:5000/galery/";

const GaleryService = {
    getAllGalery: async () => {
        try {
            let response = await axios.get(url_get_all_galery);
            return response;
        } catch (error) {
            console.log(error);
        }
    },

    addNewGalery: async (newGalery) => {
        try {
            let response = await axios.post(url_add_new_galery, newGalery);
            return response;
        } catch (error) {
            console.log(error);
        }
    },
};

export default GaleryService;
