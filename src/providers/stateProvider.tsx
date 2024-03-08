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
        if (state.location) {
            const dateToday = new Date();
            getRawTimings(
                parseFloat(state.location.lat),
                parseFloat(state.location.lon)
            ).then((res) => {
                console.table(res);
                if (res) {
                    dispatch({ type: "set timings", payload: res });
                    dispatch({
                        type: "set timing",
                        payload: res[dateToday.getDate() - 1],
                    });
                    // const timingToday = timingFormatter(
                    //     res[dateToday.getDate() - 1].timings
                    // );
                    // if (timingToday) {
                    //     dispatch({
                    //         type: "set timing",
                    //         payload: timingToday,
                    //     });
                    //     console.log(
                    //         "TODAY : ",
                    //         dateToday.getDate(),
                    //         timingToday
                    //     );
                    // }
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
