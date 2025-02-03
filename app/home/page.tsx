"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaUser } from "react-icons/fa";
import Link from "next/link";
import parse from 'html-react-parser';
import { BiRightArrow } from "react-icons/bi";
import HomeShimmer from "@/components/HomeShimmer";

export interface dataType {
  _id: string;
  company: string;
  title: string;
  experience: string;
  user: string;
  status: "Selected" | "Rejected" | "Pending";
  createdAt: string;
}

export const formatDate = (isoDate: string): string => {
  const date = new Date(isoDate);
  const day = String(date.getDate()).padStart(2, "0"); // Ensure 2 digits
  const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are 0-indexed
  const year = date.getFullYear();
  return `${day}/${month}/${year}`;
};

const Page = () => {
  const [data, setData] = useState<dataType[]>();

  const trimTo25Words = (text: string): string => {
    const words = text.split(" ");
    return words.slice(0, 25).join(" ");
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("/api/experience");
        setData(response.data);
      } catch (error) {
        console.error("Error fetching data", error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (data) {
      console.log(data);
    }
  }, [data]);

  return (
    <div>
      {data ? (
        <div className="max-w-6xl mx-auto px-2 md:px-0 mt-6 flex flex-col gap-4">
          {data.map((item: dataType, index) => (
            <Link href={`/experience/${item._id}`} key={index}>
              <div className="border-neutral-400 border rounded-xl shadow-sm flex-col flex gap-2 px-4 py-4">
                <div>
                  <h1 className="text-2xl font-poppins font-semibold">
                    {item.title.toUpperCase()}
                  </h1>
                </div>

                <div className="flex text-sm gap-2">
                  <button className="px-2 border-neutral-400 rounded-full border">
                    {item.company.toUpperCase()}
                  </button>
                  <button
                    className={`px-2 rounded-full border ${
                      item.status === "Selected"
                        ? "border-green-500 text-green-500"
                        : item.status === "Rejected"
                        ? "border-red-500 text-red-500"
                        : "border-gray-500 text-gray-500"
                    }`}
                  >
                    {item.status.toUpperCase()}
                  </button>
                </div>

                <div>
                  
                    {parse(trimTo25Words(item.experience))}
                  
                </div>

                <div className="flex justify-between items-center">
                  <button className="flex border font-poppins border-neutral-400 items-center rounded-full px-2 gap-2">
                    <FaUser />
                    {item.user}
                  </button>
                  <h1>Posted on: {formatDate(item.createdAt)}</h1>
                </div>
              </div>
            </Link>
          ))}
        </div>
      ) : (<>
        <HomeShimmer />
        <HomeShimmer />
        <HomeShimmer />
        <HomeShimmer />
        </>
      )}
    </div>
  );
};

export default Page;
