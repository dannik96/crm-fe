import AudiencePaper from "@/components/channels/AudiencePaper";
import { Grid } from "@mui/material";


export default function AudiencesPage(props: any) {
    return (
        <Grid container padding={4} spacing={3}>
            <AudiencePaper></AudiencePaper>
            <AudiencePaper></AudiencePaper>
            <AudiencePaper></AudiencePaper>
        </Grid>)
}