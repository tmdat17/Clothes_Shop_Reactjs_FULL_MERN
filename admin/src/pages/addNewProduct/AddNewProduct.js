import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";

import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const AddNewProduct = () => {
    const navigate = useNavigate();
    const user = useSelector((state) => state.auth.login?.currentUser);
    useEffect(() => {
        if (!user) {
            navigate("/login");
        }
    }, []);

    return (
        <div className="list">
            <Sidebar />
            <div className="listContainer">
                <Navbar />
                <button
                    className="btn btn-primary mx-2 my-3"
                    onClick={() => {
                        navigate("/products/new/");
                    }}
                >
                    Add Detail Product
                </button>
                <button
                    className="btn btn-primary mx-2 my-3"
                    onClick={() => {
                        navigate("/products/new/add_galery");
                    }}
                >
                    Add Galery
                </button>

                <Outlet />
            </div>
        </div>
    );
};

export default AddNewProduct;
