"use client";

import { StateContext } from "@/providers/stateProvider";
import { useContext } from "react";

const moment = require("moment");

export default function useTime() {
    const { state } = useContext(StateContext);

    function timeRemaining(targetIsoString: string) {
        const currentTime = new moment();
        const targetTime = new moment(targetIsoString, "h:mm A");

        const timeDiff = moment.duration(currentTime.diff(targetTime));

        const hours = Math.floor(timeDiff.asHours());
        const minutes = timeDiff.minutes();
        const seconds = timeDiff.seconds();

        return `${hours} hours ${minutes} minutes`;
    }

    function getTimeDifference(endTime: string) {
        const start = new Date();
        const end = new Date(endTime);

        console.log("---------------------------------------------");
        console.log("start time", start);
        console.log("endt time", end);

        // Calculate the difference in milliseconds
        let difference = Math.abs(end.getTime() - start.getTime());

        const differenceMinutes: number = Math.floor(difference / (1000 * 60));

        const hours = Math.floor(differenceMinutes / 60);
        const minutes = differenceMinutes % 60;
        if (hours === 0) {
            return `${minutes} minutes`;
        } else if (minutes === 0) {
            return `${hours} hours`;
        } else {
            return `${hours} hours ${minutes} minutes`;
        }
    }

    function getCurrentPrayerTime(currentTime: Date) {
        const currentTimeMs = new Date(currentTime).getTime();
        const timings =
            state.prayerTimingToday && state.prayerTimingToday.timings;

        const prayerTimes = {
            Fajr: {
                start: timings?.Fajr,
                end: timings?.Sunrise,
            },
            Dhuhr: {
                start: timings?.Dhuhr,
                end: timings?.Asr,
            },
            Asr: {
                start: timings?.Asr,
                end: timings?.Sunset,
            },
            Maghrib: {
                start: timings?.Maghrib,
                end: timings?.Isha,
            },
            Isha: {
                start: timings?.Isha,
                end: timings?.Imsak,
            },
            BreakAfterFajr: {
                start: timings?.Sunrise,
                end: timings?.Dhuhr,
            },
            BreakBeforeFajr: {
                start: timings?.Imsak,
                end: timings?.Fajr,
            },
        };

        type prayerTimeDataType = {
            Fajr: string;
            Dhuhr: string;
            Asr: string;
            Maghrib: string;
            Isha: string;
            BreakAfterFajr: string;
            BreakBeforeFajr: string;
        };

        for (const prayerTime in prayerTimes) {
            const startMs = new Date(
                prayerTimes[prayerTime as keyof prayerTimeDataType]
                    .start as string
            );
            const endMs = new Date(
                prayerTimes[prayerTime as keyof prayerTimeDataType]
                    .end as string
            );

            if (currentTime >= startMs && currentTime <= endMs) {
                console.log("found time", endMs);
                return prayerTime;
            }
        }

        return "";
    }

    return { timeRemaining, getTimeDifference, getCurrentPrayerTime };
}
