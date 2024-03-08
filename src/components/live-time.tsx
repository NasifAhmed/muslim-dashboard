"use client";

import { cn } from "@/lib/utils";
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
                    {`${time.getHours() % 12 || 12} : ${time.getMinutes()} : ${
                        time.getSeconds() < 10
                            ? `0${time.getSeconds()}`
                            : time.getSeconds()
                    }
                    ${time.getHours() >= 12 ? "PM" : "AM"}`}
                </div>
            )}
        </div>
    );
}
