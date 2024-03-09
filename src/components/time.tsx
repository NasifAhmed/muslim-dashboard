"use client";

import { StateContext } from "@/providers/stateProvider";

import React, { useCallback, useContext, useEffect, useState } from "react";
import { Card, CardContent } from "./ui/card";
import { timingFormatter } from "@/lib/utils";
import LiveTime from "./live-time";
import { Separator } from "./ui/separator";
import TimeRemaining from "./time-remaining";
import { Clock, RefreshCw } from "lucide-react";
import { DateTime } from "luxon";
import PingAnimation from "./ping-animation";
import useTime from "@/hooks/useTime";
import TimeRamadan from "./time-ramadan";
import { useRouter } from "next/navigation";

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

    const router = useRouter();

    useEffect(() => {
        if (window.localStorage.getItem("location")) {
            const valueFromStorage = window.localStorage.getItem(
                "location"
            ) as string;
            dispatch({
                type: "set location",
                payload: JSON.parse(valueFromStorage),
            });
            console.log("Loaded from storage");
        } else {
            router.push("/setup");
        }
    }, []);

    useEffect(() => {
        const dateToday = new Date();
        if (state.prayerTimingToday) {
            setTimeData({
                Fajr: state.prayerTimingToday.timings.Fajr,
                Dhuhr: state.prayerTimingToday.timings.Dhuhr,
                Asr: state.prayerTimingToday.timings.Asr,
                Maghrib: state.prayerTimingToday.timings.Maghrib,
                Isha: state.prayerTimingToday.timings.Isha,
            });
            // if (timeData) {
            //     setCurrentWaqt(() => getCurrentWaqt(timeData, new Date()));
            // }
        }
    }, [state.prayerTimingToday]);

    useEffect(() => {
        if (timeData) {
            setCurrentWaqt(() => getCurrentPrayerTime(new Date()));
            let currentTime = new Date();
            console.log("CURRENT WAQT", currentTime.toLocaleString());
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

    function waqtEndTime(waqt: string) {
        if (state.prayerTimingToday) {
            switch (waqt) {
                case "Fajr":
                    return state.prayerTimingToday.timings.Sunrise;
                case "Dhuhr":
                    return state.prayerTimingToday.timings.Asr;
                case "Asr":
                    return state.prayerTimingToday.timings.Sunset;
                case "Maghrib":
                    return state.prayerTimingToday.timings.Isha;
                case "Isha":
                    return state.prayerTimingToday.timings.Imsak;
                default:
                    return "";
            }
        }
    }

    return (
        <div className="transition-all">
            {timeData ? (
                <>
                    <div className="grid grid-rows-1 md:grid-rows-2 grid-cols-2 md:grid-cols-4 gap-5">
                        <Card className="col-span-2 md:col-start-2 md:col-end-4 flex items-center justify-evenly md:py-5 md:px-5 py-5 relative w-[90vw] md:w-full gap-4">
                            <div className="flex flex-col justify-center items-center gap-5">
                                <Clock size={48} />
                                <LiveTime className="text-base md:text-xl" />
                            </div>
                            <PingAnimation className="absolute left-5 top-5" />
                            <Separator orientation="vertical" />
                            {getCurrentPrayerTime(new Date()) ===
                                "BreakBeforeFajr" && (
                                <div className="flex flex-col justify-between gap-5">
                                    <h2 className="font-bold text-xl md:text-2xl text-center text-muted-foreground">
                                        Next Prayer
                                    </h2>
                                    <div>
                                        <h2 className="font-bold text-lg md:text-2xl text-center mb-2">
                                            Fajr
                                        </h2>
                                        <h3 className="text-center text-sm md:text-base font-semibold">
                                            {timingFormatter(
                                                state.prayerTimingToday?.timings
                                                    .Fajr as string
                                            )}
                                        </h3>
                                        <h4 className="text-center text-muted-foreground text-xs md:text-base font-semibold">
                                            to
                                        </h4>
                                        <h3 className="text-center text-sm md:text-base font-semibold">
                                            {timingFormatter(
                                                waqtEndTime(
                                                    "Fajr"
                                                )?.trim() as string
                                            )}
                                        </h3>
                                    </div>
                                </div>
                            )}

                            {getCurrentPrayerTime(new Date()) ===
                                "BreakAfterFajr" && (
                                <div className="flex flex-col justify-between gap-5">
                                    <h2 className="font-bold text-xl md:text-2xl text-center text-muted-foreground">
                                        Next Prayer
                                    </h2>
                                    <div>
                                        <h2 className="font-bold text-lg md:text-2xl text-center mb-2">
                                            Dhuhr
                                        </h2>
                                        <h3 className="text-center text-sm md:text-base font-semibold">
                                            {timingFormatter(
                                                state.prayerTimingToday?.timings
                                                    .Dhuhr as string
                                            )}
                                        </h3>
                                        <h4 className="text-center text-muted-foreground text-xs md:text-base font-semibold">
                                            to
                                        </h4>
                                        <h3 className="text-center text-sm md:text-base font-semibold">
                                            {timingFormatter(
                                                waqtEndTime(
                                                    "Dhuhr"
                                                )?.trim() as string
                                            )}
                                        </h3>
                                    </div>
                                </div>
                            )}

                            {getCurrentPrayerTime(new Date()) !==
                                "BreakAfterFajr" &&
                                getCurrentPrayerTime(new Date()) !==
                                    "BreakBeforeFajr" && (
                                    <>
                                        <div className="flex flex-col justify-between gap-5">
                                            <h2 className="font-bold text-xl md:text-2xl text-center">
                                                {currentWaqt}
                                            </h2>
                                            <h3 className="text-center text-xs font-semibold">
                                                {currentWaqt &&
                                                    timingFormatter(
                                                        timeData[
                                                            currentWaqt as keyof timeDataType
                                                        ]
                                                    )}{" "}
                                                <span className="text-muted-foreground">
                                                    to{" "}
                                                </span>
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
                                                    waqtEndTime(
                                                        currentWaqt
                                                    ) && (
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
                                    </>
                                )}
                        </Card>
                        <div className="hidden md:block" />
                        {Object.keys(timeData).map((key, index) => {
                            if (key === currentWaqt) {
                                return null;
                            }
                            if (
                                getCurrentPrayerTime(new Date()) ===
                                    "BreakBeforeFajr" &&
                                key === "Fajr"
                            ) {
                                return null;
                            }
                            if (
                                getCurrentPrayerTime(new Date()) ===
                                    "BreakAfterFajr" &&
                                key === "Dhuhr"
                            ) {
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
                                                timeData[
                                                    key as keyof timeDataType
                                                ]
                                            )}
                                        </h3>
                                        <h4 className="text-center text-muted-foreground text-xs md:text-base font-semibold">
                                            to
                                        </h4>
                                        <h3 className="text-center text-sm md:text-lg font-semibold">
                                            {timingFormatter(
                                                waqtEndTime(
                                                    key
                                                )?.trim() as string
                                            )}
                                        </h3>
                                    </div>
                                </Card>
                            );
                        })}
                    </div>
                    <Separator className="my-10" />
                    <div className="flex flex-col justify-center items-center">
                        <TimeRamadan />
                    </div>
                </>
            ) : (
                <RefreshCw size={90} className="animate-spin" />
            )}
        </div>
    );
}
