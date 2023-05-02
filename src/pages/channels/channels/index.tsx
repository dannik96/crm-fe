import ChannelPaper from "@/components/channels/ChannelPaper";
import ProjectPaper from "@/components/projects/ProjectPaper";
import { Grid } from "@mui/material";


export default function Channels(props: any) {

    return (
        <Grid container padding={4} spacing={3}>
            <ChannelPaper></ChannelPaper>
            <ChannelPaper></ChannelPaper>
            <ChannelPaper></ChannelPaper>
        </Grid>)
}