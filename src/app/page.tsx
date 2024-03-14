"use client";
import Time from "@/components/time";
import { StateContext } from "@/providers/stateProvider";
import { useContext } from "react";

export default function Home() {
    return (
        <main className="flex flex-col items-center justify-center gap-8">
            {/* {state.location && <LocationSearch />} */}
            <Time />
        </main>
    );
}
