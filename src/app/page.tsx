"use client";
import LocationSearch from "@/components/location-search";
import Time from "@/components/time";
import TimeRamadan from "@/components/time-ramadan";
import { Separator } from "@/components/ui/separator";
import StateProvider, { StateContext } from "@/providers/stateProvider";
import { Settings } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useContext } from "react";

export default function Home() {
    const { state } = useContext(StateContext);
    return (
        <main className="flex flex-col items-center justify-center gap-8">
            {/* {state.location && <LocationSearch />} */}

            <Time />
            <Separator />
            <TimeRamadan />
        </main>
    );
}
