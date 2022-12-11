import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import "./home.scss";
import Widget from "../../components/widget/Widget";
import Featured from "../../components/featured/Featured";
import Chart from "../../components/chart/Chart";
import ChartForYear from "../../components/chartForYear/ChartForYear";
import Table from "../../components/table/Table";
import OrderService from "../../services/OrderService";
import helper from "../../helpers";

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const Home = () => {
    const navigate = useNavigate();
    const user = useSelector((state) => state.auth.login?.currentUser);
    useEffect(() => {
        if (!user) {
            navigate("/login");
        }
    }, []);

    const [revenueToday, setRevenueToday] = useState(0);
    useEffect(() => {
        OrderService.getAllOrder()
            .then((res) => {
                const today = new Date();

                let year = String(today).split(" ")[3];
                let month = String(today).split(" ")[1];
                if (month === "Jan") {
                    month = "01";
                } else if (month === "Feb") {
                    month = "02";
                } else if (month === "Mar") {
                    month = "03";
                } else if (month === "Apr") {
                    month = "04";
                } else if (month === "May") {
                    month = "05";
                } else if (month === "Jun") {
                    month = "06";
                } else if (month === "Jul") {
                    month = "07";
                } else if (month === "Aug") {
                    month = "08";
                } else if (month === "Sep") {
                    month = "09";
                } else if (month === "Oct") {
                    month = "10";
                } else if (month === "Nov") {
                    month = "11";
                } else if (month === "Dec") {
                    month = "12";
                }
                let day = String(today).split(" ")[2];
                let dateResult = "";
                dateResult = dateResult
                    .concat(year)
                    .concat("-")
                    .concat(month)
                    .concat("-")
                    .concat(day);

                let totalPriceToday = 0;
                res.data.map((item) => {
                    let dateAPI = item.createdAt.split("T")[0];
                    if (dateResult === dateAPI) {
                        let money = String(item.totalPrice);
                        money = money.split("");
                        let result = "";
                        for (let i = 0; i < money.length - 4; i++) {
                            if (money[i] != ".") {
                                result = result.concat(money[i]);
                            }
                        }
                        totalPriceToday = totalPriceToday + Number(result);
                    }
                });
                setRevenueToday(totalPriceToday);
            })

            .catch((error) => console.log(error));
    });

    const [typeRadioYear, setTypeRadioYear] = useState(true);
    const [typeRadioMonth, setTypeRadioMonth] = useState(false);
    const [selectYear, setSelectYear] = useState("2022");
    const [selectMonth, setSelectMonth] = useState("01");
    return (
        <div className="home">
            <Sidebar />
            <div className="homeContainer">
                <Navbar />
                <div className="widgets">
                    <Widget type="user" />
                    <Widget type="order" />
                    <Widget type="product" />
                    <Widget type="warehouse" />
                </div>
                <div className="charts">
                    {/* <Featured /> */}
                    <div className="featured">
                        <div className="top">
                            <h1 className="title">Total Revenue</h1>
                        </div>
                        <div className="bottom">
                            <p className="title">Total sales made today</p>
                            <p className="amount">
                                {helper.formatProductPrice(revenueToday)}
                            </p>

                            <div className="summary">
                                <div className="wrapperChooseRevenue">
                                    <input
                                        name="chooseRevenue"
                                        type="radio"
                                        id="year"
                                        onChange={() => {
                                            setTypeRadioYear(!typeRadioYear);
                                            setTypeRadioMonth(!typeRadioMonth);
                                        }}
                                        checked={typeRadioYear}
                                    />
                                    <label
                                        htmlFor="year"
                                        style={{ marginLeft: "10px" }}
                                    >
                                        Revenue for years
                                    </label>
                                </div>
                                <div
                                    className="wrapperChooseRevenue"
                                    style={{ marginTop: "0.5rem" }}
                                >
                                    <input
                                        name="chooseRevenue"
                                        type="radio"
                                        id="month"
                                        onChange={() => {
                                            setTypeRadioYear(!typeRadioYear);
                                            setTypeRadioMonth(!typeRadioMonth);
                                        }}
                                        checked={typeRadioMonth}
                                    />
                                    <label
                                        htmlFor="month"
                                        style={{
                                            marginLeft: "10px",
                                        }}
                                    >
                                        Revenue for days of month
                                    </label>
                                    <select
                                        required={true}
                                        defaultValue=""
                                        style={{
                                            width: "10rem",
                                            display: "block",
                                            marginBottom: "10px",
                                        }}
                                        disabled={!typeRadioMonth}
                                        onClick={(e) => {
                                            console.log(
                                                "option:   ",
                                                e.target.value
                                            );
                                            setSelectYear(e.target.value);
                                        }}
                                    >
                                        <option
                                            className="d-flex justify-content-between"
                                            value=""
                                        >
                                            Choose Year
                                        </option>
                                        <option
                                            className="d-flex justify-content-between"
                                            value="2018"
                                        >
                                            2018
                                        </option>
                                        <option
                                            className="d-flex justify-content-between"
                                            value="2019"
                                        >
                                            2019
                                        </option>
                                        <option
                                            className="d-flex justify-content-between"
                                            value="2020"
                                        >
                                            2020
                                        </option>
                                        <option
                                            className="d-flex justify-content-between"
                                            value="2021"
                                        >
                                            2021
                                        </option>
                                        <option
                                            className="d-flex justify-content-between"
                                            value="2022"
                                        >
                                            2022
                                        </option>
                                    </select>
                                    <select
                                        required={true}
                                        defaultValue=""
                                        style={{
                                            width: "10rem",
                                            display: "block",
                                        }}
                                        disabled={!typeRadioMonth}
                                        onClick={(e) => {
                                            console.log(
                                                "option:   ",
                                                e.target.value
                                            );
                                            setSelectMonth(e.target.value);
                                        }}
                                    >
                                        <option
                                            className="d-flex justify-content-between"
                                            value=""
                                        >
                                            Choose Month
                                        </option>
                                        <option
                                            className="d-flex justify-content-between"
                                            value="01"
                                        >
                                            January
                                        </option>
                                        <option
                                            className="d-flex justify-content-between"
                                            value="02"
                                        >
                                            February
                                        </option>
                                        <option
                                            className="d-flex justify-content-between"
                                            value="03"
                                        >
                                            March
                                        </option>
                                        <option
                                            className="d-flex justify-content-between"
                                            value="04"
                                        >
                                            April
                                        </option>
                                        <option
                                            className="d-flex justify-content-between"
                                            value="05"
                                        >
                                            May
                                        </option>
                                        <option
                                            className="d-flex justify-content-between"
                                            value="06"
                                        >
                                            June
                                        </option>
                                        <option
                                            className="d-flex justify-content-between"
                                            value="07"
                                        >
                                            July
                                        </option>
                                        <option
                                            className="d-flex justify-content-between"
                                            value="08"
                                        >
                                            August
                                        </option>
                                        <option
                                            className="d-flex justify-content-between"
                                            value="09"
                                        >
                                            September
                                        </option>
                                        <option
                                            className="d-flex justify-content-between"
                                            value="10"
                                        >
                                            October
                                        </option>
                                        <option
                                            className="d-flex justify-content-between"
                                            value="11"
                                        >
                                            November
                                        </option>
                                        <option
                                            className="d-flex justify-content-between"
                                            value="12"
                                        >
                                            December
                                        </option>
                                    </select>
                                </div>
                            </div>
                        </div>
                    </div>
                    {typeRadioYear ? (
                        <ChartForYear
                            title="Last 5 Year (Revenue)"
                            aspect={2 / 1}
                        />
                    ) : (
                        <Chart
                            title={`These days in ${selectMonth} ${selectYear} (Revenue)`}
                            aspect={2 / 1}
                            monthProp={selectMonth}
                            yearProp={selectYear}
                        />
                    )}
                </div>
                <div className="listContainer">
                    <div className="listTitle">Latest Transactions</div>
                    <Table />
                </div>
            </div>
        </div>
    );
};

export default Home;
