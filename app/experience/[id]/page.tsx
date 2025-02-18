"use client";

import { dataType, formatDate } from "@/app/home/page";
import axios from "axios";
import parse from "html-react-parser";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { BiDownvote, BiLeftArrowAlt, BiUpvote } from "react-icons/bi";
import { IoMdSend } from "react-icons/io";
import { RxPerson } from "react-icons/rx";
import {motion} from 'framer-motion'

function Experience() {
  const { id } = useParams();
  const [singleExp, setSingleExp] = useState<dataType>();
  const [commentText, setCommentText] = useState("");

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

  function handleCommentChange(e: React.ChangeEvent<HTMLInputElement>) {
    setCommentText(e.target.value);
  }

  const { data } = useSession();

  async function handleCommentAdd() {
    if (!data?.user) {
      alert("Please Login to comment");
    } else {
      try {
        const response = await axios.put(`/api/experience/${id}`, {
          comment: commentText,
          user: data?.user?.name || data?.user?.email,
        });
        console.log(response?.data?.success);
        if (response?.data?.success == true) {
          setCommentText("");
        }
      } catch (error) {
        console.log(error);
      }
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

            <div className="text-center">
              <h1 className="text-2xl font-semibold font-poppins">Comments</h1>

              <div className="mt-6 flex gap-2">
                <input
                  className="border dark:border-white dark:bg-black  border-black px-6 py-6 rounded-xl w-full"
                  type="text"
                  name="comment"
                  placeholder="Comment"
                  value={commentText}
                  onChange={handleCommentChange}
                />
                <button
                  onClick={handleCommentAdd}
                  className="bg-black dark:bg-white dark:text-black text-white px-6 rounded-lg"
                >
                  <IoMdSend size={25} />
                </button>
              </div>

              <div className="flex flex-col gap-2 mt-4 font-poppins">
                {singleExp.comments.map((comment, index) => {
                  return (
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
                      delay: index * 0.1,
                      ease: "easeOut"
                    }}
                    

                      key={index}
                      className="border border-gray-300 dark:border-gray-700 rounded-xl p-4 shadow-md transition-all hover:shadow-lg"
                    >
                      <div className="flex gap-3 items-center">
                        <div className="w-10 h-10 border-2 border-gray-300 dark:border-gray-700 rounded-full flex items-center justify-center bg-gray-800 text-white">
                          <RxPerson />
                        </div>
                        <p className="text-lg font-medium text-gray-900 dark:text-white">
                          {comment.user}{" "}
                          <span className="text-sm font-normal text-gray-600 dark:text-gray-400">
                            commented
                          </span>
                        </p>
                      </div>
                      <p className="mt-4 text-lg text-gray-800 dark:text-gray-200">
                        {comment.text}
                      </p>
                    </motion.div>
                  );
                })}
              </div>
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
