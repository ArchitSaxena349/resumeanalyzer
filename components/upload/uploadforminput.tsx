"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface UploadforminputProps {
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  onFileChange: (file: File | null) => void;
  isUploading: boolean;
}

export default function Uploadforminput({
  onSubmit,
  onFileChange,
  isUploading,
}: UploadforminputProps) {
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    onFileChange(file);
  };

  return (
    <form onSubmit={onSubmit} className="w-full max-w-md">
      <div className="flex flex-col gap-4">
        <div className="flex items-center gap-2">
          <Input
            type="file"
            id="file"
            name="file"
            accept=".pdf,.docx,.doc"
            required
            className="cursor-pointer"
            onChange={handleFileChange}
            disabled={isUploading}
          />
          <Button 
            type="submit" 
            className="cursor-pointer"
            disabled={isUploading}
          >
            {isUploading ? "Uploading..." : "Upload Your PDF"}
          </Button>
        </div>
        {isUploading && (
          <div className="flex items-center justify-center">
            <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600"></div>
            <span className="ml-2 text-sm text-gray-600">Processing your resume...</span>
          </div>
        )}
      </div>
    </form>
  );
}