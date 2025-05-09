import HeroSection from "@/components/home/Herosection";
import DemoSection from "@/components/home/Demosection";
import Howitworks from "@/components/common/Howitworks";
import Pricingsection from "@/components/home/Pricingsection";
import Ctasection from "@/components/home/Ctasection";
import React from "react";
// import BgGradient from '@/components/common/Bggradient'
const Home = () => {
  return (
    <div className="relative w-full ">
      {/* <BgGradient /> */}
      <div className="flex flex-col">
        <HeroSection />
        <DemoSection />
      </div>
      <Howitworks />
      <Pricingsection />
      <Ctasection />
    </div>
  );
};

export default Home;
