import { type ClassValue, clsx } from "clsx";
import { DateTime } from "luxon";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export function timingFormatter(timing: string) {
    const isoString = timing;
    const dateTime = DateTime.fromISO(isoString);
    const readableFormat = dateTime.toLocaleString(DateTime.TIME_SIMPLE);
    return readableFormat;
}
