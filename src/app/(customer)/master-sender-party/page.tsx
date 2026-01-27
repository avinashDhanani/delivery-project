"use client";

import React, { useState } from "react";
import NodataFound from "@/components/nodata";
import CustomTable, { Column } from "@/components/table";
import Image from "next/image";
import Tippy from "@tippyjs/react";

type Sender = {
  id: number;
  name: string;
  email: string;
  address: string;
  phone1: string;
  phone2: string;
};

const columns: Column<Sender>[] = [
  { key: "name", label: "Sender name" },
  { key: "email", label: "Email" },
  { key: "address", label: "Address" },
  { key: "phone1", label: "Phone Number 01" },
  { key: "phone2", label: "Phone Number 02" },
  {
    key: "action",
    label: "Action",
    render: () => (
      <div className="flex gap-2">
        <Tippy content="Pdf" theme="dark">
          <button className="p-1 cursor-pointer">
            <Image
              className="w-4"
              src={"/assets/images/svg/pdf-icon.svg"}
              width={14}
              height={18}
              alt="img"
            ></Image>
          </button>
        </Tippy>
        <Tippy content="Xl Sheet" theme="dark">
          <button className="p-1 cursor-pointer">
            <Image
              className="w-4"
              src={"/assets/images/svg/xl-sheet.svg"}
              width={14}
              height={18}
              alt="img"
            ></Image>
          </button>
        </Tippy>
      </div>
    ),
  },
];

const senderPartyData = Array.from({ length: 20 }, (_, i) => ({
  id: i,
  name: "Arorra gaur",
  email: "arorragaur@gmail.com",
  address: "23, Kadodra Street, Dubai",
  phone1: "+91 956 956 2653",
  phone2: "+91 956 956 2653",
}));

const MasterSenderParty = () => {
  // if data length === 0 → show NoDataFound
  const [tableData] = useState(senderPartyData);

  return (
    <>
      {tableData.length > 0 ? (
        <CustomTable columns={columns} data={tableData} />
      ) : (
        <NodataFound
          title="No Sender Found?"
          subTitle="There is no available data to show. Please choose different and try again."
          btnText="Create New Sender Party"
          btnIcon="plus-icon"
        />
      )}
    </>
  );
};

export default MasterSenderParty;
