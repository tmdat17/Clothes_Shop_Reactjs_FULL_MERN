import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import ListUser from "./pages/listUser/ListUser";
import ListProduct from "./pages/listProduct/ListProduct";
import DetailUser from "./pages/detailUser/DetailUser";
import New from "./pages/new/New";
import DetailOrder from "./pages/detailOrder/DetailOrder";
import AddNewProduct from "./pages/addNewProduct/AddNewProduct";
import AddDetailProduct from "./pages/addDetailProduct/AddDetailProduct";
import AddGaleryProduct from "./pages/addGaleryProduct/AddGaleryProduct";
import EditProduct from "./pages/editProduct/EditProduct";
import Warehouse1 from "./pages/warehouse1/Warehouse1";
import Warehouse2 from "./pages/warehouse2/Warehouse2";
import Warehouse3 from "./pages/warehouse3/Warehouse3";
import Warehouse4 from "./pages/warehouse4/Warehouse4";

import { BrowserRouter, Routes, Route } from "react-router-dom";
import { productInputs, userInputs } from "./formSource";
import "./style/dark.scss";
import { useContext } from "react";
import { DarkModeContext } from "./context/darkModeContext";
import "bootstrap/dist/css/bootstrap.min.css";

import { Provider } from "react-redux";
import store from "./redux/store";

function App() {
    const { darkMode } = useContext(DarkModeContext);

    return (
        <div className={darkMode ? "app dark" : "app"}>
            <Provider store={store}>
                <BrowserRouter>
                    <Routes>
                        <Route path="home" element={<Home />} />
                        <Route path="/">
                            <Route index path="login" element={<Login />} />
                            <Route path="users">
                                <Route index element={<ListUser />} />
                                <Route
                                    path=":userId"
                                    element={<DetailUser />}
                                />
                                <Route
                                    path="new"
                                    element={
                                        <New
                                            inputs={userInputs}
                                            title="Add New User"
                                        />
                                    }
                                />
                            </Route>
                            <Route
                                path="order_detail/:orderId"
                                element={<DetailOrder />}
                            />
                            <Route path="products">
                                <Route index element={<ListProduct />} />
                                <Route
                                    path="edit/:productId"
                                    element={<EditProduct />}
                                />
                                <Route path="new" element={<AddNewProduct />}>
                                    <Route
                                        index
                                        element={<AddDetailProduct />}
                                    />
                                    <Route
                                        path="add_galery"
                                        element={<AddGaleryProduct />}
                                    />
                                </Route>
                            </Route>

                            <Route
                                path="warehouse_1"
                                element={<Warehouse1 />}
                            />
                            <Route
                                path="warehouse_2"
                                element={<Warehouse2 />}
                            />
                            <Route
                                path="warehouse_3"
                                element={<Warehouse3 />}
                            />
                            <Route
                                path="warehouse_4"
                                element={<Warehouse4 />}
                            />
                        </Route>
                    </Routes>
                </BrowserRouter>
            </Provider>
        </div>
    );
}

export default App;
