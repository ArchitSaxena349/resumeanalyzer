'use client'
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface UploadforminputProps {
    onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
    onFileChange: (file: File | null) => void;
}

export default function Uploadforminput({ 
    onSubmit, 
    onFileChange 
}: UploadforminputProps) {
    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0] || null;
        onFileChange(file);
    };

    return (
        <form onSubmit={onSubmit}>
            <div className="flex justify-end gap-2">
                <Input 
                    type="file" 
                    id="file" 
                    name="file" 
                    accept=".pdf,.docx,.doc" 
                    required 
                    className="cursor-pointer" 
                    onChange={handleFileChange} 
                />
                <Button 
                    type="submit" 
                    className="cursor-pointer"
                >
                    Upload Your PDF
                </Button>
            </div>
        </form>
    );
}