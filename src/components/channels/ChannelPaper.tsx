import { Grid, Paper, Box, Typography, Divider, TextField, Stack, Chip, IconButton } from "@mui/material";
import Link from "next/link";
import EditIcon from '@mui/icons-material/Edit';


export default function ChannelPaper(props: any) {
    const channel = props.channel;
    return (
        <Grid item xs={12} md={4} lg={4}>
            <Link href={"/channels/channels/" + channel.id} style={{ textDecoration: 'none' }}>
                <Paper
                    sx={{
                        p: 2,
                        display: 'flex',
                        flexDirection: 'column',
                    }}
                >
                    <Box sx={{ my: 3, mx: 2, mb: 1 }} paddingBottom={1}>
                        <Grid container alignItems="center" columnSpacing={2} paddingBottom={1}>
                            <Grid item xs={11}>
                                <Typography gutterBottom variant="h3" component="div">
                                    {channel.name}
                                </Typography>
                            </Grid>
                            <Grid item xs={1}>
                                <EditIcon color="primary" />
                            </Grid>
                            <Grid item xs={9}>
                                <TextField
                                    id="location"
                                    label="Location"
                                    defaultValue={channel.location}
                                    InputProps={{
                                        readOnly: true,
                                        disableUnderline: true,
                                    }}
                                    variant="standard"
                                    sx={{
                                        "& fieldset": { border: 'none' },
                                    }}
                                />
                            </Grid>
                            <Grid item xs={3}>
                                <TextField
                                    id="post_count"
                                    label="Post count"
                                    defaultValue={channel.posts.length}
                                    InputProps={{
                                        readOnly: true,
                                        disableUnderline: true,
                                    }}
                                    variant="standard"
                                    sx={{
                                        "& fieldset": { border: 'none' },
                                    }}
                                />
                            </Grid>
                        </Grid>
                        <Stack direction="row" spacing={1} flexWrap={'wrap'} useFlexGap>
                            {Array.from(channel.channelTypes.filter(val => !val.deleted)).map((value, index) => (
                                <Chip
                                    label={value.name}
                                    key={index}
                                />
                            ))}
                        </Stack>
                    </Box>
                    <Divider variant="middle" sx={{ marginBottom: 2 }} />
                    <Box sx={{ mx: 2 }}>
                        <Grid container>
                            <Grid item>
                                <Typography variant="body1">
                                    {channel.description.length > 150 ? channel.description.substring(0, 147) + "..." : channel.description}
                                </Typography>
                            </Grid>
                        </Grid>
                    </Box>
                </Paper>
            </Link>
        </Grid>);
}