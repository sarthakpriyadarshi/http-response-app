"use client";

import { useState } from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { useRouter } from "next/navigation";
import { Toaster, toast } from "sonner";
import { Button } from "@/components/ui/button";
import { PlaceholdersAndVanishInput } from "@/components/ui/placeholders-and-vanish-input";
import { Cover } from "@/components/ui/cover";
import { Skeleton } from "@/components/ui/skeleton";

export default function Home() {
    const [url, setUrl] = useState<string>("");
    const [loading, setLoading] = useState<boolean>(false);
    const { theme, setTheme } = useTheme();
    const router = useRouter();
    const placeholders = [
        "Enter URL (e.g., https://example.com)",
        "Try a different website",
        "Analyze any public URL",
        "Discover HTTP response details",
    ];

    const handleAnalyze = async (e?: React.FormEvent<HTMLFormElement>) => {
        if (e) e.preventDefault();

        if (!url) {
            toast.error("Please enter a URL");
            return;
        }

        setLoading(true);
        try {
            const res = await fetch("http://backend:8000/analyze", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ url }),
                credentials: "same-origin", // Optional: Ensures credentials are included if needed
            });

            if (!res.ok) {
                const errorText = await res.text(); // Get error details for better debugging
                throw new Error(`HTTP error! Status: ${res.status} - ${errorText}`);
            }

            const data = await res.json();

            console.debug("Analysis results:", data);
            localStorage.setItem("analysisResults", JSON.stringify(data));
            router.push("/results");
        } catch (error: unknown) {
            console.error("Error:", error);
            if (error instanceof Error) {
                toast.error(`Failed to analyze URL: ${error.message}`);
            } else {
                toast.error("Failed to analyze URL: An unknown error occurred");
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center p-4 transition-colors duration-200">
            <Toaster position="top-center" />
            <div className="mx-auto max-w-5xl space-y-8">
                <div className="flex items-start justify-between">
                    <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => setTheme(theme === "light" ? "dark" : "light")}
                    >
                        <Sun className="h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                        <Moon className="absolute h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                        <span className="sr-only">Toggle theme</span>
                    </Button>
                    <h1 className="text-4xl md:text-4xl lg:text-6xl font-semibold max-w-7xl mx-auto text-center mt-6 relative z-20 py-6 bg-clip-text text-transparent bg-gradient-to-b from-neutral-800 via-neutral-700 to-neutral-700 dark:from-neutral-800 dark:via-white dark:to-white">
                        Analyze Responses at <Cover>warp speed</Cover>
                    </h1>
                </div>
                {loading ? (
                    <Skeleton className="h-12 w-full max-w-xl mx-auto rounded-full" />
                ) : (
                    <PlaceholdersAndVanishInput
                        placeholders={placeholders}
                        onChange={(e) => setUrl(e.target.value)}
                        onSubmit={handleAnalyze}
                    />
                )}
            </div>
        </div>
    );
}