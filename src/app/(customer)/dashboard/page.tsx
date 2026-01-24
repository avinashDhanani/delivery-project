"use client";

import React from "react";
import Icon from "@/shared/icon";
import { topCards } from "@/constant/data.constant";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

/* ------------------ Chart Data ------------------ */
const reportData = [
  { time: "10am", sales: 55 },
  { time: "11am", sales: 30 },
  { time: "12am", sales: 58 },
  { time: "01am", sales: 35 },
  { time: "02am", sales: 22 },
  { time: "03am", sales: 48 },
  { time: "04am", sales: 12 },
  { time: "05am", sales: 28 },
  { time: "06am", sales: 35 },
  { time: "07am", sales: 68 },
  { time: "08am", sales: 56 },
  { time: "09am", sales: 74 },
];

/* ------------------ Tooltip ------------------ */
const CustomTooltip = ({ active, payload }: any) => {
  if (active && payload?.length) {
    return (
      <div className="bg-black text-white px-4 py-2 rounded-lg text-center">
        <p className="text-sm opacity-70">Sales</p>
        <p className="text-xl font-bold">
          {payload[0].value.toLocaleString()}
        </p>
      </div>
    );
  }
  return null;
};

/* ------------------ Chart ------------------ */
const ReportsChart = () => {
  return (
    <div className="h-[260px] w-full mx-auto">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={reportData}>
          <defs>
            <linearGradient id="lineGradient" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#5CB7FF" />
              <stop offset="100%" stopColor="#E55CFF" />
            </linearGradient>
          </defs>

          <XAxis
            dataKey="time"
            axisLine={false}
            tickLine={false}
            tick={{ fill: "#9CA3AF", fontSize: 12 }}
          />

          <YAxis
            axisLine={false}
            tickLine={false}
            tick={{ fill: "#9CA3AF", fontSize: 12 }}
          />

          <Tooltip content={<CustomTooltip />} />

          <Line
            type="monotone"
            dataKey="sales"
            stroke="url(#lineGradient)"
            strokeWidth={4}
            dot={{ r: 5, fill: "#000" }}
            activeDot={{ r: 7 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

/* ------------------ Dashboard ------------------ */
const CustomerDashboard = () => {
  const renderTopCard = () =>
    topCards.map((card, index) => (
      <div
        key={index}
        className="bg-white text-theme-black-200 h-[116px] flex items-center py-7 px-5 gap-4 rounded-[20px] hover:shadow-lg cursor-pointer"
      >
        <span
          className={`rounded-full flex items-center justify-center ${card.topCardIconBg} size-[60px] shrink-0 text-white`}
        >
          <Icon name={card.topCardIcon} className="size-6" />
        </span>

        <div>
          <span className="font-extrabold text-[26px] block">
            {card.topCardIconValue}
          </span>
          <h2 className="text-sm opacity-70">
            {card.topCardIconTitle}
          </h2>
        </div>
      </div>
    ));

  return (
    <div className="w-full flex flex-col gap-5">
      {/* Top Cards */}
      <div className="grid grid-cols-4 gap-5">
        {renderTopCard()}
      </div>

      {/* Reports */}
      <div className="grid grid-cols-3 gap-5">
        <div className="bg-white col-span-2 text-theme-black-200 h-[395px] p-5 rounded-[20px] hover:shadow-lg">
          <div className="flex items-center justify-between mb-4">
            <h4 className="text-theme-black-50 font-bold text-[22px]">
              Reports
            </h4>
          </div>

          <ReportsChart />
        </div>
      </div>
    </div>
  );
};

export default CustomerDashboard;