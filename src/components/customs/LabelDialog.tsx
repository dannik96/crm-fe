import { Dialog, DialogTitle, FormGroup, FormControlLabel, Checkbox, Button, DialogContent, DialogActions } from "@mui/material";
import { useState } from "react";

export default function LabelDialog(props: any) {
    const { onClose, onSave, selectedValue, open, choices } = props;
    const [selectedValues, setSelectedValues] = useState(selectedValue)
    const handleListItemClick = (value: any) => {
        if (selectedValues.filter(val => val.id === value.id).length !== 0) {
            setSelectedValues(selectedValues.filter(val => val.id !== value.id));
        } else {
            setSelectedValues([...selectedValues, value]);
        }
    };

    return (
        <Dialog onClose={onClose} open={open}>
            <DialogContent>
                <FormGroup sx={{ pt: 0 }}>
                    {choices.map((choice: any) => (
                        <FormControlLabel
                            key={choice.id}
                            control={
                                <Checkbox
                                    checked={selectedValues.filter(val => {
                                        return val.id === choice.id
                                    }).length === 1} />}
                            onChange={() =>
                                handleListItemClick(choice)}
                            label={choice.surname ? choice.name + " " + choice.surname : choice.name}
                        />
                    ))}
                </FormGroup>
            </DialogContent>
            <DialogActions>
                <Button autoFocus onClick={() => onSave(selectedValues)}>
                    Save changes
                </Button>
            </DialogActions>
        </Dialog>
    );
}