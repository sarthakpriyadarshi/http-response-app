"use client";

import { useEffect, useState } from "react";
import type React from "react";
import { cn } from "@/lib/utils";
import { MoreHorizontal } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Switch } from "@/components/ui/switch";
import pretty from "pretty";

// Interfaces
interface HeadersResponse {
    [key: string]: string;
    http_version: string;
}

interface AnalysisResponse {
    service_name: string;
    status_code: number;
    content_length: string;
}

interface BodyResponse {
    body: string;
}

// Headers Card Component
interface HeadersCardProps {
    headers?: HeadersResponse | null;
    loading?: boolean;
}

const defaultHeadersProps: HeadersCardProps = {
    headers: {
        "content-type": "application/json",
        "server": "nginx/1.18.0",
        http_version: "HTTP/1.1",
    },
    loading: false,
};

function HeadersCard({
                         headers = defaultHeadersProps.headers,
                         loading = defaultHeadersProps.loading,
                     }: HeadersCardProps) {
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
                    <div className="flex items-center justify-between mb-5">
                        <h3 className="text-[18px] font-semibold text-zinc-900 dark:text-zinc-100 tracking-tight">
                            Response Headers
                        </h3>
                        <button
                            type="button"
                            className={cn(
                                "p-2 rounded-full",
                                "transition-all duration-200",
                                "hover:bg-zinc-100/80 dark:hover:bg-zinc-800/80",
                                "active:bg-zinc-200 dark:active:bg-zinc-700"
                            )}
                        >
                            <MoreHorizontal className="w-5 h-5 text-zinc-400" />
                        </button>
                    </div>

                    {loading ? (
                        <Skeleton className="h-[200px] w-full rounded-2xl" />
                    ) : (
                        headers && (
                            <div>
                                <div className="flex items-center justify-end mb-3">
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
                                                    <div key={key} className="grid grid-cols-[200px_1fr] gap-2">
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
                        )
                    )}
                </div>
            </div>
        </div>
    );
}

// Analysis Card Component
interface AnalysisCardProps {
    analysis?: AnalysisResponse | null;
    loading?: boolean;
}

const defaultAnalysisProps: AnalysisCardProps = {
    analysis: {
        service_name: "Example Service",
        status_code: 200,
        content_length: "512 bytes",
    },
    loading: false,
};

function AnalysisCard({
                          analysis = defaultAnalysisProps.analysis,
                          loading = defaultAnalysisProps.loading,
                      }: AnalysisCardProps) {
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
                    <div className="flex items-center justify-between mb-5">
                        <h3 className="text-[18px] font-semibold text-zinc-900 dark:text-zinc-100 tracking-tight">
                            Response Analysis
                        </h3>
                        <button
                            type="button"
                            className={cn(
                                "p-2 rounded-full",
                                "transition-all duration-200",
                                "hover:bg-zinc-100/80 dark:hover:bg-zinc-800/80",
                                "active:bg-zinc-200 dark:active:bg-zinc-700"
                            )}
                        >
                            <MoreHorizontal className="w-5 h-5 text-zinc-400" />
                        </button>
                    </div>

                    {loading ? (
                        <Skeleton className="h-[150px] w-full rounded-2xl" />
                    ) : (
                        analysis && (
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
                                            className="text-[12px] w-fit"
                                        >
                                            {analysis.status_code}
                                        </Badge>
                                    </div>
                                    <div className="grid grid-cols-[200px_1fr] gap-2">
                    <span className="font-medium text-muted-foreground text-[13px] tracking-tight">
                      Content Length:
                    </span>
                                        <span className="text-[13px] text-zinc-600 dark:text-zinc-300">
                      {analysis.content_length}
                    </span>
                                    </div>
                                    <div className="grid grid-cols-[200px_1fr] gap-2 items-center">
                    <span className="font-medium text-muted-foreground text-[13px] tracking-tight">
                      Service Name:
                    </span>
                                        <Badge variant="outline" className="text-[12px] w-fit">
                                            {analysis.service_name}
                                        </Badge>
                                    </div>
                                </div>
                            </div>
                        )
                    )}
                </div>
            </div>
        </div>
    );
}

// Body Card Component
interface BodyCardProps {
    body?: BodyResponse | null;
    loading?: boolean;
}

const defaultBodyProps: BodyCardProps = {
    body: {
        body: "No content available",
    },
    loading: false,
};

