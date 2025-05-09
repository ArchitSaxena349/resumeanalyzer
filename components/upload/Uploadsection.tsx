import { Sparkles } from "lucide-react";
import { Badge } from "../ui/badge";

export default function Uploadsection() {
  return (
    <div className="flex flex-col items-center justify-center gap-6 text-center">
      <div
        className="relative p-[1px] overflow-hidden
          rounded-full bg-linear-to-r from-red-200 via-red-500 to-rose-800
          animate-gradient-x group"
      >
        <Badge
          variant={"secondary"}
          className="relative px-6 py-2 text-base
              font-medium bg-white rounded-full group-hover:bg-gray-50
              transition-all duration-300"
        >
          <Sparkles className="w-4 h-4 text-rose-600 animate-pulse" />
          <span className="ml-2">AI-Powered Content Creation</span>
        </Badge>
      </div>
      <div
        className="capitalizetalize text-3xl font-bold tracking-tight text-gray-900
          sm:text-4xl "
      >
        <h1>Start Uploading Your PDF's</h1>
        <p>Upload your PDF's and get a summary in seconds</p>
      </div>
    </div>      
  );
}
