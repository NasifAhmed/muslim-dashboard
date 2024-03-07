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
        let differenceHours = Math.abs(end.getHours() - start.getHours());
        let differenceMinutes = Math.abs(end.getMinutes() - start.getMinutes());

        return `${differenceHours} hours ${differenceMinutes} minutes`;
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
        };

        type prayerTimeDataType = {
            Fajr: string;
            Dhuhr: string;
            Asr: string;
            Maghrib: string;
            Isha: string;
        };

        for (const prayerTime in prayerTimes) {
            console.log("current time", prayerTime, currentTime);
            const startMs = new Date(
                prayerTimes[prayerTime as keyof prayerTimeDataType]
                    .start as string
            );
            console.log("start time", prayerTime, startMs);
            const endMs = new Date(
                prayerTimes[prayerTime as keyof prayerTimeDataType]
                    .end as string
            );
            console.log("end time", prayerTime, endMs);

            if (currentTime >= startMs && currentTime <= endMs) {
                console.log("found time", endMs);
                return prayerTime;
            } else if (startMs > endMs) {
                return "Isha";
            }
        }

        return "";
    }

    return { timeRemaining, getTimeDifference, getCurrentPrayerTime };
}
