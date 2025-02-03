'use client'

import Link from "next/link"
import { useState } from "react"
import DarkModeToggle from "./DarkModeToggle"
import { FaCode, FaHome } from "react-icons/fa"
import {RiMenu4Line} from "react-icons/ri"
import { motion, AnimatePresence } from "framer-motion";
import { IoIosCreate } from "react-icons/io";
import { GrResources } from "react-icons/gr";
import { signOut, useSession } from "next-auth/react"
import { IoLogOut, IoPerson } from "react-icons/io5";

const Navbar = () => {

  const data = useSession()

  const [showMenu, setShowMenu] = useState<boolean>(false);


  function handleMenuClick(){
    setShowMenu(!showMenu);
  }

  return (
    <>
        <div className="flex px-4 py-4 justify-between border-b  z-50 sticky top-0 backdrop-blur-md ">
            <Link href='/'><div className='items-center justify-center'>
                <h1 className="text-xl md:text-2xl flex gap-2 items-center font-poppins font-semibold"><FaCode className="text-orange-500" />PrepVault</h1>
            </div></Link>

            <div className='hidden md:flex'>
              { data.data?.user ? <div className="flex gap-4 items-center list-none">
              <Link href='/home'><li className="text-gray-700 hover:text-black dark:text-neutral-100 dark:hover:text-white">Home</li></Link>
              <Link href='/resource'><li className="text-gray-700 hover:text-black dark:text-neutral-100 dark:hover:text-white">Resources</li></Link>
              <Link href='/create'><li className="text-gray-700 hover:text-black dark:text-neutral-100 dark:hover:text-white">Create</li></Link>
              <button className="p-2 hover:bg-gray-200 dark:hover:text-black rounded-lg dark:text-white shadow-sm transition duration-200 ease-linear" onClick={()=>signOut()}><IoLogOut /></button>
              <DarkModeToggle />

              </div>  :

              <div className="flex gap-4">
                <Link href='/signin'><button className="md:flex  inline-flex  dark:bg-white dark:border-neutral-950 dark:text-black py-1 items-center justify-center rounded-lg bg-black border border-white px-4 font-medium text-white transition active:scale-90 ">Login</button></Link>
                <Link href='/signin'><button className="md:flex  inline-flex  dark:bg-[#212121] dark:border-[#F5F5F5] dark:text-white py-1 items-center justify-center rounded-lg bg-white border border-black px-4 font-medium text-neutral-950 transition active:scale-90 ">Signup</button></Link>
                <DarkModeToggle />
              </div>
              }
            </div>

              {/* //mobile Navbar */}

            <div className="items-center flex gap-2 md:hidden justify-center">
              <DarkModeToggle />
              <button onClick={handleMenuClick} className="border border-neutral-300 rounded-lg p-2"><RiMenu4Line /></button>
            </div>

        </div>

          <AnimatePresence>
          {showMenu && (
            <motion.div
              initial={{ x: "100%" }} 
              animate={{ x: 0 }} 
              exit={{ x: "100%" }} 
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="fixed top-0 right-0 h-screen w-screen dark:bg-[#212121] dark:text-white bg-white flex flex-col items-center justify-between text-center z-50 lg:hidden"
            >
             
              <motion.button
                initial={{ rotate: 90 }}
                animate={{ rotate: 90 }}
                exit={{ rotate: 90 }}
                transition={{ duration: 0.6 }}
                className="absolute top-4 right-4 text-xl"
                onClick={() => setShowMenu(false)}
              >
                ✕
              </motion.button>
  
             
              <ul className="mt-16 font-poppins font-medium flex flex-col p-4 text-center space-y-6">
                <Link href='/home' onClick={() => setShowMenu(!showMenu)}><li className="hover:text-gray-300 flex items-center gap-4 text-center cursor-pointer"><FaHome /> Home</li></Link>
                <Link href='/create' onClick={() => setShowMenu(!showMenu)}><li className="hover:text-gray-300 flex items-center gap-4 text-center cursor-pointer"><IoIosCreate /> Create</li></Link>
                <Link href='/resource' onClick={() => setShowMenu(!showMenu)}><li className="hover:text-gray-300 flex items-center gap-4 text-center cursor-pointer"><GrResources /> Resources</li></Link>
                {data.data?.user ? '' : <Link href='/signin' onClick={() => setShowMenu(!showMenu)}><li className="hover:text-gray-300 flex items-center gap-4 text-center cursor-pointer"><IoPerson />Sign In</li></Link>}
                
              </ul>
            </motion.div>
          )}
        </AnimatePresence>
         

    </>
  )
}

export default Navbar