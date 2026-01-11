import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "../ui/Button";
import { Menu, X } from "lucide-react";

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const location = useLocation();

    const navLinks = [
        { name: "Home", path: "/" },
        { name: "Analyze Resume", path: "/resume-analyzer" },
    ];

    return (
        <nav className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="container flex h-14 max-w-screen-2xl items-center justify-between px-4 sm:px-8">
                <Link to="/" className="mr-6 flex items-center space-x-2">
                    <span className="hidden font-bold sm:inline-block text-xl tracking-tight">
                        Resume<span className="text-primary">AI</span>
                    </span>
                </Link>

                {/* Desktop Nav */}
                <div className="hidden md:flex items-center space-x-6 text-sm font-medium">
                    {navLinks.map((link) => (
                        <Link
                            key={link.path}
                            to={link.path}
                            className={`transition-colors hover:text-foreground/80 ${location.pathname === link.path ? "text-foreground" : "text-foreground/60"
                                }`}
                        >
                            {link.name}
                        </Link>
                    ))}
                    <Button asChild variant="default" size="sm">
                        <Link to="/resume-analyzer">Get Started</Link>
                    </Button>
                </div>

                {/* Mobile Nav Toggle */}
                <button
                    className="md:hidden"
                    onClick={() => setIsOpen(!isOpen)}
                    aria-label="Toggle Menu"
                >
                    {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                </button>
            </div>

            {/* Mobile Nav Menu */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        className="md:hidden border-b bg-background"
                    >
                        <div className="container px-4 py-4 space-y-4 flex flex-col">
                            {navLinks.map((link) => (
                                <Link
                                    key={link.path}
                                    to={link.path}
                                    onClick={() => setIsOpen(false)}
                                    className={`text-sm font-medium transition-colors hover:text-primary ${location.pathname === link.path ? "text-foreground" : "text-muted-foreground"
                                        }`}
                                >
                                    {link.name}
                                </Link>
                            ))}
                            <Button asChild className="w-full" onClick={() => setIsOpen(false)}>
                                <Link to="/resume-analyzer">Get Started</Link>
                            </Button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    );
};

const Footer = () => {
    return (
        <footer className="border-t bg-muted/40">
            <div className="container flex flex-col items-center justify-between gap-4 py-10 md:h-24 md:flex-row md:py-0 max-w-screen-2xl px-4 sm:px-8">
                <div className="flex flex-col items-center gap-4 px-8 md:flex-row md:gap-2 md:px-0">
                    <p className="text-center text-sm leading-loose text-muted-foreground md:text-left">
                        Built by{" "}
                        <a
                            href="#"
                            target="_blank"
                            rel="noreferrer"
                            className="font-medium underline underline-offset-4"
                        >
                            Archit Saxena
                        </a>
                        . The source code is available on GitHub.
                    </p>
                </div>
            </div>
        </footer>
    );
};

const Layout = ({ children }) => {
    return (
        <div className="flex min-h-screen flex-col bg-background font-sans antialiased">
            <Navbar />
            <main className="flex-1">
                {children}
            </main>
            <Footer />
        </div>
    );
};

export { Navbar, Footer, Layout };
