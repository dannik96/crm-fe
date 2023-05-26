import ChannelDetail from "@/components/channels/ChannelDetail";
import CustomTable from "@/components/customs/CustomTable";
import LabelDialog from "@/components/customs/LabelDialog";
import TabPanel from "@/components/customs/TabPanel";
import { AudienceColumns } from "@/data/headers/Audiences";
import { ProjectsColumns } from "@/data/headers/Projects";
import { TaskParticipantsColumns } from "@/data/headers/TaskParticipants";
import { TaskPostsColumns } from "@/data/headers/TaskPosts";
import { TaskSpentsColumns } from "@/data/headers/TaskSpents";
import { getData } from "@/util/communicationUtil";
import { Box, Divider, Grid, Paper, Tab, Tabs, Typography } from "@mui/material";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { useState } from "react";
import { types } from "util";

export default function Channel(props: any) {
    const [channel, setChannel] = useState(undefined);
    const [channelTypes, setChannelTypes] = useState(undefined);
    const [channelTypesOpen, setChannelTypesOpen] = useState(false);
    const router = useRouter();
    console.log(channel)
    useEffect(() => {
        if (!router.query.channelId) {
            return;
        }
        getData(setChannel, router, '/api/channel/' + router.query.channelId)
        getData(setChannelTypes, router, '/api/channel-type')
    }, [router])

    async function editChannel(params: any) {
        if (router.query.channelId === undefined) {
            return;
        }
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/channel/`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + localStorage.getItem("token")
            },
            body: JSON.stringify(params)
        })

        if (res.ok) {
            const json = await res.json()
            setChannel(json)
        }
    }

    const handleChannelTypesChange = async (value: any[]) => {
        let addArr = [];
        let delArr = [];
        let res: any;
        for (let i = 0; i < value.length; i++) {
            if (!channel.channelTypes.includes(value[i])) {
                addArr.push(value[i]);
                res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/channel/` + channel.id + "/add-type/" + value[i].id, {
                    method: "PATCH",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": "Bearer " + localStorage.getItem("token")
                    }
                })
            }
        }

        for (let i = 0; i < channel.channelTypes.length; i++) {
            if (!value.includes(channel.channelTypes[i])) {
                delArr.push(channel.channelTypes[i]);
                res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/channel/` + channel.id + "/remove-type/" + channel.channelTypes[i].id, {
                    method: "PATCH",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": "Bearer " + localStorage.getItem("token")
                    }
                })
            }
        }
        if (res.ok) {
            setChannel({
                ...channel,
                channelTypes: value
            })
        }
        setChannelTypesOpen(false);
    };

    const deleteData = async (id: any) => {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/channel/` + id, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + localStorage.getItem("token")
            }
        })

        if (res.ok) {
            router.replace('/channels/channels')
        }
    }


    const handleTypesClickOpen = (types: any) => {
        setChannelTypesOpen(true)
    }
    if (channel) {
        console.log(channel.audiences)
        console.log(channel.posts)
        console.log(channel.projects)
    }
    return (
        <Grid container padding={4} spacing={3}>
            {channel ?
                <Grid item xl={12} xs={12}>
                    <ChannelDetail
                        channel={channel}
                        showDescription={true}
                        showEditButton={true}
                        deleteData={deleteData}
                        editChannel={editChannel}
                        updateTypes={handleTypesClickOpen} />
                </Grid>
                : <React.Fragment />}
            {channel && channelTypes ?
                <LabelDialog
                    open={channelTypesOpen}
                    onClose={() => setChannelTypesOpen(false)}
                    onSave={(selectedValues: any) => handleChannelTypesChange(selectedValues)}
                    selectedValue={channel.channelTypes}
                    choices={channelTypes} /> : <React.Fragment />}
            {channel ?
                <Grid item xl={4}>
                    <Paper style={{ height: 500, width: '100%' }}>
                        <Box px={3} py={2}>
                            <Typography variant="h6">
                                Audiences
                            </Typography>
                        </Box>
                        <Divider variant="fullWidth" />
                        <Box height={440} px={3} py={2}>
                            <CustomTable columns={AudienceColumns} rows={channel.audiences} />
                        </Box>
                    </Paper>
                </Grid> : <React.Fragment></React.Fragment>}
            {channel ?
                <Grid item xl={4}>
                    <Paper style={{ height: 500, width: '100%' }}>
                        <Box px={3} py={2}>
                            <Typography variant="h6">
                                Posts
                            </Typography>
                        </Box>
                        <Divider variant="fullWidth" />
                        <Box height={440} px={3} py={2}>
                            <CustomTable columns={TaskPostsColumns} rows={channel.posts} />
                        </Box>
                    </Paper>
                </Grid> : <React.Fragment />}
            {channel ?
                <Grid item xl={4}>
                    <Paper style={{ height: 500, width: '100%' }}>
                        <Box px={3} py={2}>
                            <Typography variant="h6">
                                Projects
                            </Typography>
                        </Box>
                        <Divider variant="fullWidth" />
                        <Box height={440} px={3} py={2}>
                            <CustomTable columns={ProjectsColumns} rows={channel.projects} />
                        </Box>
                    </Paper>
                </Grid> : <React.Fragment />}
        </Grid>
    )
}