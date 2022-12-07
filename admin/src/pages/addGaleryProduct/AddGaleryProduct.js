import "./addGaleryProduct.scss";
import { TextField, Checkbox, InputLabel } from "@mui/material";
import { useState, useEffect } from "react";
import ProductService from "../../services/ProductService";

function AddGaleryProduct() {
    const [listProducts, setListProducts] = useState([]);
    const [urlGalery, setUrlGalery] = useState("");
    useEffect(() => {
        let getData = ProductService.getAllProduct;
        getData()
            .then((res) => {
                console.log("product:   ", res.data);
                setListProducts(res.data);
            })
            .catch((error) => console.log(error));
    }, []);
    console.log("listProducts:   ", listProducts);
    return (
        <>
            <h2 className="text-secondary">Add Galery Product</h2>
            <form>
                <div className="d-flex justify-content-center my-4">
                    <label className="me-3 mt-3">Name Product</label>
                    <select
                        required={true}
                        defaultValue=""
                        style={{ width: "35rem" }}
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
                        label="Thumbnail back:"
                        variant="outlined"
                        onChange={(e) => setUrlGalery(e.target.value)}
                    />
                </div>
            </form>
        </>
    );
}

export default AddGaleryProduct;
