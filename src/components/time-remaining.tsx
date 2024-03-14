"use client";

import useTime from "@/hooks/useTime";
import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";

export default function TimeRemaining({
  className,
  targetTime,
}: {
  className?: string;
  targetTime: string;
}) {
  const { getCurrentPrayerTime, getTimeDifference, timeRemaining } = useTime();
  const [time, setTime] = useState<string>(getTimeDifference(targetTime));

  useEffect(() => {
    const remainingTimer = setInterval(() => {
      setTime(getTimeDifference(targetTime));
    }, 60000);

    return () => clearInterval(remainingTimer);
  }, []);
  return <div className={cn(className)}>{time && <div>{time}</div>}</div>;
}
