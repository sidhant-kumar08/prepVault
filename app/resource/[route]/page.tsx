"use client";

import { backendRoute } from "@/routeFile";
import axios from "axios";
import Link from "next/link";
import { use, useEffect, useState } from "react";
import { motion } from "framer-motion";
import { TiArrowSortedDown } from "react-icons/ti";
import { VscDebugBreakpointLog } from "react-icons/vsc";


function Page({ params }: { params: Promise<{ route: string }> }) {
  const { route } = use(params);

  const [resource, setResource] = useState(null);
  const [isOpen, setIsOpen] = useState<{ [key: number]: boolean }>({});

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await axios.get(`${backendRoute}api/resource/${route}`);
        setResource(res.data);
      } catch (error) {
        console.log("Error fetching data:", error);
      }
    }
    fetchData();
  }, [route]);

  if (!resource) return <div className="flex justify-center items-center h-screen text-xl">Loading...</div>;

  return (<>
    <div
      className="
    absolute inset-0 -z-10 h-full w-full 
    bg-white dark:bg-[#212121] 
    bg-[linear-gradient(to_right,#f0f0f0_1px,transparent_1px),linear-gradient(to_bottom,#f0f0f0_1px,transparent_1px)]
    dark:bg-[linear-gradient(to_right,#2c2c2c_1px,transparent_1px),linear-gradient(to_bottom,#2c2c2c_1px,transparent_1px)]
    bg-[size:4rem_6rem]
  "
      style={{
        maskImage: "linear-gradient(to bottom, black, transparent)",
        WebkitMaskImage: "linear-gradient(to bottom, black, transparent)",
      }}
    ></div>

    <div className="p-6 max-w-4xl mx-auto select-none">
      <h1 className="text-4xl font-bold font-poppins text-center mb-6 bg-gradient-to-b from-orange-500 to-red-500 text-transparent bg-clip-text">{resource.title.toUpperCase()}</h1>

      <div className="space-y-4">
        {resource.modules.map((module, index: number) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="border border-gray-300 shadow-lg p-5 rounded-xl dark:bg-neutral-900 dark:text-white bg-white cursor-pointer hover:bg-gray-100"
            onClick={() => setIsOpen((prev) => ({ ...prev, [index]: !prev[index] }))}
          >
            <div className="flex  justify-between items-center">
              <h2 className="text-2xl font-semibold text-gray-700 dark:text-white">{module.title}</h2>
              <span className={`transform transition-transform ${isOpen[index] ? "rotate-180" : "rotate-0"}`}>
                <TiArrowSortedDown />
              </span>
            </div>
            {isOpen[index] && (
              <motion.ul
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                transition={{ duration: 0.3 }}
                className="mt-3 space-y-2"
              >
                {module.topics.map((item, topicIndex: number) => (
                  <li key={topicIndex} className="pl-6 flex items-center gap-4 list-none">
                    <VscDebugBreakpointLog />
                    <Link
                      href={item.link}
                      className="text-orange-500 hover:text-orange-800 transition-colors"
                    >
                      {item.title}
                    </Link>
                  </li>
                ))}
              </motion.ul>
            )}
          </motion.div>
        ))}
      </div>
    </div>

  </>
  );
}

export default Page;
