<<<<<<< HEAD
'use client'
import { Button } from "@/components/ui/button";
import Uploadforminput from "./uploadforminput";
import { useState } from "react";

interface UploadformProps {
    onSubmit: (file: File) => void;
}

export default function Uploadform({ onSubmit }: UploadformProps) {
    const [selectedFile, setSelectedFile] = useState<File | null>(null);

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (selectedFile) {
            onSubmit(selectedFile);
        }
    };

    return (
        <div className="flex flex-col gap-6">
            <Uploadforminput 
                onSubmit={handleSubmit}
                onFileChange={setSelectedFile}
            />
        </div>
    );
=======
"use client";
import { useUploadThing } from "@/utils/uploadthing";
import Uploadforminput from "./uploadforminput";
import { useState } from "react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

interface UploadformProps {
  onSubmit: (file: File) => void;
}

export default function Uploadform({ onSubmit }: UploadformProps) {
  const router = useRouter();
  const [isUploading, setIsUploading] = useState(false);

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
      console.error("Error occurred while uploading", err);
      toast.error(`Error occurred while uploading: ${err.message}`);
      setIsUploading(false);
    },
    onUploadBegin: (fileName) => {
      console.log("Upload has begun for", fileName);
      setIsUploading(true);
    },
  });

  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!selectedFile) {
      toast.error("Please select a file first");
      return;
    }

    try {
      // Start the file upload
      const resp = await startUpload([selectedFile]);
      if (!resp) {
        toast.error("Upload failed");
        return;
      }
    } catch (err) {
      console.error("Upload error:", err);
      toast.error("Upload failed. Please try again.");
    }
  };

  return (
    <div className="flex flex-col gap-6">
      <Uploadforminput 
        onSubmit={handleSubmit} 
        onFileChange={setSelectedFile}
        isUploading={isUploading}
      />
    </div>
  );
>>>>>>> 977473c432e6301513a2c87456cc72e98d740d0f
}