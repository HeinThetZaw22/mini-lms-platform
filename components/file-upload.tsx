"use client";

import { UploadDropzone } from "@/lib/uploadthing";
import { ourFileRouter } from "@/app/api/uploadthing/core";
import toast from "react-hot-toast";

interface FileUploadProps {
  onChange: (url?: string) => void;
  endpoint: keyof typeof ourFileRouter;
}

export const FileUpload = ({ onChange, endpoint }: FileUploadProps) => {
  return (
    <UploadDropzone
      endpoint={endpoint}
      onClientUploadComplete={(res) => {
        if (!res || res.length === 0 || !res[0].url) {
          console.error("Upload failed or URL missing", res);
          return;
        }

        const url = res[0].url;
        onChange(url);
      }}
      onUploadError={(error: Error) => {
        console.error("errorUploading", error);
        toast.error("Upload failed");
      }}
    />
  );
};
