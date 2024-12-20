import { ThemeToggle } from "@/components/ThemeToggle";
import { Button } from "@/components/ui/button";
import React, { useState } from "react";
import { Menu, X } from "lucide-react";
import { Link } from "react-router-dom"; // Add this import

const Header = () => {
    const [menuOpen, setMenuOpen] = useState(false);

    return (
        <header className="fixed top-0 w-full bg-background/80 backdrop-blur-sm z-50 border-b border-border/40">
            <div className="container mx-auto px-4 h-16 flex items-center justify-between">
                <a href="/" className="flex items-center space-x-2 hover:opacity-90 transition-opacity">
                    <h1 className="text-2xl font-bold tracking-tight">
                        Mind<span className="text-revigreen">master</span>
                    </h1>
                </a>
                <div className="flex items-center gap-6">
                    <div className="hidden md:flex items-center gap-6">
                        
                        <Link to="/how-it-works">
                            <Button
                             variant="ghost"
                             className="hover:bg-secondary hover:text-black dark:hover:bg-secondary dark:hover:text-white transition-colors">
                                How it works
                            </Button>
                        </Link>
                        <Button 
                            variant="ghost"
                            className="hover:bg-secondary hover:text-black dark:hover:bg-secondary dark:hover:text-white transition-colors"
                            onClick={() => window.location.href = "/faqs"}
                        >
                            FAQs
                        </Button>
                        <Button 
                            onClick={() => window.location.href = "/signin"}
                            className="bg-revigreen hover:bg-[#FDFC47] hover:text-black"
                        >
                            Sign In
                        </Button>
                        <ThemeToggle />
                    </div>
                    <button
                        className="md:hidden"
                        onClick={() => setMenuOpen(!menuOpen)}
                    >
                        {menuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                    </button>
                </div>
            </div>
            {menuOpen && (
                <div className="md:hidden flex flex-col items-center gap-4 mt-4">
                    <ThemeToggle />
                    <Link to="/how-it-works">
                        <Button variant="secondary" onClick={() => setMenuOpen(false)}>
                            How it works
                        </Button>
                    </Link>
                    <Button 
                        variant="secondary"
                        onClick={() => {
                            setMenuOpen(false);
                            window.location.href = "/faqs";
                        }}
                    >
                        FAQs
                    </Button>
                    <Button 
                        onClick={() => {
                            setMenuOpen(false);
                            window.location.href = "/signin";
                        }}
                        className="bg-revigreen hover:bg-[#FDFC47] hover:text-black"
                    >
                        Sign In
                    </Button>
                </div>
            )}
        </header>
    );
}

export default Header;

