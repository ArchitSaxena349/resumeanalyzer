import { BrainCircuit, FileOutput, FileText } from "lucide-react";
import React, { ReactNode } from "react";

type Step = {
  icon: ReactNode;
  label: string;
  description: string;
};

const steps: Step[] = [
  {
    icon: <FileText size={64} strokeWidth={1.5} />,
    label: "Upload your PDF",
    description: "Upload your PDF file and we will extract the text for you.",
  },
  {
    icon: <BrainCircuit size={64} strokeWidth={1.5} />,
    label: "AI Analysis",
    description: "Get advanced AI process and analyses your document instatly.",
  },
  {
    icon: <FileOutput size={64} strokeWidth={1.5} />,
    label: "Get your summary",
    description: "Receive a concise summary of your document in minutes.",
  },
];

const Howitworks = () => {
  return (
    <div>
      <section
        className="relative overflow-hidden
         bg-gray-50 "
      >
        <div
          className="
             py-12 lg:py-24 max-w-5xl mx-auto px-4 sm:px-6
             lg:px8 lg:pt-12 "
        ></div>
        <div className="text-center mb-16">
          <h2
            className=" font-bold text-xl
                uppercase mb-4 text-rose-500"
          >
            How it works{" "}
          </h2>
          <h3 className=" font-bold text-3xl max-w-2xl mx-auto">
            Transform any PDF into n easy-to-digest ummary in three simple steps
          </h3>
          <div
            className="grid grid-cols-1
          md:grid-cols-3 gap-8
          max-w-6xl mx-auto relative"
          >
            {steps.map((step, index) => (
              <div
                key={index}
                className="mt-5 p-6 rounded-2xl bg-white/5
                     backdrop-blur-xs border border-white/10 hover:border-rose-500
                     transition-colors group w-full"
              >
                <div className="flex flex-col h-full gap-4">
                  <div className="flex items-center justify-center h-24 w-24
                  mx-auto rounded-2xl bg-linear-to-br from-rose-500/10
                  to-transparent group-hover:from-rose-500/20 transition-colors">
                    <div className="text-rose-500">{step.icon}</div>
                  </div>
                  <div className="flex flex-col flex-1  gap-1
                  justify-center">
                    <h4 className="font-bold text-xl">{step.label}</h4>
                    <p className=" text-gray-400">{step.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Howitworks;
