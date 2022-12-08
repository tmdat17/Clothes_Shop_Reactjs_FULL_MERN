import "./addGaleryProduct.scss";
import { TextField, Checkbox, InputLabel } from "@mui/material";
import { useState, useEffect } from "react";
import ProductService from "../../services/ProductService";
import GaleryService from "../../services/GaleryService";

function AddGaleryProduct() {
    const [listProducts, setListProducts] = useState([]);
    const [urlGalery, setUrlGalery] = useState("");
    const [productID, setProductID] = useState("");
    const [message, setMessage] = useState("");
    const [newGaleryID, setNewGaleryID] = useState(0);
    useEffect(() => {
        let getData = ProductService.getAllProduct;
        getData()
            .then((res) => {
                setListProducts(res.data);
            })
            .catch((error) => console.log(error));
    }, []);

    const changeProduct = (e) => {
        setProductID(e.target.value);
    };

    useEffect(() => {
        let getData = GaleryService.getAllGalery;
        getData()
            .then((res) => {
                let length = res.data.length;
                let newID = length + 1;
                setNewGaleryID(newID);
            })
            .catch((error) => console.log(error));
    }, [urlGalery]);

    const handleAddGalery = (e) => {
        e.preventDefault();
        if (urlGalery == "") {
            let msg;
            msg = "URL Galery không được trống!";
            setMessage(msg);
            return;
        } else if (productID == "") {
            let msg;
            msg = "Chưa chọn Name Product!";
            setMessage(msg);
            return;
        }
        const newGalery = {
            galery_id: newGaleryID,
            image_url: urlGalery,
            product: productID,
        };
        GaleryService.addNewGalery(newGalery)
            .then((res) => {
                let msg;
                msg = "Thêm galery cho product thành công!!";
                setMessage(msg);
                setUrlGalery("");
                setProductID("");
            })
            .catch((error) => console.log(error));
    };

    return (
        <>
            <h2 className="text-secondary">Add Galery Product</h2>
            <h5 className="text-danger text-center">{message}</h5>
            <form onSubmit={handleAddGalery}>
                <label style={{ marginLeft: "24rem" }}>
                    ID Product: {productID}
                </label>
                <div className="d-flex justify-content-center my-4">
                    <select
                        required={true}
                        defaultValue=""
                        style={{ width: "35rem" }}
                        onClick={(e) => changeProduct(e)}
                    >
                        {listProducts?.map((item, index) => {
                            return (
                                <>
                                    <option
                                        className="d-flex justify-content-between"
                                        key={index}
                                        value={item._id}
                                    >
                                        {item.name_product}
                                    </option>
                                </>
                            );
                        })}
                    </select>
                </div>
                <div className="d-flex justify-content-center my-4">
                    <TextField
                        style={{ width: "35rem" }}
                        className=""
                        value={urlGalery}
                        id="outlined-basic"
                        label="URL Galery:"
                        variant="outlined"
                        onChange={(e) => setUrlGalery(e.target.value)}
                    />
                </div>
                <div className="d-flex justify-content-center my-3">
                    <button className="btn btn-primary">Add Galery</button>
                </div>
            </form>
        </>
    );
}

export default AddGaleryProduct;
