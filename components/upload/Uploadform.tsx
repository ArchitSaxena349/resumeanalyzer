"use client";
import { useUploadThing } from "@/utils/uploadthing";
import Uploadforminput from "./uploadforminput";
import { useState } from "react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import NoSSR from "@/components/common/NoSSR";
import ErrorBoundary from "@/components/common/ErrorBoundary";

interface UploadformProps {
  onSubmit?: (file: File) => void;
}

export default function Uploadform({}: UploadformProps) {
  const router = useRouter();
  const [isUploading, setIsUploading] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const { startUpload } = useUploadThing("pdfUploader", {
    onClientUploadComplete: (res) => {
      console.log("Uploaded successfully", res);
      if (res && res[0]) {
        // Navigate to results page with the file key
        router.push(`/resume-results?key=${res[0].key}`);
      }
      setIsUploading(false);
    },
    onUploadError: (err) => {
      console.error("UploadThing onUploadError triggered:", err);
      console.error("Error type:", typeof err);
      console.error("Error constructor:", err?.constructor?.name);
      console.error("Error details:", {
        message: err?.message || "No message",
        code: err?.code || "No code",
        data: err?.data || "No data",
        stack: err?.stack || "No stack"
      });
      
      let errorMessage = "Upload failed";
      
      if (err?.message) {
        if (err.message.includes("Unauthorized") || err.message.includes("not authenticated")) {
          errorMessage = "Please sign in to upload files";
        } else if (err.message.includes("XHR failed") || err.message.includes("400")) {
          errorMessage = "Upload request failed. Please check your file and try again.";
        } else if (err.message.includes("413") || err.message.includes("too large")) {
          errorMessage = "File is too large. Maximum size is 8MB.";
        } else if (err.message.includes("415") || err.message.includes("unsupported")) {
          errorMessage = "File type not supported. Please upload a PDF file.";
        } else {
          errorMessage = err.message;
        }
      }
      
      toast.error(`Upload error: ${errorMessage}`);
      setIsUploading(false);
    },
    onUploadBegin: (fileName) => {
      console.log("Upload has begun for", fileName);
      setIsUploading(true);
    },
  });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!selectedFile) {
      toast.error("Please select a file first");
      return;
    }

    // Validate file before upload
    if (selectedFile.size > 8 * 1024 * 1024) { // 8MB limit
      toast.error("File size must be less than 8MB");
      return;
    }

    if (selectedFile.type !== "application/pdf") {
      toast.error("Only PDF files are supported");
      return;
    }

    console.log("Starting upload for file:", {
      name: selectedFile.name,
      size: selectedFile.size,
      type: selectedFile.type,
      sizeInMB: (selectedFile.size / (1024 * 1024)).toFixed(2) + "MB"
    });

    try {
      setIsUploading(true);
      toast.info("Starting upload...");
      
      // Start the file upload
      const resp = await startUpload([selectedFile]);
      console.log("Upload response:", resp);
      
      if (!resp) {
        toast.error("Upload failed - no response received");
        setIsUploading(false);
        return;
      }
    } catch (err: unknown) {
      console.error("Upload error:", err);
      console.error("Error type:", typeof err);
      console.error("Error keys:", Object.keys(err || {}));
      
      let errorMessage = "Upload failed. Please try again.";
      if (err && typeof err === 'object' && 'message' in err) {
        errorMessage = String(err.message);
      } else if (typeof err === 'string') {
        errorMessage = err;
      }
      
      toast.error(errorMessage);
      setIsUploading(false);
    }
  };

  return (
    <ErrorBoundary>
      <NoSSR fallback={
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
      }>
        <div className="flex flex-col gap-6">
          <Uploadforminput 
            onSubmit={handleSubmit} 
            onFileChange={setSelectedFile}
            isUploading={isUploading}
          />
        </div>
      </NoSSR>
    </ErrorBoundary>
  );
}