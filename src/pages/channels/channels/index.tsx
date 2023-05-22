import ChannelPaper from "@/components/channels/ChannelPaper";
import NewChannelPaper from "@/components/channels/NewChannelPaper";
import { Grid } from "@mui/material";
import { useRouter } from "next/router";
import React from "react";
import { useEffect, useState } from "react";


export default function Channels(props: any) {
    const [channels, setChannels] = useState([]);
    const router = useRouter();

    useEffect(() => {
        fetchChannels();
    console.log(localStorage.getItem('token'))

    }, [router])
    async function fetchChannels() {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/channel/`, {
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + localStorage.getItem("token")
            },
        })

        if (res.ok) {
            const json = await res.json()
            console.log(json)
            setChannels(json)
        }
    }
    return (
        <Grid container padding={4} spacing={3}>
            <NewChannelPaper />
            {Array.from(channels).map((value) => (
                <ChannelPaper key={value.id} channel={value} />
            ))}
        </Grid>)
}