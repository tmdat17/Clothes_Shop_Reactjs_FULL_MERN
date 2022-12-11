import "./chart.scss";
import _ from "lodash";
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

const Chart = ({ aspect, title, monthProp, yearProp }) => {
    const [data, setData] = useState([]);
    useEffect(() => {
        OrderService.getAllOrder()
            .then((res) => {
                // console.log("dataChart[]:     ", res.data);

                let monthCheck;
                let flag = 1; //flag=1 la nam nhuan (leap year)
                if (Number(yearProp) % 4 == 0) {
                    if (Number(yearProp) % 100 == 0) {
                        if (Number(yearProp) % 400 == 0) {
                            flag = 1;
                        } else flag = 0;
                    } else flag = 1;
                } else flag = 0;
                let month31days = ["01", "03", "05", "07", "08", "10", "12"];
                let month30days = ["04", "06", "09", "11"];
                if (month31days.includes(monthProp)) {
                    monthCheck = 31;
                } else if (month30days.includes(monthProp)) {
                    monthCheck = 30;
                } else if (flag == 1 && monthProp == "02") {
                    monthCheck = 29;
                } else if (flag == 0 && monthProp == "02") {
                    monthCheck = 28;
                }
                let days = [];
                for (let t = 1; t <= monthCheck; t++) {
                    if (t >= 1 && t <= 9) {
                        let d = "";
                        d = d.concat("0").concat(String(t));
                        days.push({ name: d, Total: 0 });
                    } else {
                        days.push({ name: String(t), Total: 0 });
                    }
                }
                console.log("day[]:     ", days);

                res.data.map((item) => {
                    let year = item.createdAt.split("-")[0];
                    let month = item.createdAt.split("-")[1];
                    let day = item.createdAt.split("T")[0].split("-")[2];
                    // console.log("flag:    ", flag);
                    // console.log("monthcheck res.data.map:   ", monthCheck);
                    // console.log("dayAPI:    ", day);
                    const daysIndex = _.findIndex(days, { name: day });
                    if (
                        monthProp === month &&
                        yearProp === year &&
                        daysIndex !== -1
                    ) {
                        let money = String(item.totalPrice);
                        money = money.split("");
                        let result = "";
                        for (let i = 0; i < money.length - 4; i++) {
                            if (money[i] != ".") {
                                result = result.concat(money[i]);
                            }
                        }
                        let tempTotal = days[daysIndex].Total;
                        tempTotal = tempTotal + Number(result);
                        // console.log("tempTotal:   ", tempTotal);
                        days[daysIndex] = {
                            name: day,
                            Total: tempTotal,
                        };
                    }
                });
                console.log("day[] after excute:     ", days);

                // let resultTotalPrice = totalArr.map((item) => {
                //     return (item = Number(item) / 1000.0);
                // });
                setData(days);
            })
            .catch((error) => console.log(error));
    }, [monthProp, yearProp]);

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
