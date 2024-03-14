"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import useGeocoderApi from "@/hooks/useGeocoderApi";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage
} from "@/components/ui/form";
import { toast } from "@/components/ui/use-toast";
import { useContext, useState } from "react";
import {
    Card,
    CardContent,
    CardFooter,
    CardHeader
} from "@/components/ui/card";
import { StateContext } from "@/providers/stateProvider";
import { useRouter } from "next/navigation";
import { RefreshCw } from "lucide-react";

const FormSchema = z.object({
    query: z.string().min(2, {
        message: "Search query must be at least 2 characters."
    })
});

export default function LocationSearch() {
    const [results, setResults] = useState<GeoCodeApiResponseType[]>();
    const [loading, setLoading] = useState(false);
    const { getResults } = useGeocoderApi();
    const { state, dispatch } = useContext(StateContext);
    const router = useRouter();

    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            query: ""
        }
    });

    function onSubmit(data: z.infer<typeof FormSchema>) {
        setLoading(true);
        toast({
            title: "You submitted the following values:",
            description: (
                <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
                    <code className="text-white">
                        {JSON.stringify(data, null, 2)}
                    </code>
                </pre>
            )
        });
        getResults(data.query).then((res) => {
            console.log(res);
            setResults(res);
            setLoading(false);
        });
    }

    function handleSelect(result: GeoCodeApiResponseType) {
        dispatch({ type: "set location", payload: result });
        // const value = {
        //     latitude: result.lat,
        //     longitude: result.lon,
        // };
        window.localStorage.setItem("location", JSON.stringify(result));
        router.push("/");
    }

    return (
        <Form {...form}>
            <div className="flex w-[100vw] flex-col items-center justify-center gap-5 transition-all md:w-[40vw]">
                <h1 className="mt-6 text-2xl font-bold md:mt-10">
                    Muslim Dashboard
                </h1>
                <h2 className="mb-6 text-lg md:mb-10">
                    Dashboard for prayer and fasting times
                </h2>
                <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="w-2/3 space-y-6"
                >
                    <FormField
                        control={form.control}
                        name="query"
                        render={({ field }) => (
                            <FormItem>
                                <FormDescription>
                                    Search and select your location from below
                                </FormDescription>
                                <FormControl>
                                    <Input
                                        className="h-14"
                                        placeholder="Example : Mecca, Saudi Arabia"
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <Button type="submit">Search</Button>
                </form>
                {loading ? (
                    <RefreshCw size={90} className="animate-spin" />
                ) : (
                    results && (
                        <ul className="flex w-80 flex-col items-center justify-center gap-2">
                            {results.map((result, index) => {
                                return (
                                    <li
                                        key={index}
                                        onClick={() => handleSelect(result)}
                                        className="w-full"
                                    >
                                        <Card className="cursor-pointer p-5 hover:ring-1 hover:ring-primary">
                                            {result.display_name}
                                        </Card>
                                    </li>
                                );
                            })}
                        </ul>
                    )
                )}
            </div>
        </Form>
    );
}
