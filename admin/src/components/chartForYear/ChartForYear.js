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

const ChartForYear = ({ aspect, title }) => {
    const [data, setData] = useState([
        { name: "2018", Total: 0 },
        { name: "2019", Total: 0 },
        { name: "2020", Total: 0 },
        { name: "2021", Total: 0 },
        { name: "2022", Total: 0 },
    ]);

    useEffect(() => {
        OrderService.getAllOrder()
            .then((res) => {
                console.log("dataChart[]:     ", res.data);
                let totalArr = [0, 0, 0, 0, 0];
                res.data.map((item) => {
                    let year = item.createdAt.split("-")[0];
                    console.log("year:   ", year);
                    if (year === "2018") {
                        let money = String(item.totalPrice);
                        money = money.split("");
                        let result = "";
                        for (let i = 0; i < money.length - 4; i++) {
                            if (money[i] != ".") {
                                result = result.concat(money[i]);
                            }
                        }
                        totalArr[0] = totalArr[0] + Number(result);
                    } else if (year === "2019") {
                        let money = String(item.totalPrice);
                        money = money.split("");
                        let result = "";
                        for (let i = 0; i < money.length - 4; i++) {
                            if (money[i] != ".") {
                                result = result.concat(money[i]);
                            }
                        }
                        totalArr[1] = totalArr[1] + Number(result);
                    } else if (year === "2020") {
                        let money = String(item.totalPrice);
                        money = money.split("");
                        let result = "";
                        for (let i = 0; i < money.length - 4; i++) {
                            if (money[i] != ".") {
                                result = result.concat(money[i]);
                            }
                        }
                        totalArr[2] = totalArr[2] + Number(result);
                    } else if (year === "2021") {
                        let money = String(item.totalPrice);
                        money = money.split("");
                        let result = "";
                        for (let i = 0; i < money.length - 4; i++) {
                            if (money[i] != ".") {
                                result = result.concat(money[i]);
                            }
                        }
                        totalArr[3] = totalArr[3] + Number(result);
                    } else if (year === "2022") {
                        let money = String(item.totalPrice);
                        money = money.split("");
                        let result = "";
                        for (let i = 0; i < money.length - 4; i++) {
                            if (money[i] != ".") {
                                result = result.concat(money[i]);
                            }
                        }
                        totalArr[4] = totalArr[4] + Number(result);
                    }
                });
                console.log("for Year:   ", totalArr);
                let resultTotalPrice = totalArr.map((item) => {
                    return (item = Number(item) / 1000.0);
                });
                setData([
                    { name: "2018", Total: resultTotalPrice[0] },
                    { name: "2019", Total: resultTotalPrice[1] },
                    { name: "2020", Total: resultTotalPrice[2] },
                    { name: "2021", Total: resultTotalPrice[3] },
                    { name: "2022", Total: resultTotalPrice[4] },
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

export default ChartForYear;
