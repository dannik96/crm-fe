import { Button } from "@mui/material";


export default function CustomButton(props: any) {
    return (
        <Button sx={{color: 'black', background: 'white', ":hover" : {color : 'white'}}} variant="contained" fullWidth size="large" >
            {props.children}
        </Button>
    )
}