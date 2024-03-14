"use client";

import { StateContext } from "@/providers/stateProvider";

import React, { useContext, useEffect, useState } from "react";
import { Card } from "./ui/card";
import { timingFormatter } from "@/lib/utils";
import LiveTime from "./live-time";
import { Separator } from "./ui/separator";
import TimeRemaining from "./time-remaining";
import { Clock, RefreshCw } from "lucide-react";
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
  const { getCurrentPrayerTime } = useTime();

  const router = useRouter();

  useEffect(() => {
    if (window.localStorage.getItem("location")) {
      const valueFromStorage = window.localStorage.getItem(
        "location",
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
          <div className="grid grid-cols-2 grid-rows-1 gap-5 md:grid-cols-4 md:grid-rows-2">
            <Card className="relative col-span-2 flex w-[90vw] items-center justify-evenly gap-4 py-5 md:col-start-2 md:col-end-4 md:w-full md:px-5 md:py-5">
              <div className="flex flex-col items-center justify-center gap-5">
                <Clock size={48} />
                <LiveTime className="text-base md:text-xl" />
              </div>
              <PingAnimation className="absolute left-5 top-5" />
              <Separator orientation="vertical" />
              {getCurrentPrayerTime(new Date()) === "BreakBeforeFajr" && (
                <div className="flex flex-col justify-between gap-5">
                  <h2 className="text-center text-xl font-bold text-muted-foreground md:text-2xl">
                    Next Prayer
                  </h2>
                  <h2 className="mb-2 text-center text-lg font-bold md:text-2xl">
                    Fajr
                  </h2>
                  <h3 className="text-center text-xs font-semibold">
                    {timingFormatter(
                      state.prayerTimingToday?.timings.Fajr as string,
                    )}{" "}
                    <span className="text-muted-foreground">to </span>
                    {timingFormatter(waqtEndTime("Fajr")?.trim() as string)}
                  </h3>
                  <div>
                    <h3 className="text-center text-base font-semibold">
                      Time Remaining Until Fajr
                    </h3>
                    {
                      <TimeRemaining
                        className="text-center text-base text-muted-foreground"
                        targetTime={
                          state.prayerTimingToday?.timings.Fajr as string
                        }
                      />
                    }
                  </div>
                </div>
              )}

              {getCurrentPrayerTime(new Date()) === "BreakAfterFajr" && (
                <div className="flex flex-col justify-between gap-5">
                  <h2 className="text-center text-xl font-bold text-muted-foreground md:text-2xl">
                    Next Prayer
                  </h2>
                  <h2 className="mb-2 text-center text-lg font-bold md:text-2xl">
                    Dhuhr
                  </h2>
                  <h3 className="text-center text-xs font-semibold">
                    {timingFormatter(
                      state.prayerTimingToday?.timings.Dhuhr as string,
                    )}{" "}
                    <span className="text-muted-foreground">to </span>
                    {timingFormatter(waqtEndTime("Dhuhr")?.trim() as string)}
                  </h3>
                  <div>
                    <h3 className="text-center text-base font-semibold">
                      Time Remaining Until Dhuhr
                    </h3>
                    {
                      <TimeRemaining
                        className="text-center text-base text-muted-foreground"
                        targetTime={
                          state.prayerTimingToday?.timings.Dhuhr as string
                        }
                      />
                    }
                  </div>
                </div>
              )}

              {getCurrentPrayerTime(new Date()) === "BreakAfterSunset" && (
                <div className="flex flex-col justify-between gap-5">
                  <h2 className="text-center text-xl font-bold text-muted-foreground md:text-2xl">
                    Next Prayer
                  </h2>
                  <h2 className="mb-2 text-center text-lg font-bold md:text-2xl">
                    Maghrib
                  </h2>
                  <h3 className="text-center text-xs font-semibold">
                    {timingFormatter(
                      state.prayerTimingToday?.timings.Maghrib as string,
                    )}{" "}
                    <span className="text-muted-foreground">to </span>
                    {timingFormatter(waqtEndTime("Maghrib")?.trim() as string)}
                  </h3>
                  <div>
                    <h3 className="text-center text-base font-semibold">
                      Time Remaining Until Maghrib
                    </h3>
                    {
                      <TimeRemaining
                        className="text-center text-base text-muted-foreground"
                        targetTime={
                          state.prayerTimingToday?.timings.Maghrib as string
                        }
                      />
                    }
                  </div>
                </div>
              )}

              {getCurrentPrayerTime(new Date()) !== "BreakAfterFajr" &&
                getCurrentPrayerTime(new Date()) !== "BreakBeforeFajr" &&
                getCurrentPrayerTime(new Date()) !== "BreakAfterSunset" && (
                  <>
                    <div className="flex flex-col justify-between gap-5">
                      <h2 className="text-center text-xl font-bold md:text-2xl">
                        {currentWaqt}
                      </h2>
                      <h3 className="text-center text-xs font-semibold">
                        {currentWaqt &&
                          timingFormatter(
                            timeData[currentWaqt as keyof timeDataType],
                          )}{" "}
                        <span className="text-muted-foreground">to </span>
                        {currentWaqt &&
                          timingFormatter(
                            waqtEndTime(currentWaqt)?.trim() as string,
                          )}
                      </h3>
                      <div>
                        <h3 className="text-center text-base font-semibold">
                          Time Remaining
                        </h3>
                        {currentWaqt && waqtEndTime(currentWaqt) && (
                          <TimeRemaining
                            className="text-center text-base text-muted-foreground"
                            targetTime={waqtEndTime(currentWaqt) as string}
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
                getCurrentPrayerTime(new Date()) === "BreakBeforeFajr" &&
                key === "Fajr"
              ) {
                return null;
              }
              if (
                getCurrentPrayerTime(new Date()) === "BreakAfterFajr" &&
                key === "Dhuhr"
              ) {
                return null;
              }
              return (
                <Card
                  key={index}
                  className="flex aspect-square items-center justify-center p-6 md:max-w-60"
                >
                  <div>
                    <h2 className="mb-8 text-center text-lg font-bold md:text-3xl">
                      {key}
                    </h2>
                    <h3 className="text-center text-sm font-semibold md:text-lg">
                      {timingFormatter(timeData[key as keyof timeDataType])}
                    </h3>
                    <h4 className="text-center text-xs font-semibold text-muted-foreground md:text-base">
                      to
                    </h4>
                    <h3 className="text-center text-sm font-semibold md:text-lg">
                      {timingFormatter(waqtEndTime(key)?.trim() as string)}
                    </h3>
                  </div>
                </Card>
              );
            })}
          </div>
          <Separator className="my-10" />
          <div className="flex flex-col items-center justify-center">
            <TimeRamadan />
          </div>
        </>
      ) : (
        <RefreshCw size={90} className="animate-spin" />
      )}
    </div>
  );
}
