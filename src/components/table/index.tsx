"use client";

import Icon from "@/shared/icon";
import React, { useState } from "react";

export type Column<T> = {
  key: keyof T | "action";
  label: string;
  render?: (row: T) => React.ReactNode;
};

type Props<T> = {
  columns: Column<T>[];
  data: T[];
};

export default function CustomTable<T extends { id: number | string }>({
  columns,
  data,
}: Props<T>) {
  const [page, setPage] = useState(1);
  const pageSize = 10;

  const totalPages = Math.ceil(data.length / pageSize);
  const pageData = data.slice((page - 1) * pageSize, page * pageSize);

  return (
    <div className="flex flex-col flex-grow overflow-hidden gap-2.5">
      <div className="grow flex flex-col overflow-hidden">
        {/* HEADER (STICKY) */}
        <div
          className="grid"
          style={{ gridTemplateColumns: `repeat(${columns.length}, 1fr)` }}
        >
          {columns.map((col) => (
            <div
              key={String(col.key)}
              className="px-4 py-3 text-sm font-semibold text-white"
            >
              <Icon name="filter-icon" className="w-3 inline-block mr-1" />
              {col.label}
            </div>
          ))}
        </div>

        {/* BODY (SCROLLABLE) */}
        <div className="rounded-xl bg-white grow overflow-auto custom-scrollbar">
          {pageData.map((row) => (
            <div
              key={row.id}
              className="border-b last:border-0 hover:bg-gray-50"
            >
              <div
                className="grid"
                style={{
                  gridTemplateColumns: `repeat(${columns.length}, 1fr)`,
                }}
              >
                {columns.map((col) => (
                  <div
                    key={String(col.key)}
                    className="px-4 py-2 text-sm flex items-center"
                  >
                    {col.render
                      ? col.render(row)
                      : (row[col.key as keyof T] as React.ReactNode)}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* PAGINATION */}
      <div className="flex items-center justify-center gap-1.5 shrink-0">
        <button
          onClick={() => setPage((p) => Math.max(1, p - 1))}
          disabled={page === 1}
          className="rounded py-2 px-3 h-9 bg-white flex items-center justify-center text-center cursor-pointer text-sm gap-1 hover:bg-gray-100 disabled:opacity-50"
        >
          <Icon name="chevron-left" className="w-4" />
          Back
        </button>

        {Array.from({ length: totalPages }).map((_, i) => (
          <button
            key={i}
            onClick={() => setPage(i + 1)}
            className={`rounded min-w-9 py-2 px-3 h-9 flex items-center justify-center text-center cursor-pointer text-sm disabled:opacity-50 ${
              page === i + 1
                ? "bg-theme-purple-00 hover:bg-theme-purple-50 text-white"
                : "bg-white hover:bg-gray-100"
            }`}
          >
            {i + 1}
          </button>
        ))}

        <button
          onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
          disabled={page === totalPages}
          className="rounded py-2 px-3 h-9 bg-white flex items-center justify-center text-center gap-1 cursor-pointer text-sm hover:bg-gray-100 disabled:opacity-50"
        >
          Next
          <Icon name="chevron-left" className="w-4 rotate-180" />
        </button>
      </div>
    </div>
  );
}
