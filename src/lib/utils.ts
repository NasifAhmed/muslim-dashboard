import { type ClassValue, clsx } from "clsx";
import { DateTime } from "luxon";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export function timingFormatter(timing: string) {
    // const formatedTiming: PrayerTiming = {
    //     Fajr: "",
    //     Asr: "",
    //     Dhuhr: "",
    //     Firstthird: "",
    //     Imsak: "",
    //     Isha: "",
    //     Lastthird: "",
    //     Maghrib: "",
    //     Midnight: "",
    //     Sunrise: "",
    //     Sunset: "",
    // };
    // for (const key in timings) {
    //     if (timings.hasOwnProperty(key)) {
    //         const isoString = timings[key as keyof PrayerTiming];
    //         const dateTime = DateTime.fromISO(isoString);
    //         const readableFormat = dateTime.toLocaleString(
    //             DateTime.TIME_SIMPLE
    //         );
    //         formatedTiming[key as keyof PrayerTiming] = readableFormat;
    //     }
    // }
    const isoString = timing;
    const dateTime = DateTime.fromISO(isoString);
    const readableFormat = dateTime.toLocaleString(DateTime.TIME_SIMPLE);
    return readableFormat;
}
