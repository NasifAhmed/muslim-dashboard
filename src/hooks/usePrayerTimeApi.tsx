import { timingFormatter } from "@/lib/utils";
import axios from "axios";
import { DateTime } from "luxon";

export default function usePrayerTimeApi() {
    // https://api.aladhan.com/v1/calendarByCity/2024/3?city=Dhaka&country=Bangladesh&method=1&school=1&&latitudeAdjustmentMethod=3&adjustment=1

    // https://api.aladhan.com/v1/calendar/2024/3?latitude=23.8041&longitude=90.4152&method=1&school=1&&latitudeAdjustmentMethod=3&adjustment=1

    async function getRawTimings(latitude: number, longitude: number) {
        const dateToday = new Date();
        const year = dateToday.getFullYear();
        const month = dateToday.getMonth() + 1;

        const url = `https://api.aladhan.com/v1/calendar/${year}/${month}?latitude=${latitude}&longitude=${longitude}&school=1&&latitudeAdjustmentMethod=3&iso8601=true`;
        // &tune=0,0,0,0,0,2,0,0,0

        const response = await axios.get<PrayerTimeApiResponseType>(url);

        return response.data.data;
    }

    return { getRawTimings };
}
