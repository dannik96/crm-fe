import { TableRow, TableCell, Stack, TextField, IconButton } from "@mui/material";
import EditIcon from '@mui/icons-material/Edit';
import SaveIcon from '@mui/icons-material/Save';
import { useRef, useState } from "react";
export default function LabelsTableRow(props: any) {
    const rowData = props.rowData;

    const [disabled, setDisabled] = useState(true);
    const channelType = props.channel;

    const nameRef = useRef();
    const descRef = useRef();

    const handleSave = () => {
        channelType.name = nameRef.current.value;
        channelType.description = descRef.current.value;
        setDisabled(true)
        props.editPostState(channelType)
    }
    return (
        <TableRow>
            <TableCell colSpan={rowData.length + 1}>
                <Stack spacing={2}>
                    <Stack direction={"row"}
                        justifyContent="space-between"
                        alignItems="flex-start">
                        <TextField
                            id="name"
                            label="Name"
                            defaultValue={rowData[1]}
                            inputRef={nameRef}
                            InputProps={{
                                disabled: disabled,
                                disableUnderline: disabled
                            }}
                            variant="standard"
                            sx={{
                                "& fieldset": { border: disabled ? 1 : 'none' },
                                maxWidth: 300
                            }}
                        />
                        {
                            !disabled ?
                                <IconButton aria-label="save" onClick={handleSave}>
                                    <SaveIcon color="primary" />
                                </IconButton> :
                                <IconButton aria-label="edit" onClick={() => {
                                    setDisabled(false)
                                }}>
                                    <EditIcon color="primary" />
                                </IconButton>
                        }
                    </Stack>
                    <TextField
                        id="description"
                        label="Description"
                        defaultValue={rowData[2]}
                        inputRef={descRef}
                        InputProps={{
                            disabled: disabled,
                            disableUnderline: disabled
                        }}
                        fullWidth={true}
                        multiline
                        variant="standard"
                        sx={{
                            "& fieldset": { border: disabled ? 1 : 'none' },
                            maxWidth: '100'
                        }}
                    />
                </Stack>
            </TableCell>
        </TableRow>

    );
}