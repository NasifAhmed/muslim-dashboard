"use client";

import { StateContext } from "@/providers/stateProvider";

import React, { useContext, useEffect, useState } from "react";
import { Card, CardContent } from "./ui/card";
import { timingFormatter } from "@/lib/utils";

type timeDataType = {
    Sehri: string;
    Iftar: string;
};

export default function TimeRamadan() {
    const { state, dispatch } = useContext(StateContext);
    const [timeData, setTimeData] = useState<timeDataType>();
    useEffect(() => {
        const dateToday = new Date();
        if (state.prayerTimingToday) {
            setTimeData({
                Iftar: state.prayerTimingToday.timings.Maghrib,
                Sehri: state.prayerTimingToday.timings.Imsak,
            });
        }
    }, [state.prayerTimingToday]);

    return (
        <div>
            {timeData ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <Card className="md:w-full aspect-square flex items-center justify-center md:p-14 p-5 w-[60vw]">
                        <div className="flex flex-col justify-between gap-5">
                            <h2 className="font-bold text-2xl md:text-3xl text-center">
                                Sehri
                            </h2>
                            <h3 className="text-center text-base md:text-lg font-semibold">
                                {timeData && timingFormatter(timeData.Sehri)}
                            </h3>
                        </div>
                    </Card>
                    <Card className="w-full aspect-square flex items-center justify-center md:p-14 p-5">
                        <div className="flex flex-col justify-between gap-5">
                            <h2 className="font-bold text-2xl md:text-3xl text-center">
                                Iftar
                            </h2>
                            <h3 className="text-center text-base md:text-lg font-semibold">
                                {timeData && timingFormatter(timeData.Iftar)}
                            </h3>
                        </div>
                    </Card>
                </div>
            ) : (
                <div>Loading....</div>
            )}
        </div>
    );
}
