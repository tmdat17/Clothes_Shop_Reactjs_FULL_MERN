import axios from "axios";

const url_get_one_order = "http://localhost:5000/order/";

const OrderService = {
    getOneOrder: async (id) => {
        try {
            let response = await axios.get(url_get_one_order + id);
            return response;
        } catch (error) {
            console.log(error);
        }
    },
};

export default OrderService;
