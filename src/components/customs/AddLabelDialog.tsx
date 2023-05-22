import { Dialog, DialogTitle, FormGroup, FormControlLabel, Checkbox, Button, TextField, DialogContent, DialogActions } from "@mui/material";
import { useRef, useState } from "react";

export default function AddLabelDialog(props: any) {
    const { onClose, onSave, open, name } = props;
    const nameRef = useRef();
    const descRef = useRef();

    const handleSave = () => {
        const label = {};

        label.name = nameRef.current.value;
        label.description = descRef.current.value;

        onSave(label);
    }

    return (
        <Dialog onClose={onClose} open={open} fullWidth>
            <DialogTitle>{name}</DialogTitle>
            <DialogContent >
                <TextField
                    autoFocus
                    inputRef={nameRef}
                    defaultValue={""}
                    margin="dense"
                    id="name"
                    label="Name"
                    fullWidth
                    variant="standard"
                />
                <TextField
                    inputRef={descRef}
                    defaultValue={""}
                    margin="dense"
                    id="description"
                    label="Description"
                    fullWidth
                    multiline
                    minRows={4}
                    variant="standard"
                />

            </DialogContent>
            <DialogActions>
                <Button onClick={() => handleSave()}>
                    create
                </Button>
            </DialogActions>

        </Dialog>
    );
}