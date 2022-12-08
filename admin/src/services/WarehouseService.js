import axios from "axios";

const url_get_one_warehouse = "http://localhost:5000/warehouse/";
const url_get_all_warehouse = "http://localhost:5000/warehouse/";

const WarehouseService = {
    getOneWarehouse: async (id) => {
        try {
            let response = await axios.get(url_get_one_warehouse + id);
            return response;
        } catch (error) {
            console.log(error);
        }
    },
    getAllWarehouse: async () => {
        try {
            let response = await axios.get(url_get_all_warehouse);
            return response;
        } catch (error) {
            console.log(error);
        }
    },
};

export default WarehouseService;
