import React, { useState } from "react";
import { Line, Bar } from "react-chartjs-2";

const groupByDates = (data) => {
  const intRange = (start = 0, end = 0) => {
    const res = [];
    for (let count = start; count < end; count++) {
      res.push(count);
    }
    return res;
  };
  const get90DaysRange = () =>
    intRange(0, 30)
      .reverse()
      .map((d) => new Date(new Date().setDate(new Date().getDate() - d)));
  // this gives an object with dates as keys
  const groups = data.reduce((groups, game) => {
    const date = game.updatedAt.split("T")[0];
    if (!groups[date]) {
      groups[date] = 0;
    }
    groups[date]++;
    return groups;
  }, {});
  const range = get90DaysRange();

  return {
    labels: range.map((d) => d.toISOString().split("T")[0]),
    datasets: [
      {
        label: "Last 30 days Trips",
        fill: false,
        lineTension: 0.5,
        backgroundColor: "rgba(75,192,192,1)",
        borderColor: "rgba(0,0,0,1)",
        borderWidth: 2,
        data: range.map((d) => groups[d.toISOString().split("T")[0]] || 0),
      },
    ],
  };
};
export default ({ trips = [] }) => {
  if (!trips) return null;

  const [data] = useState(groupByDates(trips));

  if (!data) return null;

  return (
    <Line
      data={data}
      options={{
        title: {
          display: true,
          text: "Average Trip per month",
          fontSize: 20,
        },
        legend: {
          display: true,
          position: "right",
        },
      }}
    />
  );
};
