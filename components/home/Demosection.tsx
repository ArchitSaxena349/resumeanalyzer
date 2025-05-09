import { Pizza } from "lucide-react";
import React from "react";

const Demosection = () => {
  return (
    <section className="relative">
      <div
        className="py-12
        lg:py-24 max-w-5xl mx-auto px-4 sm:px-6
        lg:px-8"
      >
        <div></div>
        <div className="flex flex-col items-center text-center space-y-4">
          <div
            className="inline-flex items-center
                justify-center p-2 rounded-2xl bg-gray-100/50 backdrop-blur-xs border"
          >
            <Pizza className="w-6 h-6 text-rose-600" />
          </div>
          <div className=" text-center mb-16">
            <h3
              className="font-bold text-3xl max-w-2xl mx-auto px-4
                    sm:px-6"
            >
              watch how Sommaire transform{" "}
              <span
                className="bg-linear-to-r
                        from-rose-500 to-red-700 bg-clip-text text-transparent"
              >
                this Next.js course PDF
              </span>
              {""}
              into an easy-to-road summary!
            </h3>
          </div>
          <div className="flex justify-center items-center px-2 sm:px-4
          lg:px-6">
        
          </div>
        </div>
      </div>
    </section>
  );
};

export default Demosection;
