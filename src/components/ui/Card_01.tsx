"use client";

import type React from "react";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";

interface HeadersResponse {
    [key: string]: string;
    http_version: string;
}

interface AnalysisResponse {
    service_name: string;
    status_code: number;
    content_length: string;
}

interface Card01Props {
    headers?: HeadersResponse | null;
    analysis?: AnalysisResponse | null;
    loading?: boolean;
}

const defaultProps: Card01Props = {
    headers: {
        "content-type": "application/json",
        "server": "nginx/1.18.0",
        http_version: "HTTP/1.1",
    },
    analysis: {
        service_name: "Example Service",
        status_code: 200,
        content_length: "512 bytes",
    },
    loading: false,
};

export default function Card_01({
                                    headers = defaultProps.headers,
                                    analysis = defaultProps.analysis,
                                    loading = defaultProps.loading,
                                }: Card01Props) {
    return (
        <div
            className={cn(
                "w-full max-w-5xl mx-auto",
                "bg-white/50 dark:bg-zinc-900/50 backdrop-blur-xl",
                "border border-zinc-200/50 dark:border-zinc-800/50",
                "rounded-3xl shadow-lg",
                "transition-all duration-300 ease-in-out",
                "hover:shadow-xl hover:shadow-zinc-200/20 dark:hover:shadow-zinc-900/20",
                "hover:border-zinc-300/50 dark:hover:border-zinc-700/50",
                "hover:translate-y-[-2px]"
            )}
        >
            <div className="divide-y divide-zinc-200/50 dark:divide-zinc-800/50">
                <div className="p-7">
                    {/* Header Section */}
                    <div className="flex items-center justify-between mb-5">
                        <h3 className="text-[18px] font-semibold text-zinc-900 dark:text-zinc-100 tracking-tight">
                            Analysis Results
                        </h3>
                        <div className="flex items-center gap-4">
                            <Link href="/">
                                <Button variant="outline" size="sm">
                                    Back to Analyzer
                                </Button>
                            </Link>
                        </div>
                    </div>

                    {/* Loading State */}
                    {loading ? (
                        <div className="space-y-4">
                            <Skeleton className="h-[200px] w-full rounded-2xl" />
                            <Skeleton className="h-[150px] w-full rounded-2xl" />
                        </div>
                    ) : (
                        <>
                            {/* Headers Section (Unchanged - Working Fine) */}
                            {headers && (
                                <div className="mb-6">
                                    <div className="flex items-center justify-between mb-3">
                                        <h4 className="text-[15px] font-medium text-zinc-900 dark:text-zinc-100">
                                            Response Headers
                                        </h4>
                                        <Badge variant="secondary" className="text-sm w-fit">
                                            {headers.http_version}
                                        </Badge>
                                    </div>
                                    <div
                                        className={cn(
                                            "p-4 rounded-2xl",
                                            "bg-linear-to-b from-zinc-50/50 to-white dark:from-zinc-800/30 dark:to-zinc-800/50",
                                            "border border-zinc-200/80 dark:border-zinc-700/80"
                                        )}
                                    >
                                        <div className="grid gap-2">
                                            {Object.entries(headers).map(([key, value]) =>
                                                    key !== "http_version" ? (
                                                        <div
                                                            key={key}
                                                            className="grid grid-cols-[200px_1fr] gap-2"
                                                        >
                                                            <span className="font-medium text-muted-foreground text-[13px] tracking-tight">
                                                                {key}:
                                                            </span>
                                                            <span className="break-all text-[13px] text-zinc-600 dark:text-zinc-300">
                                                                {value}
                                                            </span>
                                                        </div>
                                                    ) : null
                                            )}
                                        </div>
                                    </div>
                                </div>
                            )}

                            {/* Analysis Section (Fixed Badges) */}
                            {analysis && (
                                <div>
                                    <h4 className="text-[15px] font-medium text-zinc-900 dark:text-zinc-100 mb-3">
                                        Response Analysis
                                    </h4>
                                    <div
                                        className={cn(
                                            "p-4 rounded-2xl",
                                            "bg-linear-to-b from-zinc-50/50 to-white dark:from-zinc-800/30 dark:to-zinc-800/50",
                                            "border border-zinc-200/80 dark:border-zinc-700/80"
                                        )}
                                    >
                                        <div className="grid gap-3">
                                            <div className="grid grid-cols-[200px_1fr] gap-2 items-center">
                                            <span className="font-medium text-muted-foreground text-[13px] tracking-tight">
                                                Status Code:
                                            </span>
                                                <Badge
                                                    variant={analysis.status_code < 400 ? "default" : "destructive"}
                                                    className="w-fit max-w-fit inline-block shrink-0 !block-none"
                                                >
                                                    {analysis.status_code}
                                                </Badge>
                                            </div>
                                            <div className="grid grid-cols-[200px_1fr] gap-2">
                                            <span className="font-medium text-muted-foreground text-[13px] tracking-tight">
                                                Content Length:
                                            </span>
                                            <span className="text-[13px] text-zinc-600  dark:text-zinc-300">
                                                {analysis.content_length}
                                            </span>
                                            </div>
                                            <div className="grid grid-cols-[200px_1fr] gap-2 items-center">
                                            <span className="font-medium text-muted-foreground text-[13px] tracking-tight">
                                                Service Name:
                                            </span>
                                                <Badge
                                                    variant="outline"
                                                    className={cn(
                                                        "text-[12px] px-2 py-0.5 w-fit max-w-fit inline-block shrink-0" // Enforce tight fit
                                                    )}
                                                >
                                                    {analysis.service_name}
                                                </Badge>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </>
                    )}
                </div>
            </div>
        </div>
    );
}

// Example usage with useEffect for fetching data
export function Results() {
    const [headers, setHeaders] = useState<HeadersResponse | null>(null);
    const [analysis, setAnalysis] = useState<AnalysisResponse | null>(null);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const storedData = localStorage.getItem("analysisResults");
        if (storedData) {
            const data = JSON.parse(storedData);
            setHeaders({ ...data.headers, http_version: data.http_version });
            setAnalysis(data.analysis);
        }
        setLoading(false);
        localStorage.removeItem("analysisResults");
    }, []);

    return <Card_01 headers={headers} analysis={analysis} loading={loading} />;
}