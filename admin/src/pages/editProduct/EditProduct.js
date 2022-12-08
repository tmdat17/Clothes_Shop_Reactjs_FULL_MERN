import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import { TextField, Checkbox } from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";

import ProductService from "../../services/ProductService";

function EditProduct() {
    const navigate = useNavigate();
    const { productId } = useParams();

    const user = useSelector((state) => state.auth.login?.currentUser);
    useEffect(() => {
        if (!user) {
            navigate("/login");
        }
    }, []);

    const [currentProduct, setCurrentProduct] = useState({});
    const [nameProduct, setNameProduct] = useState("");
    const [price, setPrice] = useState("");
    const [description, setDescription] = useState("");
    const [color, setColor] = useState("");
    const [thumbnailFront, setThumbnailFront] = useState("");
    const [thumbnailBack, setThumbnailBack] = useState("");
    const [warehouseID, setWareHouseID] = useState([]);
    const [size, setSize] = useState([]);
    const [message, setMessage] = useState("");
    console.log("size[]:  ", size);
    const warehouseValue = [
        "63459ca713cc1e002b864144",
        "6344485f9ed94eb9be950946",
        "6344487d9ed94eb9be950948",
        "634448dd9ed94eb9be95094a",
    ];
    const sizeValue = ["1", "2", "3", "4"];

    useEffect(() => {
        ProductService.getOneProduct(productId)
            .then((res) => {
                setCurrentProduct(res.data);
                setNameProduct(res.data.name_product);
                setPrice(res.data.price);
                setDescription(res.data.description);
                setColor(res.data.color);
                setThumbnailFront(res.data.thumbnail[0]);
                setThumbnailBack(res.data.thumbnail[1]);
            })
            .catch((error) => console.log(error));
    }, []);

    const handleEditProduct = (e) => {
        e.preventDefault();
        if (size.length == 0 && warehouseID.length == 0) {
            const productUpdate = {
                name_product: nameProduct,
                price: price,
                description: description,
                color: color,
                thumbnail: [thumbnailFront, thumbnailBack],
            };
            ProductService.updateOneProduct(productId, productUpdate)
                .then((res) => {
                    navigate("/products");
                })
                .catch((error) => console.log(error));
        } else if (size.length != 0 && warehouseID.length == 0) {
            const productUpdate = {
                name_product: nameProduct,
                price: price,
                description: description,
                color: color,
                thumbnail: [thumbnailFront, thumbnailBack],
                size: size,
            };
            ProductService.updateOneProduct(productId, productUpdate)
                .then((res) => {
                    navigate("/products");
                })
                .catch((error) => console.log(error));
        } else if (size.length == 0 && warehouseID.length != 0) {
            const productUpdate = {
                name_product: nameProduct,
                price: price,
                description: description,
                color: color,
                thumbnail: [thumbnailFront, thumbnailBack],
                warehouses: warehouseID,
            };
            ProductService.updateOneProduct(productId, productUpdate)
                .then((res) => {
                    navigate("/products");
                })
                .catch((error) => console.log(error));
        } else if (size.length != 0 && warehouseID.length != 0) {
            const productUpdate = {
                name_product: nameProduct,
                price: price,
                description: description,
                color: color,
                warehouses: warehouseID,
                thumbnail: [thumbnailFront, thumbnailBack],
                size: size,
            };
            ProductService.updateOneProduct(productId, productUpdate)
                .then((res) => {
                    navigate("/products");
                })
                .catch((error) => console.log(error));
        }
    };
    return (
        <div className="list">
            <Sidebar />
            <div className="listContainer">
                <Navbar />

                <h2 className="text-secondary mx-2 my-3">Edit Product</h2>
                <form onSubmit={handleEditProduct} className="ms-5 mt-3 ">
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
                    <div className="d-flex flex-start justify-content-center my-3">
                        <span
                            style={{ fontWeight: "bold", fontSize: "1.2rem" }}
                        >
                            Size hiện tại:
                        </span>
                        {currentProduct?.size?.map((item, index) => {
                            return <span className="mx-2 my-1">{item}</span>;
                        })}
                    </div>
                    <div className="d-flex justify-content-center my-3">
                        {sizeValue.map((item, index) => {
                            return (
                                <>
                                    <Checkbox
                                        onChange={(e) => {
                                            if (e.target.checked) {
                                                setSize((prev) => [
                                                    ...prev,
                                                    e.target.value,
                                                ]);
                                            } else {
                                                setSize(
                                                    size.filter(
                                                        (item) =>
                                                            item !==
                                                            e.target.value
                                                    )
                                                );
                                            }
                                        }}
                                        value={item}
                                        inputProps="aria-label"
                                        id={`size_${item}`}
                                    />
                                    <label
                                        htmlFor={`size_${item}`}
                                        className="py-3 pe-5 ps-1"
                                    >
                                        {`Size ${item}`}
                                    </label>
                                </>
                            );
                        })}
                    </div>
                    <div className="d-flex flex-start justify-content-center my-3">
                        <span
                            style={{ fontWeight: "bold", fontSize: "1.2rem" }}
                        >
                            Warehouse hiện tại:
                        </span>
                        {currentProduct?.warehouses?.map((item, index) => {
                            console.log("item._id:   ", item._id);
                            if (item._id == "63459ca713cc1e002b864144") {
                                return <span className="mx-2 my-1">1</span>;
                            } else if (item._id == "6344485f9ed94eb9be950946") {
                                return <span className="mx-2 my-1">2</span>;
                            } else if (item._id == "6344487d9ed94eb9be950948") {
                                return <span className="mx-2 my-1">3</span>;
                            } else return <span className="mx-2 my-1">4</span>;
                        })}
                    </div>
                    <div className="d-flex justify-content-center my-3">
                        {warehouseValue.map((item, index) => {
                            return (
                                <>
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
                                                        (item) =>
                                                            item !==
                                                            e.target.value
                                                    )
                                                );
                                            }
                                        }}
                                        value={item}
                                        inputProps="aria-label"
                                        id={`warehouse_${index + 1}:`}
                                    />
                                    <label
                                        htmlFor={`warehouse_${index + 1}:`}
                                        className="py-3 pe-5 ps-1"
                                    >
                                        {`Warehouse ${index + 1}:`}
                                    </label>
                                </>
                            );
                        })}
                    </div>
                    <div className="d-flex justify-content-center my-3">
                        <button className="btn btn-primary">
                            Edit Product
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default EditProduct;
