"use client"

import React from 'react'
import { GrResources } from "react-icons/gr";
import { IoPersonOutline } from "react-icons/io5";
import { MdOutlineSentimentSatisfied } from "react-icons/md";
import PricingCard from './PricingCard';
import {motion} from 'framer-motion'

function ThirdSection() {

const featuresData = [
    {
        image : <GrResources />,
        title : 'Resources',
        desc : 'Access to a wide range of resources to help you prepare for your interviews.'
    },
    {
        image: <IoPersonOutline />,
        title : 'Real Experiences',
        desc : 'Get real experiences from people who have given the interviews.'
    },
    {
        image : <MdOutlineSentimentSatisfied />,
        title : 'Easy UI',
        desc : 'User friendly interface to help you.'
    }
]

  return (
    <>

    
        <div className='flex flex-col gap-4 mt-4 md:mt-10 md:gap-8'>

                <div className='flex justify-center mt-4'>
                    <h1 className='text-xl md:text-2xl font-semibold font-bricolage underline'>Features</h1>
                </div>


                <div>
                    <div className='flex flex-col md:grid md:grid-cols-3 mt-6 px-4 md:px-32 gap-6 '>
                    {
                                featuresData.map((feature, index) => (
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
                                        delay: index * 0.1,
                                        ease: "easeOut"
                                      }}
                                    key={index} className='flex flex-col hover:border hover:border-orange-300 hover:shadow-lg dark:shadow-neutral-900 shadow-md transition ease-linear duration-100 rounded-2xl dark:bg-neutral-700 bg-[#F9FAFB] py-4 justify-center text-center px-2 items-center'>
                                        <div className='flex justify-center'>
                                            <div className='bg-gray-100 text-orange-500 dark:bg-neutral-500 p-4 rounded-full'>
                                                {feature.image}
                                            </div>
                                        </div>
                                        <div className='mt-4'>
                                            <h1 className='text-2xl font-semibold font-poppins'>{feature.title}</h1>
                                            <p className='text-center text-wrap mt-2'>{feature.desc}</p>
                                        </div>
                                    </motion.div>
                                ))
                            }
                    </div>
                </div>

        </div>

        <PricingCard />
    </>
  )
}

export default ThirdSection