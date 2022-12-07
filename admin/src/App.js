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
                                    path=":productId"
                                    element={<DetailUser />}
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
                        </Route>
                    </Routes>
                </BrowserRouter>
            </Provider>
        </div>
    );
}

export default App;
