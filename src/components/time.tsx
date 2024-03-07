"use client";

import { StateContext } from "@/providers/stateProvider";

import React, { useCallback, useContext, useEffect, useState } from "react";
import { Card, CardContent } from "./ui/card";
import { timingFormatter } from "@/lib/utils";
import LiveTime from "./live-time";
import { Separator } from "./ui/separator";
import TimeRemaining from "./time-remaining";
import { Clock } from "lucide-react";
import { DateTime } from "luxon";
import PingAnimation from "./ping-animation";
import useTime from "@/hooks/useTime";

type timeDataType = {
    Fajr: string;
    Dhuhr: string;
    Asr: string;
    Maghrib: string;
    Isha: string;
};

export default function Time() {
    const { state, dispatch } = useContext(StateContext);
    const [timeData, setTimeData] = useState<timeDataType>();
    const [currentWaqt, setCurrentWaqt] = useState<string>();
    const { getCurrentPrayerTime, getTimeDifference, timeRemaining } =
        useTime();
    useEffect(() => {
        const dateToday = new Date();
        if (state.prayerTimingsAll) {
            setTimeData({
                Fajr: state.prayerTimingsAll[dateToday.getDate()].timings.Fajr,
                Dhuhr: state.prayerTimingsAll[dateToday.getDate()].timings
                    .Dhuhr,
                Asr: state.prayerTimingsAll[dateToday.getDate()].timings.Asr,
                Maghrib:
                    state.prayerTimingsAll[dateToday.getDate()].timings.Maghrib,
                Isha: state.prayerTimingsAll[dateToday.getDate()].timings.Isha,
            });
            // if (timeData) {
            //     setCurrentWaqt(() => getCurrentWaqt(timeData, new Date()));
            // }
        }
    }, [state.prayerTimingsAll]);

    useEffect(() => {
        if (timeData) {
            setCurrentWaqt(() => getCurrentPrayerTime(new Date()));
            console.log("CURRENT WAQT", getCurrentPrayerTime(new Date()));
        }
        const currentWaqtTimer = setInterval(() => {
            if (timeData) {
                setCurrentWaqt(() => getCurrentPrayerTime(new Date()));
            }
            console.log(currentWaqt);
        }, 60000);

        return () => clearInterval(currentWaqtTimer);
    }, [timeData]);

    // const getCurrentWaqt = useCallback(
    //     (timings: timeDataType, currentTime: Date) => {
    //         if (timeData) {
    //             for (let x in timings) {
    //                 console.log("current time", currentTime.getHours());
    //                 const startHour = DateTime.fromISO(
    //                     timeData[x as keyof timeDataType]
    //                 ).hour;
    //                 console.log("start time", startHour);
    //                 const endHour = DateTime.fromISO(
    //                     waqtEndTime(x) as string
    //                 ).hour;
    //                 console.log("end time", endHour);
    //                 if (
    //                     currentTime.getHours() > startHour &&
    //                     currentTime.getHours() < endHour
    //                 ) {
    //                     console.log("FOUND TIME", currentTime);
    //                     return x;
    //                 } else {
    //                     console.log("FOUND TIME", currentTime);
    //                     return "Isha";
    //                 }
    //             }
    //         }
    //     },
    //     [timeData]
    // );

    function waqtEndTime(waqt: string) {
        const dateToday = new Date();
        if (state.prayerTimingsAll) {
            switch (waqt) {
                case "Fajr":
                    return state.prayerTimingsAll[dateToday.getDate()].timings
                        .Sunrise;
                case "Dhuhr":
                    return state.prayerTimingsAll[dateToday.getDate()].timings
                        .Asr;
                case "Asr":
                    return state.prayerTimingsAll[dateToday.getDate()].timings
                        .Sunset;
                case "Maghrib":
                    return state.prayerTimingsAll[dateToday.getDate()].timings
                        .Isha;
                case "Isha":
                    return state.prayerTimingsAll[dateToday.getDate()].timings
                        .Imsak;
                default:
                    return "";
            }
        }
    }

    return (
        <div>
            {timeData ? (
                <div className="grid grid-rows-1 md:grid-rows-2 grid-cols-2 md:grid-cols-4 gap-5">
                    <Card className="col-span-2 md:col-start-2 md:col-end-4 flex items-center justify-evenly md:p-5 p-2 relative w-[90vw] md:w-full">
                        <div className="flex flex-col justify-center items-center gap-5">
                            <Clock size={48} />
                            <LiveTime className="text-base md:text-xl" />
                        </div>
                        <PingAnimation className="absolute left-5 top-5" />
                        {getCurrentPrayerTime(new Date()) !== "" && (
                            <Separator orientation="vertical" />
                        )}
                        {getCurrentPrayerTime(new Date()) !== "" && (
                            <div className="flex flex-col justify-between gap-5">
                                <h2 className="font-bold text-xl md:text-2xl text-center">
                                    {currentWaqt}
                                </h2>
                                <h3 className="text-center text-xs text-muted-foreground font-semibold">
                                    {currentWaqt &&
                                        timingFormatter(
                                            timeData[
                                                currentWaqt as keyof timeDataType
                                            ]
                                        )}{" "}
                                    to{" "}
                                    {currentWaqt &&
                                        timingFormatter(
                                            waqtEndTime(
                                                currentWaqt
                                            )?.trim() as string
                                        )}
                                </h3>
                                <div>
                                    <h3 className="text-center text-base font-semibold">
                                        Time Remaining
                                    </h3>
                                    {currentWaqt &&
                                        waqtEndTime(currentWaqt) && (
                                            <TimeRemaining
                                                className="text-center text-base text-muted-foreground"
                                                targetTime={
                                                    waqtEndTime(
                                                        currentWaqt
                                                    ) as string
                                                }
                                            />
                                        )}
                                </div>
                            </div>
                        )}
                    </Card>
                    <div className="hidden md:block" />
                    {Object.keys(timeData).map((key, index) => {
                        if (key === currentWaqt) {
                            return null;
                        }
                        return (
                            <Card
                                key={index}
                                className="flex md:max-w-60 aspect-square items-center justify-center p-6"
                            >
                                <div>
                                    <h2 className="font-bold text-lg md:text-3xl text-center mb-8">
                                        {key}
                                    </h2>
                                    <h3 className="text-center text-sm md:text-lg font-semibold">
                                        {timingFormatter(
                                            timeData[key as keyof timeDataType]
                                        )}
                                    </h3>
                                    <h4 className="text-center text-muted-foreground text-xs md:text-base font-semibold">
                                        to
                                    </h4>
                                    <h3 className="text-center text-sm md:text-lg font-semibold">
                                        {timingFormatter(
                                            waqtEndTime(key)?.trim() as string
                                        )}
                                    </h3>
                                </div>
                            </Card>
                        );
                    })}
                </div>
            ) : (
                <div>Loading....</div>
            )}
        </div>
    );
}
