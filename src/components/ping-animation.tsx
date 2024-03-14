import { cn } from "@/lib/utils";
import React from "react";

export default function PingAnimation({ className }: { className?: string }) {
  return (
    <div className={cn(className)}>
      <span className="relative flex h-3 w-3">
        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75"></span>
        <span className="relative inline-flex h-3 w-3 rounded-full bg-green-500"></span>
      </span>
    </div>
  );
}
