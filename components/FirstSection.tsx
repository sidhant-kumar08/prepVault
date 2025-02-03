import React from 'react'
import AnimatedGradientText from "@/components/ui/animated-gradient-text";
import { FadeText } from "@/components/ui/fade-text";
import { RainbowButton } from "@/components/ui/rainbow-button";
import WordFadeIn from "@/components/ui/word-fade-in";
import { BiChevronRight } from "react-icons/bi";


function FirstSection() {
  return (
    <>



      <div className="flex flex-col gap-6 py-6 md:py-0 mb-10">
        <div className="flex justify-center ">
          <div className="z-10 flex sm:mt-6 md:mt-4 items-center justify-center">
            <AnimatedGradientText className="shadow-md">
              🎉 <hr className="mx-2 h-4 w-px shrink-0 bg-border" />{" "}
              <span className="inline animate-gradient bg-gradient-to-r from-primary via-accent to-primary bg-[length:var(--bg-size)_100%] bg-clip-text text-transparent">
                Introducing PrepVault
              </span>
              <BiChevronRight className="ml-1 size-3 transition-transform duration-300 ease-in-out group-hover:translate-x-0.5 text-foreground" />
            </AnimatedGradientText>
          </div>
        </div>


        <div className="w-full md:max-w-5xl px-4 md:mx-auto flex flex-col items-center relative">
          <WordFadeIn words="Crack Interviews with Insights & Resources 🎉" />
          <div className="absolute top-full -z-10">
            <svg
              height={12}
              width={300}
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 300 12"
              fill="none"
              stroke="orange"
              strokeWidth="3"
              className="animate-draw stroke-orange -mt-1 hidden md:inline-block md:-mt-3 mr-4 rotate-180"
            >
              <path d="M0 5 Q150 15 300 5" />
              <path d="M0 10 Q150 20 300 10" />
            </svg>
          </div>

        </div>



        <div className="flex justify-center flex-col mx-auto text-center">
          <FadeText
            className="sm:text-lg px-2 md:text-xl font-normal text-black dark:text-[#F0F0F0]"
            direction="up"
            framerProps={{
              show: { transition: { delay: 0.9 } },
            }}
            text="Real Experiences & Curated Resources"
          />
          <FadeText
            className="sm:text-xl md:text-2xl px-4 font-normal text-black dark:text-[#F0F0F0]"
            direction="up"
            framerProps={{
              show: { transition: { delay: 0.9 } },
            }}
            text="Navigate your career journey with confidence."
          />
        </div>

        <div className="flex justify-center items-center">
          <RainbowButton children={`Ace your Interview`} />
        </div>
      </div>




    </>
  )
}

export default FirstSection