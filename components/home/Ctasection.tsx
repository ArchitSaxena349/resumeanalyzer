import React from "react";
import { Button } from "../ui/button";
import Link from "next/link";
import { ArrowRightIcon } from "lucide-react";

const Ctasection = () => {
  return (
    <section className="bg-gray-50 py-12">
      <div
        className="py-12 lg:py-24 max-w-5xl
        mx-auto px-4 sm:px-6 lg:px-8"
      >
        <div
          className="flex flex-col items-center justify-center space-y-4 text-center
            "
        >
          <div className="space-y-2">
            <h2 className="text-3xl font-bold text-gray-900">
              Ready to save Hours of Reading Time?
            </h2>
            <p className="text-gray-600">
              Transform lengthy documnet into clear, actionable insights with
              our AI-powered summarier
            </p>
          </div>
          <div
            className="flex flex-col gap-2 min-[400px]:flex-row
          justify-center"
          >
            <div>
              <Button
                size={"lg"}
                variant={"link"}
                className="w-full min-[400px]:w-auto bg-linear-to-r from-slate-900 to-rose-500 hover:from-rose-500
                hover:to-slate-900 hover:text-white text-white transition-all duration-300
                "
              >
                <Link
                  href="/#pricing"
                  className="flex items-center justify-center px-5
                  py-6"
                >
                  Get Started{""}
                  <ArrowRightIcon
                    size={18}
                    className="ml-2 h-4 w-4 animate-pulse"
                  />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Ctasection;
