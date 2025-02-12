"use client";

import { dataType, formatDate } from "@/app/home/page";
import axios from "axios";
import Link from "next/link";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { BiLeftArrowAlt } from "react-icons/bi";
import parse from "html-react-parser";
import { BiUpvote } from "react-icons/bi";
import { BiDownvote } from "react-icons/bi";

function Experience() {
  const { id } = useParams();
  const [singleExp, setSingleExp] = useState<dataType>();

  useEffect(() => {
    try {
      async function fetchData() {
        const response = await axios.get(`/api/experience/${id}`);
        setSingleExp(response.data);
      }
      fetchData();
    } catch (error) {
      console.log(error);
    }
  }, []);

  async function handleVoteClick(args: string) {
    try {
      const response = await axios.post(`/api/experience/${id}`, {
        voteType: args,
      });
      setSingleExp(response.data);
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <>
      <div className=" max-w-4xl mx-auto">
        <Link href="/home">
          <BiLeftArrowAlt size={30} />
        </Link>
      </div>
      <div className="max-w-3xl px-2 md:px-0 mx-auto">
        {singleExp ? (
          <div>
            <div>
              <div>
                <h1 className="px-2 text-center text-xl md:text-3xl font-poppins font-semibold">
                  {singleExp.title.toUpperCase()}
                </h1>
              </div>

              <div className="flex mt-2 justify-between">
                <div className="flex text-sm gap-2">
                  <button className="px-4 border-neutral-400 rounded-full border">
                    {singleExp.company.toUpperCase()}
                  </button>
                  <button
                    className={`px-4 border rounded-full ${
                      singleExp.status.toLowerCase() === "selected"
                        ? "border-green-500 text-green-500"
                        : singleExp.status.toLowerCase() === "rejected"
                        ? "border-red-500 text-red-500"
                        : "border-gray-500 text-gray-500"
                    }`}
                  >
                    {singleExp.status.toUpperCase()}
                  </button>
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleVoteClick("upVote")}
                      className="flex gap-2 justify-center items-center"
                    >
                      <BiUpvote /> {singleExp.upVote}
                    </button>
                    <button
                      onClick={() => handleVoteClick("downVote")}
                      className="flex gap-2 justify-center items-center"
                    >
                      <BiDownvote /> {singleExp.downVote}
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <hr className="mt-4" />

            <div className="mt-4 prose">{parse(singleExp.experience)}</div>

            <div className="border-t border-black mt-4 py-4 text-center">
              <p>Posted on: {formatDate(singleExp.createdAt)}</p>
            </div>
          </div>
        ) : (
          <p>Loading...</p>
        )}
      </div>
    </>
  );
}

export default Experience;
