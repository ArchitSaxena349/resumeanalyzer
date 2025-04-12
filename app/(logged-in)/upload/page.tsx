// app/upload/page.tsx
'use client'
import Uploadsection from "@/components/upload/Uploadsection";
import Uploadform from "@/components/upload/Uploadform";
import { z } from "zod";
import { useState } from "react";

// Define a schema for the file
const fileSchema = z.instanceof(File)
  .refine((file) => file.size <= 5 * 1024 * 1024, "File must be less than 5MB")
  .refine(
    (file) => ["application/pdf", "application/msword", "application/vnd.openxmlformats-officedocument.wordprocessingml.document"].includes(file.type),
    "File must be a PDF, DOC, or DOCX"
  );

export default function Upload() {
  const [error, setError] = useState<string | null>(null);

  const handleFileSubmit = (file: File) => {
    try {
      // Validate the file using the schema
      fileSchema.parse(file);
      console.log("Valid file submitted:", file);
      setError(null);
      // Proceed with upload logic here
    } catch (e) {
      if (e instanceof z.ZodError) {
        setError(e.errors[0].message); // Show the first error message
      }
    }
  };

  return (
    <section className="min-h-screen">
      <div className="mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:px-8">
        <div className="flex flex-col items-center justify-center gap-6 text-center">
          <Uploadsection />
          <Uploadform onSubmit={handleFileSubmit} />
          {error && <p className="text-red-600 text-sm">{error}</p>}
        </div>
      </div>
    </section>
  );
}