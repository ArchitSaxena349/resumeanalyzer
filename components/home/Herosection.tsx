import { Badge } from "@/components/ui/badge";
import { ArrowRight, Sparkles } from "lucide-react";
import React from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const HeroSection = () => {
  return (
    <section
      className="realative mx-auto flex flex-col z-8
    items-center justify-center py-16 sm:py-20 lg:pb-28
    transtion-all animate-in lg:px-12 max-w-7xl"
    >
      <div className="flex">
        <div
          className="relative p-[1px] overflow-hidden
                rounded-full bg-linear-to-r from-rose-200 via-rose-500
                to-rose-800 animate-gradient-x group"
        >
          <Badge
            className="relative px-6 py-2 text-base
          font-medium bg-white rounded-full group-hover:bg-gray-50
          transition-colors duration-200"
          >
            <Sparkles
              className="h-6 w-6 mr-2 text-rose-600
                      animate-pulse"
            />
            <p className="text-rose-600 text-base">Powered by AI</p>
          </Badge>
        </div>
      </div>
      <h1 className="text-4xl py-6 text-center font-bold">
        <span className="inline-block">
          Transform PDFs into{" "}
          <span className="relative inline-block">
            <span
              className="absolute inset-0 bg-rose-300/100 rounded-lg transform -skew-y-1 -rotate-2"
              aria-hidden="true"
            ></span>
            <span className="relative z-10 px-2">concise</span>
          </span>{" "}
          summaries
        </span>
      </h1>
      <h2
        className="text-lg sm:text-xl lg:text-2xl text-center px-4 lg:px-8
      lg:max-w-4xl text-gray-600"
      >
        Get a beautiful summary reel of the documents.
      </h2>
      <div className="flex justify-center">
        <Button
          variant={"link"}
          className="text-white
        mt-6 text-base sm:text-lg lg:text-xl rounded-full px-8 sm:px-10
        lg:px-12 py-6 sm:py-6 lg:py-8
        lg:mt-8 bg-rose-600 hover:bg-rose-700 bg-linear-to-r from-slate-900 hover:no-underline
        font-bold shadow-lg transition-all duration-300"
        >
          <Link href={"/#pricing"} className="flex gap-2 items-center">
            <span>Try Sommaire</span>
            <ArrowRight></ArrowRight>
          </Link>
        </Button>
      </div>
    </section>
  );
};

export default HeroSection;
