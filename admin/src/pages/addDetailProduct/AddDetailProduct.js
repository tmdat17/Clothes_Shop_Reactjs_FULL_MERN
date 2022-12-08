import "./addDetailProduct.scss";
import { TextField, Checkbox } from "@mui/material";
import { useState, useEffect } from "react";

import CategoryService from "../../services/CategoryService";
import ProductService from "../../services/ProductService";
function AddDetailProduct() {
    const [nameProduct, setNameProduct] = useState("");
    const [price, setPrice] = useState("");
    const [description, setDescription] = useState("");
    const [color, setColor] = useState("");
    const [thumbnailFront, setThumbnailFront] = useState("");
    const [thumbnailBack, setThumbnailBack] = useState("");
    const [selectedCategory, setSelectedCategory] =
        useState("Select Category!!");
    const [size, setSize] = useState([]);
    const [warehouseID, setWareHouseID] = useState([]);

    const [listCategory, setListCategory] = useState([]);
    const [newProductID, setNewProductID] = useState(0);
    const [message, setMessage] = useState("");

    useEffect(() => {
        let getData = CategoryService.getAllCategory;
        getData()
            .then((res) => {
                console.log("category:   ", res.data);
                setListCategory(res.data);
            })
            .catch((error) => console.log(error));
    }, []);

    useEffect(() => {
        let getData = ProductService.getAllProduct;
        getData()
            .then((res) => {
                let length = res.data.length;
                let newID = length + 1;
                setNewProductID(newID);
            })
            .catch((error) => console.log(error));
    }, [nameProduct]);

    const changeCategory = (e) => {
        setSelectedCategory(e.target.value);
    };

    const handleAddProduct = async (e) => {
        e.preventDefault();
        if (size.length == 0 || warehouseID.length == 0) {
            let msg;
            msg = "size và warehouse không được để trống!!";
            setMessage(msg);
            return;
        }
        const newProduct = {
            product_id: newProductID,
            name_product: nameProduct,
            price: price,
            description: description,
            color: color,
            warehouses: warehouseID,
            category: selectedCategory,
            thumbnail: [thumbnailFront, thumbnailBack],
            size: size,
        };
        ProductService.addNewProduct(newProduct)
            .then((res) => {
                let msg;
                msg = "Thêm sản phẩm thành công!!";
                setMessage(msg);

                setNameProduct("");
                setPrice("");
                setDescription("");
                setColor("");
                setThumbnailFront("");
                setThumbnailBack("");
                setSize([]);
                setWareHouseID([]);
            })
            .catch((error) => console.log(error));
    };

    return (
        <>
            <h2 className="text-secondary">Add Detail Product</h2>
            <h5 className="text-danger text-center">{message}</h5>
            <form onSubmit={handleAddProduct} className="ms-5 mt-3 ">
                <div className="d-flex justify-content-center my-3">
                    <TextField
                        style={{ width: "35rem" }}
                        className=""
                        value={nameProduct}
                        placeholder="Ao Levent"
                        id="outlined-basic"
                        label="Name Product:"
                        variant="outlined"
                        onChange={(e) => setNameProduct(e.target.value)}
                        required={true}
                    />
                </div>
                <div className="d-flex justify-content-center my-3">
                    <TextField
                        style={{ width: "35rem" }}
                        className=""
                        value={price}
                        placeholder="180.000 vnd"
                        id="outlined-basic"
                        label="Price:"
                        variant="outlined"
                        onChange={(e) => setPrice(e.target.value)}
                        required={true}
                    />
                </div>
                <div className="d-flex justify-content-center my-3">
                    <TextField
                        id="outlined-multiline-static"
                        label="Description:"
                        multiline
                        value={description}
                        rows={4}
                        style={{ width: "35rem" }}
                        onChange={(e) => setDescription(e.target.value)}
                        required={true}
                    />
                </div>
                <div className="d-flex justify-content-center my-3">
                    <TextField
                        style={{ width: "35rem" }}
                        className=""
                        value={color}
                        id="outlined-basic"
                        label="Color:"
                        variant="outlined"
                        onChange={(e) => setColor(e.target.value)}
                        required={true}
                    />
                </div>
                <div className="d-flex justify-content-center my-3">
                    <TextField
                        style={{ width: "35rem" }}
                        className=""
                        value={thumbnailFront}
                        id="outlined-basic"
                        label="Thumbnail front:"
                        variant="outlined"
                        onChange={(e) => setThumbnailFront(e.target.value)}
                        required={true}
                    />
                </div>
                <div className="d-flex justify-content-center my-3">
                    <TextField
                        style={{ width: "35rem" }}
                        className=""
                        value={thumbnailBack}
                        id="outlined-basic"
                        label="Thumbnail back:"
                        variant="outlined"
                        onChange={(e) => setThumbnailBack(e.target.value)}
                        required={true}
                    />
                </div>
                <div className="d-flex justify-content-center my-4">
                    <select
                        required={true}
                        defaultValue=""
                        style={{ width: "35rem" }}
                        onClick={(e) => changeCategory(e)}
                    >
                        {listCategory?.map((item, index) => {
                            return (
                                <option key={index} value={item._id}>
                                    {item.type_product}
                                </option>
                            );
                        })}
                    </select>
                </div>
                <div className="d-flex justify-content-center my-3">
                    <Checkbox
                        onChange={(e) => {
                            if (e.target.checked) {
                                setSize((prev) => [...prev, e.target.value]);
                            } else {
                                setSize(
                                    size.filter(
                                        (item) => item !== e.target.value
                                    )
                                );
                            }
                        }}
                        value="1"
                        inputProps="aria-label"
                        id="size_1"
                    />
                    <label htmlFor="size_1" className="py-3 pe-5 ps-1">
                        Size 1:
                    </label>
                    <Checkbox
                        onChange={(e) => {
                            if (e.target.checked) {
                                setSize((prev) => [...prev, e.target.value]);
                            } else {
                                setSize(
                                    size.filter(
                                        (item) => item !== e.target.value
                                    )
                                );
                            }
                        }}
                        value="2"
                        inputProps="aria-label"
                        id="size_2"
                    />
                    <label htmlFor="size_2" className="py-3 pe-5 ps-1">
                        Size 2:
                    </label>
                    <Checkbox
                        onChange={(e) => {
                            if (e.target.checked) {
                                setSize((prev) => [...prev, e.target.value]);
                            } else {
                                setSize(
                                    size.filter(
                                        (item) => item !== e.target.value
                                    )
                                );
                            }
                        }}
                        value="3"
                        inputProps="aria-label"
                        id="size_3"
                    />
                    <label htmlFor="size_3" className="py-3 pe-5 ps-1">
                        Size 3:
                    </label>
                    <Checkbox
                        onChange={(e) => {
                            if (e.target.checked) {
                                setSize((prev) => [...prev, e.target.value]);
                            } else {
                                setSize(
                                    size.filter(
                                        (item) => item !== e.target.value
                                    )
                                );
                            }
                        }}
                        value="4"
                        inputProps="aria-label"
                        id="size_4"
                    />
                    <label htmlFor="size_4" className="py-3 pe-5 ps-1">
                        Size 4:
                    </label>
                </div>
                <div className="d-flex justify-content-center my-3">
                    <Checkbox
                        onChange={(e) => {
                            if (e.target.checked) {
                                setWareHouseID((prev) => [
                                    ...prev,
                                    e.target.value,
                                ]);
                            } else {
                                setWareHouseID(
                                    warehouseID.filter(
                                        (item) => item !== e.target.value
                                    )
                                );
                            }
                        }}
                        value="63459ca713cc1e002b864144"
                        inputProps="aria-label"
                        id="warehouse_1"
                    />
                    <label htmlFor="warehouse_1" className="py-3 pe-5 ps-1">
                        Warehouse 1:
                    </label>
                    <Checkbox
                        onChange={(e) => {
                            if (e.target.checked) {
                                setWareHouseID((prev) => [
                                    ...prev,
                                    e.target.value,
                                ]);
                            } else {
                                setWareHouseID(
                                    warehouseID.filter(
                                        (item) => item !== e.target.value
                                    )
                                );
                            }
                        }}
                        value="6344485f9ed94eb9be950946"
                        inputProps="aria-label"
                        id="warehouse_2"
                    />
                    <label htmlFor="warehouse_2" className="py-3 pe-5 ps-1">
                        Warehouse 2:
                    </label>
                    <Checkbox
                        onChange={(e) => {
                            if (e.target.checked) {
                                setWareHouseID((prev) => [
                                    ...prev,
                                    e.target.value,
                                ]);
                            } else {
                                setWareHouseID(
                                    warehouseID.filter(
                                        (item) => item !== e.target.value
                                    )
                                );
                            }
                        }}
                        value="6344487d9ed94eb9be950948"
                        inputProps="aria-label"
                        id="warehouse_3"
                    />
                    <label htmlFor="warehouse_3" className="py-3 pe-5 ps-1">
                        Warehouse 3:
                    </label>
                    <Checkbox
                        onChange={(e) => {
                            if (e.target.checked) {
                                setWareHouseID((prev) => [
                                    ...prev,
                                    e.target.value,
                                ]);
                            } else {
                                setWareHouseID(
                                    warehouseID.filter(
                                        (item) => item !== e.target.value
                                    )
                                );
                            }
                        }}
                        value="634448dd9ed94eb9be95094a"
                        inputProps="aria-label"
                        id="warehouse_4"
                    />
                    <label htmlFor="warehouse_4" className="py-3 pe-5 ps-1">
                        Warehouse 4:
                    </label>
                </div>

                <div className="d-flex justify-content-center my-3">
                    <button className="btn btn-primary">Add Product</button>
                </div>
            </form>
        </>
    );
}

export default AddDetailProduct;
