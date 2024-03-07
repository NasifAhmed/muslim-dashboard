import { cn } from "@/lib/utils";
import React from "react";

export default function PingAnimation({ className }: { className?: string }) {
    return (
        <div className={cn(className)}>
            <span className="relative flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
            </span>
        </div>
    );
}
