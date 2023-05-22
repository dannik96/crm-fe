import ChannelPaper from "@/components/channels/ChannelPaper";
import NewChannelPaper from "@/components/channels/NewChannelPaper";
import { getData } from "@/util/communicationUtil";
import { Grid } from "@mui/material";
import { useRouter } from "next/router";
import React from "react";
import { useEffect, useState } from "react";


export default function Channels(props: any) {
    const [channels, setChannels] = useState([]);
    const router = useRouter();

    useEffect(() => {
        getData(setChannels, router, "/api/channel/");
    }, [router])
    
    return (
        <Grid container padding={4} spacing={3}>
            <NewChannelPaper />
            {Array.from(channels).map((value) => (
                <ChannelPaper key={value.id} channel={value} />
            ))}
        </Grid>)
}