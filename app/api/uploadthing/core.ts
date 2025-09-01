import { currentUser } from "@clerk/nextjs/server";
import { createUploadthing, FileRouter } from "uploadthing/server";

const f = createUploadthing({
  errorFormatter: (err) => {
    console.log("UploadThing error:", err.message);
    return { message: err.message };
  },
});

export const ourFileRouter = {
    pdfUploader: f({
      pdf: {
        maxFileSize: "8MB",
      },
    })
      .middleware(async (opts) => {
        try {
          console.log("UploadThing middleware called with:", {
            files: opts.files?.map(f => ({ name: f.name, size: f.size, type: f.type })),
            input: opts.input
          });
          
          const user = await currentUser();
          console.log("UploadThing middleware - user:", user ? "authenticated" : "not authenticated");
          
          if (!user) {
            console.log("UploadThing middleware - No user found, using anonymous upload");
            // For testing purposes, allow anonymous uploads
            return { userId: "anonymous" };
          }
          
          console.log("UploadThing middleware - User ID:", user.id);
          return { userId: user.id };
        } catch (error) {
          console.error("UploadThing middleware error:", error);
          // Fallback to anonymous for testing
          return { userId: "anonymous" };
        }
      })
      .onUploadComplete(async ({ metadata, file }) => {
        try {
          console.log("Upload complete for", metadata.userId);
          console.log("file details:", {
            url: file.url,
            key: file.key,
            name: file.name,
            size: file.size
          });
          return { userId: metadata.userId };
        } catch (error) {
          console.error("Error in onUploadComplete:", error);
          throw error;
        }
      }),
  } satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
