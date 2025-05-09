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
}