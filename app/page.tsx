import FirstSection from "@/components/FirstSection";
import Footer from "@/components/Footer";
import FourthSection from "@/components/FourthSection";
import SecondSection from "@/components/SecondSection";
import ThirdSection from "@/components/ThirdSection";

export default function Home() {
  return (
    <>
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




      <FirstSection />
      <SecondSection />
      <ThirdSection />
      <FourthSection />
      <Footer />
    </>
  );
}
