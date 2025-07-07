import { metadata } from "@/app/layout";
import { currentUser } from "@clerk/nextjs/server";
import { createUploadthing, FileRouter } from "uploadthing/server";

const f = createUploadthing();




export const ourFileRouter = {
    pdfUploader: f({
      pdf: {
        maxFileSize: "10MB",
      },
    })
      .middleware(async ({ req }) => {
        const user = await currentUser();
        if (!user) throw new Error("Unauthorized");
        return { userId: user.id };
      })
      .onUploadComplete(async ({ metadata, file }) => {
        console.log("Upload complete for", metadata.userId);
        console.log("file url", file.url);
        return { userId: metadata.userId, file };
      }),
  } satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
