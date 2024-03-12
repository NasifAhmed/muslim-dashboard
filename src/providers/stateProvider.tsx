"use client";

import useGeocoderApi from "@/hooks/useGeocoderApi";
import usePrayerTimeApi from "@/hooks/usePrayerTimeApi";
import { timingFormatter } from "@/lib/utils";
import { useRouter } from "next/navigation";
import {
    Dispatch,
    ReactNode,
    createContext,
    useEffect,
    useReducer,
} from "react";

type stateType = {
    location: GeoCodeApiResponseType | undefined;
    prayerTimingToday: DailyPrayerTiming | undefined;
    prayerTimingsAll: DailyPrayerTiming[] | undefined;
};

type stateAction =
    | { type: "set timing"; payload: DailyPrayerTiming }
    | { type: "set timings"; payload: DailyPrayerTiming[] }
    | { type: "set location"; payload: GeoCodeApiResponseType }
    | { type: "reset" };

type contexType = {
    state: stateType;
    dispatch: Dispatch<stateAction>;
};
const initialState: stateType = {
    location: undefined,
    prayerTimingToday: undefined,
    prayerTimingsAll: undefined,
};

export const StateContext = createContext<contexType>({
    state: initialState,
    dispatch: () => initialState,
});

const StateProvider = ({ children }: { children?: ReactNode }) => {
    const { getRawTimings } = usePrayerTimeApi();

    function reducer(
        state: typeof initialState,
        action: stateAction
    ): stateType {
        switch (action.type) {
            case "set location": {
                return {
                    ...state,
                    location: action.payload,
                };
            }
            case "set timing": {
                return {
                    ...state,
                    prayerTimingToday: action.payload,
                };
            }
            case "set timings": {
                let today = new Date();
                const jsonValue = { data: action.payload };
                window.localStorage.setItem(
                    "timings",
                    JSON.stringify(jsonValue)
                );
                return {
                    ...state,
                    prayerTimingsAll: action.payload,
                    // prayerTiming: action.payload.data[today.getDate()].timings,
                };
            }
            case "reset": {
                return {
                    ...state,
                    location: undefined,
                    prayerTimingToday: undefined,
                    prayerTimingsAll: undefined,
                };
            }
        }
    }
    const [state, dispatch] = useReducer(reducer, initialState);

    useEffect(() => {
        const dateToday = new Date();
        if (state.prayerTimingsAll) {
            const firstFajr = new Date(state.prayerTimingsAll[0].timings.Fajr);

            // Check if saved data is of current month or not
            if (
                firstFajr.getMonth() !== dateToday.getMonth() &&
                state.location
            ) {
                getRawTimings(
                    parseFloat(state.location.lat),
                    parseFloat(state.location.lon)
                ).then((res) => {
                    console.table(res);
                    if (res) {
                        dispatch({ type: "set timings", payload: res });
                    }
                });
            }
            dispatch({
                type: "set timing",
                payload: state.prayerTimingsAll[dateToday.getDate() - 1],
            });
        }
    }, [state.prayerTimingsAll]);

    useEffect(() => {
        if (state.location) {
            // Keep timings save in local storage
            // if (window.localStorage.getItem("timings")) {
            //     const valueFromStorage = window.localStorage.getItem(
            //         "timings"
            //     ) as string;
            //     dispatch({
            //         type: "set timings",
            //         payload: JSON.parse(valueFromStorage).data,
            //     });
            //     console.log("Loaded timings from storage");

            //     console.log(JSON.parse(valueFromStorage).data);
            // } else {
            //     getRawTimings(
            //         parseFloat(state.location.lat),
            //         parseFloat(state.location.lon)
            //     ).then((res) => {
            //         console.table(res);
            //         if (res) {
            //             dispatch({ type: "set timings", payload: res });
            //         }
            //     });
            // }

            // Don't keep timings saved in localstorage. Get data from api everytime
            getRawTimings(
                parseFloat(state.location.lat),
                parseFloat(state.location.lon)
            ).then((res) => {
                console.table(res);
                if (res) {
                    dispatch({ type: "set timings", payload: res });
                }
            });
        }
    }, [state.location]);

    return (
        <StateContext.Provider
            value={{
                state,
                dispatch,
            }}
        >
            {children}
        </StateContext.Provider>
    );
};

export default StateProvider;
