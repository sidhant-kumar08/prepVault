'use client'

import React, { useState } from 'react'
import { IoChevronDown, IoChevronUp } from "react-icons/io5";
import { motion } from "framer-motion";

function FourthSection() {
    const [openIndex, setOpenIndex] = useState<number | null>(null);

    const faqData = [
        {
            question: 'How can I prepare for my interviews ?',
            answer: 'You can prepare for your interviews by using our resources and reading real experiences of people who have given the interviews.'
        },
        {
            question: 'How can I access the resources ?',
            answer: 'You can access the resources by signing up on our website and then logging in.'
        },
        {
            question: 'How can I submit my experience ?',
            answer: 'You can submit your experience by logging in and then going to the Create Page.'
        },
        {
            question: 'Is this website free to use ?',
            answer: 'Yes, the website is completely free to use.'
        }
    ];

    const toggleFAQ = (index: number) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    return (
        <div className='mt-10 md:mt-20'>
            <div className='flex justify-center mt-4'>
                <h1 className='text-xl md:text-2xl font-semibold font-bricolage underline'>
                    Frequently Asked Questions
                </h1>
            </div>

            <div className='flex flex-col md:grid md:grid-cols-1 mt-6 px-4 md:px-32 gap-6 md:mt-10'>
                {faqData.map((faq, index) => (
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
                    key={index} onClick={() => toggleFAQ(index)} className='cursor-pointer'>
                        <div className='bg-[#F9FAFB] dark:bg-neutral-700 rounded-2xl py-4 px-8 transition-all duration-300 ease-in-out'>
                            <h1 className='flex justify-between items-center font-semibold font-poppins'>
                                {faq.question}
                                {openIndex === index ? <IoChevronUp /> : <IoChevronDown />}
                            </h1>

                            <motion.div
                                initial={{ height: 0, opacity: 0 }}
                                animate={openIndex === index ? { height: "auto", opacity: 1 } : { height: 0, opacity: 0 }}
                                transition={{ duration: 0.3, ease: "easeInOut" }}
                                className='overflow-hidden'
                            >
                                <p className='mt-3'>{faq.answer}</p>
                            </motion.div>
                        </div>
                    </motion.div>
                ))}
            </div>
        </div>
    );
}

export default FourthSection;
