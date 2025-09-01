// app/upload/page.tsx
'use client'
import Uploadsection from "@/components/upload/Uploadsection";
import UploadFormWrapper from "@/components/upload/UploadFormWrapper";
import { useUser } from "@clerk/nextjs";
import { z } from "zod";
import { useState } from "react";

// Define a schema for the file
const fileSchema = z.instanceof(File)
  .refine((file) => file.size <= 8 * 1024 * 1024, "File must be less than 8MB")
  .refine(
    (file) => ["application/pdf"].includes(file.type),
    "File must be a PDF"
  );

export default function Upload() {
  const { user, isLoaded } = useUser();
  const [error, setError] = useState<string | null>(null);

  if (!isLoaded) {
    return (
      <section className="min-h-screen">
        <div className="mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:px-8">
          <div className="flex flex-col items-center justify-center gap-6 text-center">
            <div className="animate-pulse">Loading...</div>
          </div>
        </div>
      </section>
    );
  }

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
          {user && (
            <div className="mb-4 p-4 bg-green-100 border border-green-400 text-green-700 rounded">
              <p>Welcome, {user.firstName || user.emailAddresses[0]?.emailAddress}! You can now upload your resume.</p>
            </div>
          )}
          {!user && (
            <div className="mb-4 p-4 bg-yellow-100 border border-yellow-400 text-yellow-700 rounded">
              <p>You can upload files without signing in for testing purposes.</p>
            </div>
          )}
          <UploadFormWrapper onSubmit={handleFileSubmit} />
          {error && <p className="text-red-600 text-sm">{error}</p>}
          
          <div className="mt-8 p-4 bg-gray-100 rounded">
            <h3 className="text-lg font-semibold mb-2">Debug Information</h3>
            <div className="text-sm space-y-1">
              <div>User Status: {user ? "Signed In" : "Not Signed In"}</div>
              <div>User ID: {user?.id || "N/A"}</div>
              <div>Environment: {process.env.NODE_ENV}</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}