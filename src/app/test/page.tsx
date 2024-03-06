import {
    CalculationMethod,
    Coordinates,
    HighLatitudeRule,
    Madhab,
    PrayerTimes,
} from "adhan";
import moment from "moment-timezone";
const coordinates = new Coordinates(23.8041, 90.4152);
const params = CalculationMethod.Karachi();
params.madhab = Madhab.Hanafi;
params.highLatitudeRule = HighLatitudeRule.recommended(coordinates);
const date = new Date(2024, 3, 4);
export const prayerTimes = new PrayerTimes(coordinates, date, params);

export default function page() {
    // https://api.aladhan.com/v1/calendarByCity/2024/3?city=Dhaka&country=Bangladesh&method=1&school=1&&latitudeAdjustmentMethod=3&adjustment=1
    return (
        <>
            <div>
                <h1>Fajr : </h1>
                <span>
                    {moment(prayerTimes.fajr).tz("Asia/Dhaka").format("h:mm A")}
                </span>
                {" - "}
                <span></span>
                {moment(prayerTimes.sunrise).tz("Asia/Dhaka").format("h:mm A")}
            </div>
            <div>
                <h1>Dhuhr : </h1>
                <span>
                    {moment(prayerTimes.dhuhr)
                        .tz("Asia/Dhaka")
                        .format("h:mm A")}
                </span>
                {" - "}
                <span></span>
                {moment(prayerTimes.asr).tz("Asia/Dhaka").format("h:mm A")}
            </div>
            <div>
                <h1>Asr : </h1>
                <span>
                    {moment(prayerTimes.asr).tz("Asia/Dhaka").format("h:mm A")}
                </span>
                {" - "}
                <span></span>
                {moment(prayerTimes.sunset).tz("Asia/Dhaka").format("h:mm A")}
            </div>
            <div>
                <h1>Maghrib : </h1>
                <span>
                    {moment(prayerTimes.maghrib)
                        .tz("Asia/Dhaka")
                        .format("h:mm A")}
                </span>
                {" - "}
                <span></span>
                {moment(prayerTimes.isha).tz("Asia/Dhaka").format("h:mm A")}
            </div>
            <div>
                <h1>Isha : </h1>
                <span>
                    {moment(prayerTimes.isha).tz("Asia/Dhaka").format("h:mm A")}
                </span>
                {" - "}
                <span></span>
                {moment(prayerTimes.fajr).tz("Asia/Dhaka").format("h:mm A")}
            </div>
        </>
    );
}
