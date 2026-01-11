import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button } from '../components/ui/Button';
import { FileText, CheckCircle, Zap } from 'lucide-react';

export default function Home() {
    return (
        <div className="flex flex-col min-h-screen">
            <section className="relative overflow-hidden pt-20 pb-32 md:pt-32 md:pb-48">
                <div className="container px-4 text-center z-10 relative">
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        className="text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl mb-6 bg-clip-text text-transparent bg-gradient-to-r from-foreground to-foreground/70"
                    >
                        Master Your Job Search <br className="hidden sm:inline" />
                        <span className="text-primary">With AI Intelligence</span>
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.1 }}
                        className="mx-auto mt-4 max-w-[700px] text-lg text-muted-foreground md:text-xl mb-10"
                    >
                        Get instant feedback, ATS optimization scoring, and personalized improvement tips powered by advanced AI.
                    </motion.p>
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        className="flex flex-wrap items-center justify-center gap-4"
                    >
                        <Button asChild size="lg" className="rounded-full px-8 text-base h-12">
                            <Link to="/resume-analyzer">Analyze My Resume</Link>
                        </Button>
                        <Button asChild variant="outline" size="lg" className="rounded-full px-8 text-base h-12">
                            <Link to="#">View Demo</Link>
                        </Button>
                    </motion.div>
                </div>

                {/* Decorative Elements */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] opacity-10 bg-gradient-to-tr from-primary to-purple-500 blur-[100px] -z-10 rounded-full" />
            </section>

            <section className="py-20 bg-secondary/30">
                <div className="container px-4">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <FeatureCard
                            icon={<Zap className="w-8 h-8 text-yellow-500" />}
                            title="Instant Analysis"
                            description="Get prompt feedback on your resume's strengths and weaknesses in seconds."
                            delay={0.1}
                        />
                        <FeatureCard
                            icon={<CheckCircle className="w-8 h-8 text-green-500" />}
                            title="ATS Optimization"
                            description="Identify missing keywords and format issues that might be blocking your application."
                            delay={0.2}
                        />
                        <FeatureCard
                            icon={<FileText className="w-8 h-8 text-blue-500" />}
                            title="Actionable Insights"
                            description="Receive specific, tailored advice on how to improve your bullet points and skills."
                            delay={0.3}
                        />
                    </div>
                </div>
            </section>
        </div>
    );
}

function FeatureCard({ icon, title, description, delay }) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay }}
            className="flex flex-col items-center text-center p-8 bg-card rounded-2xl border shadow-sm hover:shadow-md transition-shadow"
        >
            <div className="p-4 bg-background rounded-full shadow-sm mb-6">
                {icon}
            </div>
            <h3 className="text-xl font-bold mb-3">{title}</h3>
            <p className="text-muted-foreground leading-relaxed">{description}</p>
        </motion.div>
    );
}
