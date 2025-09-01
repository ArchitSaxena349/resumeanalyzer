"use client";
import { useState, useEffect } from "react";
import Uploadform from "./Uploadform";

interface UploadFormWrapperProps {
  onSubmit?: (file: File) => void;
}

export default function UploadFormWrapper({ onSubmit }: UploadFormWrapperProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="flex flex-col gap-6">
        <div className="w-full max-w-md">
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-2">
              <div className="h-10 bg-gray-200 rounded animate-pulse flex-1"></div>
              <div className="h-10 w-32 bg-gray-200 rounded animate-pulse"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return <Uploadform onSubmit={onSubmit} />;
}