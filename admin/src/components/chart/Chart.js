import "./chart.scss";
import {
    AreaChart,
    Area,
    XAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
} from "recharts";

import { useEffect, useState } from "react";

import OrderService from "../../services/OrderService";

// const data = [
//     { name: "January", Total: 0 },
//     { name: "February", Total: 0 },
//     { name: "March", Total: 0 },
//     { name: "April", Total: 0 },
//     { name: "May", Total: 0 },
//     { name: "June", Total: 0 },
//     { name: "July", Total: 0 },
//     { name: "August", Total: 0 },
//     { name: "September", Total: 0 },
//     { name: "October", Total: 0 },
//     { name: "November", Total: 0 },
//     { name: "December", Total: 1700000 },
// ];

const Chart = ({ aspect, title }) => {
    const [data, setData] = useState([
        { name: "Jan", Total: 0 },
        { name: "Feb", Total: 0 },
        { name: "Mar", Total: 0 },
        { name: "Apr", Total: 0 },
        { name: "May", Total: 0 },
        { name: "Jun", Total: 0 },
        { name: "Jul", Total: 0 },
        { name: "Aug", Total: 0 },
        { name: "Sep", Total: 0 },
        { name: "Oct", Total: 0 },
        { name: "Nov", Total: 0 },
        { name: "Dec", Total: "1.700" },
    ]);

    useEffect(() => {
        OrderService.getAllOrder()
            .then((res) => {
                console.log("dataChart[]:     ", res.data);
                let totalArr = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
                res.data.map((item) => {
                    let month = item.createdAt.split("-")[1];
                    if (month == "01") {
                        let money = String(item.totalPrice);
                        money = money.split("");
                        let result = "";
                        for (let i = 0; i < money.length - 4; i++) {
                            if (money[i] != ".") {
                                result = result.concat(money[i]);
                            }
                        }
                        totalArr[0] = totalArr[0] + Number(result);
                    } else if (month == "02") {
                        let money = String(item.totalPrice);
                        money = money.split("");
                        let result = "";
                        for (let i = 0; i < money.length - 4; i++) {
                            if (money[i] != ".") {
                                result = result.concat(money[i]);
                            }
                        }
                        totalArr[1] = totalArr[1] + Number(result);
                    } else if (month == "03") {
                        let money = String(item.totalPrice);
                        money = money.split("");
                        let result = "";
                        for (let i = 0; i < money.length - 4; i++) {
                            if (money[i] != ".") {
                                result = result.concat(money[i]);
                            }
                        }
                        totalArr[2] = totalArr[2] + Number(result);
                    } else if (month == "04") {
                        let money = String(item.totalPrice);
                        money = money.split("");
                        let result = "";
                        for (let i = 0; i < money.length - 4; i++) {
                            if (money[i] != ".") {
                                result = result.concat(money[i]);
                            }
                        }
                        totalArr[3] = totalArr[3] + Number(result);
                    } else if (month == "05") {
                        let money = String(item.totalPrice);
                        money = money.split("");
                        let result = "";
                        for (let i = 0; i < money.length - 4; i++) {
                            if (money[i] != ".") {
                                result = result.concat(money[i]);
                            }
                        }
                        totalArr[4] = totalArr[4] + Number(result);
                    } else if (month == "06") {
                        let money = String(item.totalPrice);
                        money = money.split("");
                        let result = "";
                        for (let i = 0; i < money.length - 4; i++) {
                            if (money[i] != ".") {
                                result = result.concat(money[i]);
                            }
                        }
                        totalArr[5] = totalArr[5] + Number(result);
                    } else if (month == "07") {
                        let money = String(item.totalPrice);
                        money = money.split("");
                        let result = "";
                        for (let i = 0; i < money.length - 4; i++) {
                            if (money[i] != ".") {
                                result = result.concat(money[i]);
                            }
                        }
                        totalArr[6] = totalArr[6] + Number(result);
                    } else if (month == "08") {
                        let money = String(item.totalPrice);
                        money = money.split("");
                        let result = "";
                        for (let i = 0; i < money.length - 4; i++) {
                            if (money[i] != ".") {
                                result = result.concat(money[i]);
                            }
                        }
                        totalArr[7] = totalArr[7] + Number(result);
                    } else if (month == "09") {
                        let money = String(item.totalPrice);
                        money = money.split("");
                        let result = "";
                        for (let i = 0; i < money.length - 4; i++) {
                            if (money[i] != ".") {
                                result = result.concat(money[i]);
                            }
                        }
                        totalArr[8] = totalArr[8] + Number(result);
                    } else if (month == "10") {
                        let money = String(item.totalPrice);
                        money = money.split("");
                        let result = "";
                        for (let i = 0; i < money.length - 4; i++) {
                            if (money[i] != ".") {
                                result = result.concat(money[i]);
                            }
                        }
                        totalArr[9] = totalArr[9] + Number(result);
                    } else if (month == "11") {
                        let money = String(item.totalPrice);
                        money = money.split("");
                        let result = "";
                        for (let i = 0; i < money.length - 4; i++) {
                            if (money[i] != ".") {
                                result = result.concat(money[i]);
                            }
                        }
                        totalArr[10] = totalArr[10] + Number(result);
                    } else if (month == "12") {
                        let money = String(item.totalPrice);
                        money = money.split("");
                        let result = "";
                        for (let i = 0; i < money.length - 4; i++) {
                            if (money[i] != ".") {
                                result = result.concat(money[i]);
                            }
                        }
                        totalArr[11] = totalArr[11] + Number(result);
                    }
                });
                let resultTotalPrice = totalArr.map((item) => {
                    return (item = Number(item) / 1000.0);
                });

                setData([
                    { name: "Jan", Total: resultTotalPrice[0] },
                    { name: "Feb", Total: resultTotalPrice[1] },
                    { name: "Mar", Total: resultTotalPrice[2] },
                    { name: "Apr", Total: resultTotalPrice[3] },
                    { name: "May", Total: resultTotalPrice[4] },
                    { name: "Jun", Total: resultTotalPrice[5] },
                    { name: "Jul", Total: resultTotalPrice[6] },
                    { name: "Aug", Total: resultTotalPrice[7] },
                    { name: "Sep", Total: resultTotalPrice[8] },
                    { name: "Oct", Total: resultTotalPrice[9] },
                    { name: "Nov", Total: resultTotalPrice[10] },
                    { name: "Dec", Total: resultTotalPrice[11] },
                ]);
            })
            .catch((error) => console.log(error));
    }, []);

    return (
        <div className="chart">
            <div className="title">{title}</div>
            <ResponsiveContainer width="100%" aspect={aspect}>
                <AreaChart
                    width={730}
                    height={250}
                    data={data}
                    margin={{ top: 10, right: 10, left: 0, bottom: 0 }}
                >
                    <defs>
                        <linearGradient id="total" x1="0" y1="0" x2="0" y2="1">
                            <stop
                                offset="5%"
                                stopColor="#8884d8"
                                stopOpacity={0.8}
                            />
                            <stop
                                offset="95%"
                                stopColor="#8884d8"
                                stopOpacity={0}
                            />
                        </linearGradient>
                    </defs>
                    <XAxis dataKey="name" stroke="gray" />
                    <CartesianGrid
                        strokeDasharray="3 3"
                        className="chartGrid"
                    />
                    <Tooltip />
                    <Area
                        type="monotone"
                        dataKey="Total"
                        stroke="#8884d8"
                        fillOpacity={1}
                        fill="url(#total)"
                    />
                </AreaChart>
            </ResponsiveContainer>
        </div>
    );
};

export default Chart;
