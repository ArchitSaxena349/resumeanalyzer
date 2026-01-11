import React, { useState } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';
import { AlertTriangle, CheckCircle, Lightbulb, TrendingUp } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../components/ui/Card';
import FileUpload from '../components/upload/FileUpload';
import ScoreGauge from '../components/results/ScoreGauge';

export default function Analyzer() {
    const [loading, setLoading] = useState(false);
    const [result, setResult] = useState(null);
    const [file, setFile] = useState(null);

    const handleFileSelect = (selectedFile) => {
        setFile(selectedFile);
    };

    const handleUpload = async () => {
        if (!file) return;

        setLoading(true);
        const formData = new FormData();
        formData.append('resume', file);

        try {
            // Using logic to determine whether to use localhost or relative path could be added here
            // But for now keeping simple localhost:5000 as per previous config or relative /api
            const response = await axios.post('http://localhost:5000/api/analyze', formData, {
                headers: { 'Content-Type': 'multipart/form-data' }
            });
            setResult(response.data);
        } catch (error) {
            console.error("Analysis error:", error);
            alert("Analysis failed. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="container px-4 py-12 max-w-6xl mx-auto">
            <div className="mb-10 text-center">
                <h1 className="text-3xl font-bold tracking-tight mb-3">Resume AI Analyzer</h1>
                <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                    Upload your resume (PDF) to get an instant deep-dive analysis, ATS score, and actionable improvements.
                </p>
            </div>

            {!result ? (
                <div className="max-w-xl mx-auto space-y-8">
                    <Card className="border-2 border-dashed shadow-none border-border/60 bg-secondary/10">
                        <CardContent className="pt-6">
                            <FileUpload
                                onFileSelect={handleFileSelect}
                                selectedFile={file}
                                clearFile={() => setFile(null)}
                            />
                            <div className="mt-6 flex justify-center">
                                <Button
                                    onClick={handleUpload}
                                    disabled={!file || loading}
                                    size="lg"
                                    className="w-full sm:w-auto min-w-[200px]"
                                >
                                    {loading ? (
                                        <span className="flex items-center gap-2">
                                            <span className="animate-spin h-4 w-4 border-2 border-current border-t-transparent rounded-full" />
                                            Analyzing...
                                        </span>
                                    ) : "Start Analysis"}
                                </Button>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            ) : (
                <div className="space-y-8 animate-in fade-in zoom-in duration-500">
                    {/* Top Row: Score and Summary */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <Card className="md:col-span-1 flex flex-col items-center justify-center p-6 bg-card border shadow-sm">
                            <ScoreGauge score={result.atsScore} />
                            <p className="mt-4 text-center text-sm text-muted-foreground">
                                Based on standard ATS criteria
                            </p>
                        </Card>

                        <Card className="md:col-span-2">
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <TrendingUp className="w-5 h-5 text-primary" />
                                    Executive Summary
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                {result.analysis?.experience_summary && (
                                    <div>
                                        <h4 className="font-semibold text-sm text-muted-foreground uppercase mb-1">Experience</h4>
                                        <p className="text-sm leading-relaxed">{result.analysis.experience_summary}</p>
                                    </div>
                                )}
                                {result.analysis?.strengths && (
                                    <div>
                                        <h4 className="font-semibold text-sm text-muted-foreground uppercase mb-1">Key Strengths</h4>
                                        <div className="flex flex-wrap gap-2">
                                            {result.analysis.strengths.slice(0, 4).map((str, i) => (
                                                <span key={i} className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400">
                                                    <CheckCircle className="w-3 h-3 mr-1" />
                                                    {str}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </CardContent>
                        </Card>
                    </div>

                    {/* Middle Row: Suggestions and Keywords */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <Card className="h-full">
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2 text-yellow-600 dark:text-yellow-500">
                                    <Lightbulb className="w-5 h-5" />
                                    Prioritized Improvements
                                </CardTitle>
                                <CardDescription>Focus on these to boost your score immediately.</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <ul className="space-y-3">
                                    {result.suggestions.map((s, i) => (
                                        <li key={i} className="flex items-start gap-3 p-3 rounded-lg bg-yellow-50 dark:bg-yellow-900/10 text-sm">
                                            <AlertTriangle className="w-4 h-4 text-yellow-600 shrink-0 mt-0.5" />
                                            <span>{s}</span>
                                        </li>
                                    ))}
                                </ul>
                            </CardContent>
                        </Card>

                        <Card className="h-full">
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <CheckCircle className="w-5 h-5 text-green-600" />
                                    Keywords Found
                                </CardTitle>
                                <CardDescription>Skills detected by the ATS parser.</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="flex flex-wrap gap-2">
                                    {result.keywords.map((k, i) => (
                                        <span key={i} className="px-3 py-1 bg-secondary text-secondary-foreground rounded-md text-sm font-medium">
                                            {k}
                                        </span>
                                    ))}
                                </div>
                                {result.missingKeywords && result.missingKeywords.length > 0 && (
                                    <div className="mt-6">
                                        <h4 className="font-semibold text-sm text-red-600 mb-2">Missing Critical Keywords</h4>
                                        <div className="flex flex-wrap gap-2">
                                            {result.missingKeywords.map((k, i) => (
                                                <span key={i} className="px-3 py-1 bg-red-50 text-red-700 border border-red-100 rounded-md text-sm">
                                                    {k}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </CardContent>
                        </Card>
                    </div>

                    <div className="flex justify-center pt-8">
                        <Button
                            variant="outline"
                            size="lg"
                            onClick={() => { setResult(null); setFile(null); }}
                        >
                            Analyze Another Resume
                        </Button>
                    </div>
                </div>
            )}
        </div>
    );
}
