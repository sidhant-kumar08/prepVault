"use client"

import React from 'react'
import Image from 'next/image'
import {motion} from 'framer-motion'

function SecondSection() {
  return (
    <div className='w-full px-4 md:px-10'>

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
        className='justify-center flex'>
            <Image className='rounded-xl hover:shadow-lg dark:shadow-neutral-900 shadow-md transiti ease-linear duration-100 md:rounded-3xl' width={1280} height={720} src="/612shots_so.png" alt="" />
        </motion.div>
    </div>
  )
}

export default SecondSection