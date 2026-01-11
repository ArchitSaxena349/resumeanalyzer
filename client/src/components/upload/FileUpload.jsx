import React, { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { UploadCloud, File, X, CheckCircle } from "lucide-react";
import { Button } from "../ui/Button";
import { cn } from "../ui/Button";

const FileUpload = ({ onFileSelect, selectedFile, clearFile }) => {
    const [dragActive, setDragActive] = useState(false);
    const inputRef = useRef(null);

    const handleDrag = (e) => {
        e.preventDefault();
        e.stopPropagation();
        if (e.type === "dragenter" || e.type === "dragover") {
            setDragActive(true);
        } else if (e.type === "dragleave") {
            setDragActive(false);
        }
    };

    const handleDrop = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setDragActive(false);
        if (e.dataTransfer.files && e.dataTransfer.files[0]) {
            validateAndSetFile(e.dataTransfer.files[0]);
        }
    };

    const handleChange = (e) => {
        e.preventDefault();
        if (e.target.files && e.target.files[0]) {
            validateAndSetFile(e.target.files[0]);
        }
    };

    const validateAndSetFile = (file) => {
        if (file.type === "application/pdf") {
            onFileSelect(file);
        } else {
            alert("Please upload a PDF file.");
        }
    };

    const onButtonClick = () => {
        inputRef.current?.click();
    };

    return (
        <div className="w-full max-w-md mx-auto">
            <AnimatePresence mode="wait">
                {!selectedFile ? (
                    <motion.div
                        key="upload"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className={cn(
                            "relative flex flex-col items-center justify-center w-full h-64 border-2 border-dashed rounded-xl transition-all duration-200 ease-in-out bg-secondary/5",
                            dragActive ? "border-primary bg-primary/5 scale-[1.02]" : "border-border hover:border-primary/50 hover:bg-secondary/10"
                        )}
                        onDragEnter={handleDrag}
                        onDragLeave={handleDrag}
                        onDragOver={handleDrag}
                        onDrop={handleDrop}
                    >
                        <input
                            ref={inputRef}
                            type="file"
                            className="hidden"
                            accept=".pdf"
                            onChange={handleChange}
                        />
                        <div className="flex flex-col items-center justify-center pt-5 pb-6 text-center px-4">
                            <div className="p-4 bg-primary/10 rounded-full mb-4">
                                <UploadCloud className="w-8 h-8 text-primary" />
                            </div>
                            <p className="mb-2 text-lg font-semibold text-foreground">
                                Drop your resume here
                            </p>
                            <p className="mb-6 text-sm text-muted-foreground">
                                or click to browse (PDF only)
                            </p>
                            <Button onClick={onButtonClick} variant="outline" size="sm">
                                Select File
                            </Button>
                        </div>
                    </motion.div>
                ) : (
                    <motion.div
                        key="selected"
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        className="w-full p-4 border rounded-xl bg-card shadow-sm"
                    >
                        <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-4 overflow-hidden">
                                <div className="p-2 bg-green-100 rounded-lg dark:bg-green-900/30">
                                    <File className="w-6 h-6 text-green-600 dark:text-green-400" />
                                </div>
                                <div className="flex flex-col min-w-0">
                                    <span className="text-sm font-medium truncate text-foreground">
                                        {selectedFile.name}
                                    </span>
                                    <span className="text-xs text-muted-foreground">
                                        {(selectedFile.size / 1024 / 1024).toFixed(2)} MB
                                    </span>
                                </div>
                            </div>
                            <Button
                                variant="ghost"
                                size="icon"
                                onClick={clearFile}
                                className="text-muted-foreground hover:text-destructive"
                            >
                                <X className="w-5 h-5" />
                            </Button>
                        </div>
                        <div className="mt-3 flex items-center text-xs font-medium text-green-600 dark:text-green-400">
                            <CheckCircle className="w-3 h-3 mr-1.5" />
                            Ready to analyze
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default FileUpload;
