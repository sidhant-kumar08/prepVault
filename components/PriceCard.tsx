"use client"

import React, { useEffect } from 'react'
import { cardDataType } from './PricingCard'

function PriceCard(data : {data : cardDataType}) {

    useEffect(()=>console.log(data),[])
  return (
    <div>
        <div className={`flex flex-col items-start p-8 w-72 rounded-xl  shadow-lg ${data.data.title === 'Free' ? 'border border-neutral-800 dark:border-white' : 'border border-orange-500'}`}>
            <h4 className="font-heading text-foreground font-bold text-3xl">
              {data.data.title}
            </h4>
            <div className="mt-5">
              <span className="font-heading text-5xl font-semibold">{data.data.price}</span>
              <span className="text-sm"> /month</span>
            </div>
            <p className="text-muted-foreground mt-4">
              {data.data.description}
            </p>
            <div className="shrink-0 bg-border h-[1px] w-full my-6"></div>
            <ul className="space-y-2">
              {data.data.features.map((item, index) => (
                <li key={index} className="flex items-center gap-2">
                  <div className="rounded bg-primary/10 p-1">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="lucide lucide-check h-4 w-4 text-primary"
                    >
                      <path d="M20 6 9 17l-5-5"></path>
                    </svg>
                  </div>
                  <span className="text-muted-foreground text-sm">{item}</span>
                </li>
              ))}
            </ul>
            <button className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 bg-orange-500 text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2 mt-10 w-full">
              {data.data.buttonTitle}
            </button>
            <p className="text-muted-foreground text-balance text-center mt-4 mx-auto text-sm">
                {data.data.footerText}
            </p>
          </div>
    </div>
  )
}

export default PriceCard