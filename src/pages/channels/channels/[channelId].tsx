import ChannelDetail from "@/components/channels/ChannelDetail";
import CustomTable from "@/components/customs/CustomTable";
import LabelDialog from "@/components/customs/LabelDialog";
import TabPanel from "@/components/customs/TabPanel";
import { AudiencesColumns } from "@/data/headers/Audiences";
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

const data = {
    name: "Tootbrush",
    location: "Internet",
    description: "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Mauris dolor felis, sagittis at, luctus sed, aliquam non, tellus. Etiam commodo dui eget wisi. Curabitur bibendum justo non orci. Integer lacinia. Etiam ligula pede, sagittis quis, interdum ultricies, scelerisque eu. Nulla pulvinar eleifend sem. Curabitur sagittis hendrerit ante. Nullam sit amet magna in magna gravida vehicula. Morbi scelerisque luctus velit. Itaque earum rerum hic tenetur a sapiente delectus, ut aut reiciendis voluptatibus maiores alias consequatur aut perferendis doloribus asperiores repellat. Cras elementum. Etiam sapien elit, consequat eget, tristique non, venenatis quis, ante.",
    types: [{ id: 1, name: "Hiring" }, { id: 2, name: "Hiring" }, { id: 3, name: "Hiring" }, { id: 4, name: "Hiring" }, { id: 5, name: "Hiring" }
        , { id: 6, name: "Hiring hiring hiring" }, { id: 7, name: "Hiring" }, { id: 8, name: "Hiring" }, { id: 9, name: "Hiring" }, { id: 10, name: "Hiring" }
        , { id: 11, name: "Hiring" }],
    numberOfPosts: 50,
    posts:
        [{ id: 1, name: "Post 1", postDate: "2.2.2023", state: { name: "State 1", description: "Lorem ipsum dolor sit amet." }, content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin rhoncus lectus eu mi posuere, a ultrices lorem ultricies." },
        { id: 2, name: "Post 1", postDate: "2.2.2023", state: { name: "State 1", description: "Lorem ipsum dolor sit amet." }, content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin rhoncus lectus eu mi posuere, a ultrices lorem ultricies." },
        { id: 3, name: "Post 1", postDate: "2.2.2023", state: { name: "State 1", description: "Lorem ipsum dolor sit amet." }, content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin rhoncus lectus eu mi posuere, a ultrices lorem ultricies." },
        { id: 4, name: "Post 1", postDate: "2.2.2023", state: { name: "State 1", description: "Lorem ipsum dolor sit amet." }, content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin rhoncus lectus eu mi posuere, a ultrices lorem ultricies." },
        { id: 5, name: "Post 1", postDate: "2.2.2023", state: { name: "State 1", description: "Lorem ipsum dolor sit amet." }, content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin rhoncus lectus eu mi posuere, a ultrices lorem ultricies." },],
    audiences:
        [{ id: 1, name: "Audience 1" },
        { id: 2, name: "Audience 2" },
        { id: 3, name: "Audience 3" },
        { id: 4, name: "Audience 4" },
        { id: 5, name: "Audience 5" }],
    projects:
        [{ id: 1, name: "Project 1", deadline: "2.2.2023", state: { name: "State 1", description: "Lorem ipsum dolor sit amet." } },
        { id: 2, name: "Project 1", deadline: "2.2.2023", state: { name: "State 1", description: "Lorem ipsum dolor sit amet." } },
        { id: 3, name: "Project 1", deadline: "2.2.2023", state: { name: "State 1", description: "Lorem ipsum dolor sit amet." } },
        { id: 4, name: "Project 1", deadline: "2.2.2023", state: { name: "State 1", description: "Lorem ipsum dolor sit amet." } },
        { id: 5, name: "Project 1", deadline: "2.2.2023", state: { name: "State 1", description: "Lorem ipsum dolor sit amet." } },
        { id: 6, name: "Project 1", deadline: "2.2.2023", state: { name: "State 1", description: "Lorem ipsum dolor sit amet." } },
        { id: 7, name: "Project 1", deadline: "2.2.2023", state: { name: "State 1", description: "Lorem ipsum dolor sit amet." } },
        { id: 8, name: "Project 1", deadline: "2.2.2023", state: { name: "State 1", description: "Lorem ipsum dolor sit amet." } },
        { id: 9, name: "Project 1", deadline: "2.2.2023", state: { name: "State 1", description: "Lorem ipsum dolor sit amet." } }]
}


export default function Channel(props: any) {
    const [channel, setChannel] = useState(undefined);
    const [channelTypes, setChannelTypes] = useState(undefined);
    const [channelTypesOpen, setChannelTypesOpen] = useState(false);
    const router = useRouter();

    useEffect(() => {
        if (!router.query.channelId) {
            return;
        }
        getData(setChannel, router, '/api/channel' + router.query.channelId)
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
                            <CustomTable columns={AudiencesColumns} rows={channel.audiences} />
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