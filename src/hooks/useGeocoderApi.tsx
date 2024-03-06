import axios from "axios";

export default function useGeocoderApi() {
    async function getResults(query: string) {
        const url = `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(
            query
        )}&format=jsonv2&limit=3`;

        const response = await axios.get(url);

        const results = response.data;

        return results;
    }

    return { getResults };
}