function BodyCard({
                      body = defaultBodyProps.body,
                      loading = defaultBodyProps.loading,
                  }: BodyCardProps) {
    const [renderContent, setRenderContent] = useState(false); // Render vs Code view
    const [isPrettified, setIsPrettified] = useState(true); // Pretty vs Raw HTML view

    const detectContentType = (body: string): "html" | "json" | "text" => {
        try {
            JSON.parse(body);
            return "json";
        } catch {
            if (body.match(/<[^>]+>/)) {
                return "html";
            }
            return "text";
        }
    };

    const renderBodyContent = () => {
        if (!body?.body) {
            return <div className="text-zinc-500 dark:text-zinc-400">No body content available</div>;
        }

        const contentType = detectContentType(body.body);

        if (!renderContent) {
            // Code view
            if (contentType === "json") {
                return (
                    <pre className="bg-zinc-100 dark:bg-zinc-800 p-4 rounded-md overflow-auto">
            <code className="text-sm text-zinc-800 dark:text-zinc-200">
              {JSON.stringify(JSON.parse(body.body), null, 2)}
            </code>
          </pre>
                );
            }
            return (
                <pre className="bg-zinc-100 dark:bg-zinc-800 p-4 rounded-md overflow-auto">
          <code className="text-sm text-zinc-800 dark:text-zinc-200">
            {contentType === "html" && isPrettified ? pretty(body.body) : body.body}
          </code>
        </pre>
            );
        }

        // Rendered view
        switch (contentType) {
            case "html":
                const htmlToRender = isPrettified ? pretty(body.body) : body.body;
                return (
                    <div
                        className="prose max-w-none dark:prose-invert text-zinc-900 dark:text-zinc-100"
                        dangerouslySetInnerHTML={{ __html: htmlToRender }}
                    />
                );
            case "json":
                try {
                    const parsedJson = JSON.parse(body.body);
                    return (
                        <pre className="bg-zinc-100 dark:bg-zinc-800 p-4 rounded-md overflow-auto">
              <code className="text-sm text-zinc-800 dark:text-zinc-200">
                {JSON.stringify(parsedJson, null, 2)}
              </code>
            </pre>
                    );
                } catch {
                    return <div className="text-red-500">Invalid JSON content</div>;
                }
            case "text":
                return (
                    <div className="whitespace-pre-wrap bg-zinc-100 dark:bg-zinc-800 p-4 rounded-md text-zinc-800 dark:text-zinc-200">
                        {body.body}
                    </div>
                );
            default:
                return <div className="text-zinc-600 dark:text-zinc-300">{body.body}</div>;
        }
    };

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
                    <div className="flex items-center justify-between mb-5">
                        <h3 className="text-[18px] font-semibold text-zinc-900 dark:text-zinc-100 tracking-tight">
                            Response Body
                        </h3>
                        <div className="flex items-center gap-4">
                            <div className="flex items-center gap-2">
                <span className="text-sm text-zinc-600 dark:text-zinc-400">
                  {renderContent ? "Rendered" : "Code"}
                </span>
                                <Switch
                                    checked={renderContent}
                                    onCheckedChange={setRenderContent}
                                    aria-label="Toggle render or code view"
                                />
                            </div>
                            {detectContentType(body?.body || "") === "html" && (
                                <div className="flex items-center gap-2">
                  <span className="text-sm text-zinc-600 dark:text-zinc-400">
                    {isPrettified ? "Pretty" : "Raw"}
                  </span>
                                    <Switch
                                        checked={isPrettified}
                                        onCheckedChange={setIsPrettified}
                                        aria-label="Toggle pretty or raw HTML"
                                    />
                                </div>
                            )}
                            <button
                                type="button"
                                className={cn(
                                    "p-2 rounded-full",
                                    "transition-all duration-200",
                                    "hover:bg-zinc-100/80 dark:hover:bg-zinc-800/80",
                                    "active:bg-zinc-200 dark:active:bg-zinc-700"
                                )}
                            >
                                <MoreHorizontal className="w-5 h-5 text-zinc-400" />
                            </button>
                        </div>
                    </div>

                    {loading ? (
                        <Skeleton className="h-[200px] w-full rounded-2xl" />
                    ) : (
                        <div>
                            <div className="flex items-center justify-end mb-3">
                                <Badge variant="secondary" className="text-sm w-fit">
                                    {body?.body ? detectContentType(body.body).toUpperCase() : "N/A"}
                                </Badge>
                            </div>
                            <div
                                className={cn(
                                    "p-4 rounded-2xl",
                                    "bg-linear-to-b from-zinc-50/50 to-white dark:from-zinc-800/30 dark:to-zinc-800/50",
                                    "border border-zinc-200/80 dark:border-zinc-700/80"
                                )}
                            >
                                {renderBodyContent()}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

// Results Page Component
export default function Page() {
    const [headers, setHeaders] = useState<HeadersResponse | null>(null);
    const [analysis, setAnalysis] = useState<AnalysisResponse | null>(null);
    const [body, setBody] = useState<BodyResponse | null>(null);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const storedData = localStorage.getItem("analysisResults");
        if (storedData) {
            const data = JSON.parse(storedData);
            setHeaders({ ...data.headers, http_version: data.http_version });
            setAnalysis(data.analysis);
            setBody({ body: data.body || "No body content" });
        }
        setLoading(false);
        localStorage.removeItem("analysisResults");
    }, []);

    return (
        <div className="min-h-screen p-4 transition-colors duration-200">
            <div className="mx-auto max-w-5xl space-y-8">
                <div className="flex items-center justify-between">
                    <h1 className="text-3xl font-bold tracking-tight">Analysis Results</h1>
                    <Link href="/">
                        <Button variant="outline">Back to Analyzer</Button>
                    </Link>
                </div>
                <AnalysisCard analysis={analysis} loading={loading} />
                <HeadersCard headers={headers} loading={loading} />
                <BodyCard body={body} loading={loading} />
            </div>
        </div>
    );
}