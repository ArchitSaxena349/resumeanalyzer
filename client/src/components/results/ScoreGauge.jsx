import React from "react";
import { motion } from "framer-motion";

const ScoreGauge = ({ score }) => {
    const radius = 45;
    const circumference = 2 * Math.PI * radius;
    const strokeDashoffset = circumference - (score / 100) * circumference;

    const getColor = (s) => {
        if (s >= 80) return "text-green-500";
        if (s >= 60) return "text-yellow-500";
        return "text-red-500";
    };

    const bgClass = getColor(score);

    return (
        <div className="relative flex items-center justify-center w-40 h-40">
            {/* Background Circle */}
            <svg className="w-full h-full transform -rotate-90">
                <circle
                    className="text-secondary"
                    strokeWidth="8"
                    stroke="currentColor"
                    fill="transparent"
                    r={radius}
                    cx="50%"
                    cy="50%"
                />
                {/* Animated Progress Circle */}
                <motion.circle
                    className={bgClass}
                    strokeWidth="8"
                    strokeDasharray={circumference}
                    initial={{ strokeDashoffset: circumference }}
                    animate={{ strokeDashoffset }}
                    transition={{ duration: 1.5, ease: "easeOut" }}
                    strokeLinecap="round"
                    stroke="currentColor"
                    fill="transparent"
                    r={radius}
                    cx="50%"
                    cy="50%"
                />
            </svg>
            {/* Percentage Text */}
            <div className="absolute flex flex-col items-center">
                <motion.span
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5 }}
                    className="text-4xl font-bold text-foreground"
                >
                    {score}
                </motion.span>
                <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                    ATS Score
                </span>
            </div>
        </div>
    );
};

export default ScoreGauge;
