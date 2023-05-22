import AudiencePaper from "@/components/channels/AudiencePaper";
import NewAudiencePaper from "@/components/channels/NewAudiencePaper";
import { Grid } from "@mui/material";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";


export default function AudiencesPage(props: any) {
    const [audiences, setAudiences] = useState([]);
    const [channels, setChannels] = useState([]);
    const router = useRouter();

    useEffect(() => {
        fetchAudiences();
        fetchChannels();
    }, [])

    async function fetchAudiences() {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/audience/`, {
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + localStorage.getItem("token")
            },
        })

        if (res.ok) {
            const json = await res.json()
            console.log(json)
            setAudiences(json)
        }
    }

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


    async function deleteData(data : any) {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/audience/` + data.id, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + localStorage.getItem("token")
            },
        })
        console.log(res.status);
        if (res.ok) {
            router.reload()
        }
    }

    return (
        <Grid container padding={4} spacing={3}>
            <NewAudiencePaper />
            {Array.from(audiences).map(audience =>
                <AudiencePaper key={audience.id} data={audience} channels={channels} deleteData={deleteData}></AudiencePaper>
            )}
        </Grid>)
}