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
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
          <Card className="flex aspect-square w-[60vw] items-center justify-center p-5 md:w-full md:p-14">
            <div className="flex flex-col justify-between gap-5">
              <h2 className="text-center text-2xl font-bold md:text-3xl">
                Sehri
              </h2>
              <h3 className="text-center text-base font-semibold md:text-lg">
                {timeData && timingFormatter(timeData.Sehri)}
              </h3>
            </div>
          </Card>
          <Card className="flex aspect-square w-full items-center justify-center p-5 md:p-14">
            <div className="flex flex-col justify-between gap-5">
              <h2 className="text-center text-2xl font-bold md:text-3xl">
                Iftar
              </h2>
              <h3 className="text-center text-base font-semibold md:text-lg">
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
