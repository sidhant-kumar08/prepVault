"use client"

import ResourceCard from '@/components/ResourceCard'
import Link from 'next/link'
import React from 'react'
import {motion} from 'framer-motion'

function page() {

  const cardData = [{route: 'devops', title: "DevOps"}, {route: 'dsa', title: "DSA"}, {route: 'frontend', title: "Frontend"},{route: 'backend', title: "Backend"}, {route: 'fullstack', title: "FullStack"}, {route: '', title: "coming soon.."}]

  return (
    <>
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
      viewport={{ once: true }} 
      transition={{ 
        duration: 0.5,
        delay:  0.1,
        ease: "easeOut"
      }}
      >
        <div className='flex flex-col justify-center items-center py-8 px-4 md:py-14 text-center'>
          <h1 className="text-2xl md:text-4xl font-poppins font-semibold bg-gradient-to-t from-orange-300 to-red-500 bg-clip-text text-transparent">
            All Your Resources in One Place
          </h1>

          <p className='text-sm font-medium md:font-normal md:text-xl font-poppins mt-2 md:mt-4'>Unlock the power of video learning with our hand-selected YouTube tutorials</p>
          <p className='text-sm font-medium md:font-normal md:text-xl font-poppins'> for every key software development skill.</p>
        </div>

        <div className='h-screen px-2 md:px-10 '>
              <div className=' rounded-3xl border border-neutral-400 md:px-10 md:py-10 py-6 px-2 flex flex-wrap justify-center items-center gap-6'>
                                                           {/* card */}
                    {cardData.map((data, index) => {
                      return (
                        <Link key={index} href={`/resource/${data.route}`}><ResourceCard key={index} title={data.title} /></Link>
                      )
                    })}
              </div>
        </div>



      </motion.div>
    </>
  )
}

export default page