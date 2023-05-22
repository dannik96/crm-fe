import { Dialog, DialogTitle, List, ListItem, ListItemButton, ListItemAvatar, ListItemText, DialogContent } from "@mui/material";

export default function SimpleDialog(props: any) {
    const { onClose, onItemClick, open, choices } = props;

    const handleListItemClick = (value: any) => {
        onItemClick(value);
    };

    return (
        <Dialog onClose={onClose} open={open}>
            <DialogTitle>Set backup account</DialogTitle>
            <DialogContent>
                <List sx={{ pt: 0 }}>
                    {choices.map((choice: any) => (
                        <ListItem key={choice.id} disableGutters>
                            <ListItemButton onClick={() => handleListItemClick(choice)} key={choice.id}>
                                <ListItemAvatar>
                                </ListItemAvatar>
                                <ListItemText primary={choice.surname ? choice.name + " " + choice.surname : choice.name} />
                            </ListItemButton>
                        </ListItem>
                    ))}
                </List>
            </DialogContent>
        </Dialog>
    );
}
