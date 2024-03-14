"use client";

import { cn, zeroPrefixer } from "@/lib/utils";
import { useEffect, useState } from "react";

export default function LiveTime({ className }: { className?: string }) {
  const [time, setTime] = useState<Date>(new Date());
  useEffect(() => {
    const liveTimer = setInterval(() => setTime(new Date()), 1000);

    return () => clearInterval(liveTimer);
  }, []);
  return (
    <div className={cn(className)}>
      {time && (
        <div>
          {`${zeroPrefixer(
            time.getHours() % 12 || 12,
          )} : ${zeroPrefixer(time.getMinutes())} : ${zeroPrefixer(
            time.getSeconds(),
          )}
                    ${time.getHours() >= 12 ? "PM" : "AM"}`}
        </div>
      )}
    </div>
  );
}
