"use client"

import React from "react";
import PriceCard from "./PriceCard";
import {motion} from 'framer-motion'

export interface cardDataType {
  title: String;
  price: String;
  description: String;
  features: String[];
  buttonTitle: String;
  footerText: String;
}

const cardData: Array<cardDataType> = [
  {
    title: "Free",
    price: "$0",
    description: "Perfect for Normal use",
    features: [
      "Access to limited resources",
      "Latest Experiences",
      "Community Support",
    ],
    buttonTitle: "Get Started",
    footerText: "No credit card required",
  },
  {
    title: "Premium",
    price: "$5",
    description: "Perfect for Hardworkers",
    features: [
      "Everything in Free Plan",
      "Access to Premium resources",
      "Cancel anytime",
    ],
    buttonTitle: "Subscribe",
    footerText: "Credit card required",
  },
];

function PricingCard() {
  return (
    <>
      

      <div className="flex flex-col gap-10 md:gap-20">
        <div className="flex justify-center mt-14">
          <h1 className="text-xl md:text-2xl font-semibold font-bricolage underline">
            Pricing
          </h1>
        </div>

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
        className="flex flex-col md:flex-row justify-center items-center gap-10">
          <PriceCard data={cardData[0]} />
          <PriceCard data={cardData[1]} />
        </motion.div>
      </div>
    </>
  );
}

export default PricingCard;
