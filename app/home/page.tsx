"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaUser } from "react-icons/fa";
import Link from "next/link";
import parse from "html-react-parser";
import HomeShimmer from "@/components/HomeShimmer";
import {motion} from 'framer-motion'

export interface dataType {
  _id: string;
  company: string;
  title: string;
  experience: string;
  user: string;
  status: "Selected" | "Rejected" | "Pending";
  createdAt: string;
  upVote?: number;
  downVote?: number;
  comments: Array<{ user: string; text: string}>;
}

export const formatDate = (isoDate: string): string => {
  const date = new Date(isoDate);
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = date.getFullYear();
  return `${day}/${month}/${year}`;
};

const Page = () => {
  const [data, setData] = useState<dataType[]>();
  const [searchText, setSearchText] = useState<string>("");
  const [selectedFilter, setSelectedFilter] = useState<string>("");
  const [sortOrder, setSortOrder] = useState<string>("latest");

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

  return (
    <div>
      <div className="max-w-6xl mx-auto px-2 md:px-0 mt-6 flex gap-2 md:gap-4">
        <input
          type="text"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          placeholder="Search"
          className="border border-black py-1 w-full px-2 md:px-6 rounded-xl"
        />
        <select
          onChange={(e) => setSelectedFilter(e.target.value)}
          value={selectedFilter}
          className="border border-black py-1 md:px-2 rounded-xl"
        >
          <option value="">All</option>
          <option value="Selected">Selected</option>
          <option value="Rejected">Rejected</option>
        </select>
        <select
          onChange={(e) => setSortOrder(e.target.value)}
          value={sortOrder}
          className="border border-black py-1 md:px-2 rounded-xl"
        >
          <option value="latest">Latest</option>
          <option value="oldest">Oldest</option>
        </select>
      </div>

      {data ? (
        <motion.div
        initial={{ 
          opacity: 0,
          y: 20,
          filter: "blur(10px)"
        }}
        whileInView={{ 
          opacity: 1,
          y: 0,
          filter: "blur(0px)"
        }}
        viewport={{ once: false }} 
        transition={{ 
          duration: 0.5,
          delay: 0.1,
          ease: "easeOut"
        }}
        className="max-w-6xl mx-auto px-2 md:px-0 mt-6 flex flex-col gap-4 bg-white dark:bg-neutral-800">
          {data
            .filter(
              (item) =>
                item.title.toLowerCase().includes(searchText.toLowerCase()) &&
                (selectedFilter === "" || item.status === selectedFilter)
            )
            .sort((a, b) =>
              sortOrder === "latest"
                ? new Date(b.createdAt).getTime() -
                  new Date(a.createdAt).getTime()
                : new Date(a.createdAt).getTime() -
                  new Date(b.createdAt).getTime()
            )
            .map((item: dataType, index) => (
              <Link href={`/experience/${item._id}`} key={index}>
                <div className="border-neutral-400 border rounded-xl shadow-sm flex-col flex gap-2 px-4 py-4">
                  <h1 className="text-2xl font-poppins font-semibold">
                    {item.title.toUpperCase()}
                  </h1>
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
                  <div>{parse(trimTo25Words(item.experience))}</div>
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
        </motion.div>
      ) : (
        <>
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
