"use client";

import Link from "next/link";
import { Separator } from "./ui/separator";
import { Home, Settings } from "lucide-react";
import { useContext } from "react";
import { StateContext } from "@/providers/stateProvider";
import ThemeToggleButton from "./ui/theme-toggle-button";
import { Button } from "./ui/button";

export default function Header() {
    const { state } = useContext(StateContext);
    return (
        <div className="mb-10">
            <div className="flex w-full flex-col items-center justify-between gap-5 px-8 py-8 md:flex-row">
                {state.prayerTimingToday && (
                    <div className="start flex flex-col items-start justify-center gap-1">
                        <h2 className="text-lg md:text-xl">
                            <span className="text-muted-foreground">
                                Date :{" "}
                            </span>
                            {`${state.prayerTimingToday.date.gregorian.day} ${state.prayerTimingToday.date.gregorian.month.en} ${state.prayerTimingToday.date.gregorian.year}`}
                        </h2>
                        <h2 className="text-lg md:text-xl">
                            <span className="text-muted-foreground">
                                Hijri :{" "}
                            </span>
                            {`${state.prayerTimingToday.date.hijri.day} ${state.prayerTimingToday.date.hijri.month.en} ${state.prayerTimingToday.date.hijri.year}`}
                        </h2>
                        <h3 className="text-base md:text-lg">
                            <span className="text-muted-foreground">
                                Location :{" "}
                            </span>
                            {state.location?.name}
                        </h3>
                    </div>
                )}
                <div className="end flex items-center justify-center gap-5">
                    <Link href={"/"}>
                        <Button variant={"outline"} size={"icon"}>
                            <Home />
                        </Button>
                    </Link>

                    <Link href={"/setup"}>
                        <Button variant="outline" size="icon">
                            <Settings />
                        </Button>
                    </Link>
                    <ThemeToggleButton />
                </div>
            </div>
            <Separator />
        </div>
    );
}
