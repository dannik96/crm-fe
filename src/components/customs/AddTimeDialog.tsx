import { Dialog, DialogTitle, List, ListItem, ListItemButton, ListItemAvatar, ListItemText, DialogContent, Button, DialogActions, FormGroup, Stack, TextField, Typography } from "@mui/material";
import { useRef, useState } from "react";

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export default function AddTimeDialog(props: any) {
    const { onClose, onSave, open } = props;
    const [date, setDate] = useState(new Date());
    const nameRef = useRef();
    return (
        <Dialog onClose={onClose} open={open}>
            <DialogTitle>Add time</DialogTitle>
            <DialogContent>
                <FormGroup sx={{ pt: 0 }}>
                    <Stack direction={'row'} spacing={2}>
                        <Typography variant="body1">Time:</Typography>
                        <TextField
                            variant="outlined"
                            inputRef={nameRef}
                        ></TextField>
                    </Stack>
                    <Stack direction={'row'} spacing={2}>
                        <Typography variant="body1">Date</Typography>
                        <DatePicker
                            wrapperClassName="datepicker-mw"
                            selected={date}
                            onChange={(newDate: Date) => setDate(newDate)}
                            id="end-date"
                            dateFormat={"dd.MM.yyyy"}

                        />
                    </Stack>
                </FormGroup>
            </DialogContent>
            <DialogActions>
                <Button autoFocus onClick={() => { onSave(nameRef.current.value, date) }}>
                    Save
                </Button>
            </DialogActions>
        </Dialog>
    );
}
