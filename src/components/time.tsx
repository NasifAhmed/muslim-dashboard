"use client";

import { StateContext } from "@/providers/stateProvider";

import React, { useContext, useEffect, useState } from "react";
import { Card, CardContent } from "./ui/card";
import { timingFormatter } from "@/lib/utils";

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
            setCurrentWaqt("Dhuhr");
        }
    }, [state.prayerTimingsAll]);

    function waqtEndTime(waqt: string) {
        const dateToday = new Date();
        if (state.prayerTimingsAll) {
            switch (waqt) {
                case "Fajr":
                    return timingFormatter(
                        state.prayerTimingsAll[dateToday.getDate()].timings
                            .Sunrise
                    );
                case "Dhuhr":
                    return timingFormatter(
                        state.prayerTimingsAll[dateToday.getDate()].timings.Asr
                    );
                case "Asr":
                    return timingFormatter(
                        state.prayerTimingsAll[dateToday.getDate()].timings
                            .Sunset
                    );
                case "Maghrib":
                    return timingFormatter(
                        state.prayerTimingsAll[dateToday.getDate()].timings.Isha
                    );
                case "Isha":
                    return timingFormatter(
                        state.prayerTimingsAll[dateToday.getDate()].timings
                            .Imsak
                    );
                default:
                    return "";
            }
        }
    }

    return (
        <div>
            {timeData ? (
                <div className="grid grid-rows-1 md:grid-rows-2 grid-cols-2 md:grid-cols-4 gap-5">
                    <Card className="col-span-2 md:col-start-2 md:col-end-4 flex items-center justify-center md:p-5 p-2">
                        <div className="flex flex-col justify-between gap-5">
                            <h2 className="font-bold text-2xl md:text-3xl text-center">
                                {currentWaqt}
                            </h2>
                            <h3 className="text-center text-base md:text-lg font-semibold">
                                {currentWaqt &&
                                    timingFormatter(
                                        timeData[
                                            currentWaqt as keyof timeDataType
                                        ]
                                    )}
                            </h3>
                            <h4 className="text-center text-muted-foreground text-sm md:text-base font-semibold">
                                to
                            </h4>
                            <h3 className="text-center text-base md:text-lg font-semibold">
                                {currentWaqt && waqtEndTime(currentWaqt)}
                            </h3>
                        </div>
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
                                        {waqtEndTime(key)}
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
