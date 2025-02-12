import React from "react";
import PriceCard from "./PriceCard";

export interface cardDataType {
    title: String;
    price: String;
    description: String;
    features: String[];
    buttonTitle: String;
    footerText: String;
}

const cardData : Array<cardDataType> = [
    {
        title: "Free",
        price: "$0",
        description: "Perfect for Normal use",
        features: [
            "Access to limited resources",
            "Latest Experiences",
            "No Delete and Edit option for experiences",
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
            "Delete and Edit option for experiences",
            "Cancel anytime",
        ],
        buttonTitle: "Subscribe",
        footerText: "Credit card required",
    }
]

function PricingCard() {
  return (
    <>
      <div className="flex flex-col gap-10 md:gap-20">
        <div className="flex justify-center mt-14">
          <h1 className="text-xl md:text-2xl font-semibold font-bricolage underline">
            Pricing
          </h1>
        </div>

        <div className="flex flex-col md:flex-row justify-center items-center gap-10">
          <PriceCard data={cardData[0]} />
          <PriceCard data={cardData[1]} />
        </div>
      </div>
    </>
  );
}

export default PricingCard;
