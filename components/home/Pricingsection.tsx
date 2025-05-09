import React from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { ArrowRightIcon, CheckIcon } from "lucide-react";

// Define types for our pricing plans and card props
interface PricingPlan {
  id: string;
  name: string;
  price: number;
  description: string;
  items: string[];
  paymentLink: string;
}

interface PricingCardProps {
  name: string;
  price: number;
  description: string;
  items: string[];
  id: string;
  paymentLink: string;
}

const Pricingsection = () => {
  const plans: PricingPlan[] = [
    {
      id: "basic",
      name: "Basic",
      price: 9,
      description: "For personal use and small teams",
      items: ["5 pdf summaries per month"],
      paymentLink: "/checkout/basic",
    },
    {
      id: "pro",
      name: "Pro",
      price: 19,
      description: "For medium-sized teams and growing businesses",
      items: [
        "Unlimited pdf summaries",
        "Priority support",
        "24/7 priority support",
      ],
      paymentLink: "/checkout/pro",
    },
  ];

  const PricingCard = ({
    name,
    price,
    description,
    items,
    id,
    paymentLink,
  }: PricingCardProps) => {
    return (
      <div className="relative w-full max-w-lg hover:scale-105
      hover:transition-all duration-300">
        <div
          className={cn(
            "relative flex flex-col h-full gap-4 lg:gap-8",
            "z-10 p-8 border-[1px] bg-gray-500/20 rounded-2xl",
            id === "pro" && "border-rose-500 gap-5 border-2"
          )}
        >
          <div className="flex flex-col gap-4">
            <p className="text-lg lg:text-xl font-bold capitalize">{name}</p>
            <p className="text-base-content/80 mt-2">{description}</p>
          </div>
          <div className="flex gap-2">
            <p className="text-3xl tracking-tight font-extrabold">{price}</p>
            <div className="flex flex-col justify-end mb-[4px]">
              <p className="text-xs uppercase font-semibold">USD</p>
              <p className="text-xs">month</p>
            </div>
          </div>
          <div className="space-y-2.5 leading-relaxed text-base flex-1">
            {items.map((item: string, idx: number) => (
              <li key={idx} className="flex items-center gap-2">
                <CheckIcon size={18} style={{ color: "green" }} />
                {item}
              </li>
            ))}
          </div>
          <div className="space-y-2 flex justify-center w-full">
            <Link
              href={paymentLink}
              className={cn(
                "w-full rounded-full",
                "flex justify-center items-center gap-2 bg-gradient-to-r from-red-500 to-rose-500",
                "hover:from-rose-500 hover:to-red-500 text-white border-2 py-2",
                id === 'pro' ? 'border-rose-900' : "border-orange-100 from-red-500 to-rose-500"
              )}
            >
              Buy Now <ArrowRightIcon size={18} />
            </Link>
          </div>
        </div>
      </div>
    );
  };

  return (
    <section className="relative overflow-hidden" id="pricing">
      <div
        className="py-12 lg:py-24 max-w-5xl mx-auto 
        px- sm:px-6 lg:px-8 lg:pt-12"
      >
        <div className="flex items-center justify-center
          w-full pb-12">
          <h2 className="uppercase font-bold text-xl mb-8 text-rose-500">Pricing</h2>
        </div>
        <div
          className="relative flex justify-center flex-col
            lg:flex-row items-center lg:items-stretch gap-8"
        >
          {plans.map((plan) => (
            <PricingCard key={plan.id} {...plan} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Pricingsection;
