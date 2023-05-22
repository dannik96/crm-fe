import PostTable from "@/components/channels/posts/PostTable";
import UserTableRow from "@/components/customs/UserTableRow";
import { EventTableData, EventTableColumns } from "@/data/headers/Events";
import { UserTableColumns } from "@/data/headers/Users";
import { Box, Grid, Paper } from "@mui/material";
import { useEffect, useState } from "react";


export default function Settings(props: any) {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        fetchUsers();
    }, [])

    const fetchUsers = async () => {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/user/`, {
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + localStorage.getItem("token")
            }
        })

        if (res.ok) {
            const json = await res.json()
            setUsers(json)
            console.log(json)
        }
    }

    const updateHandler = async (param) => {
        console.log('updateHandler')
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/user/`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + localStorage.getItem("token")
            },
            body: JSON.stringify(param)
        })

        if (res.ok) {
            const json = await res.json()
            setUsers([...users.filter(us => us.id != param.id), json])
            console.log(json)
        }
    }
    const deleteData = () => {

    }

    const UserTableOptions = {
        filter: true,
        onFilterChange: (changedColumn: any, filterList: any) => {
        },
        selectableRows: "none",
        filterType: "dropdown",
        responsive: "simple",
        expandableRows: true,
        tableId: "Events",
        pagination: false,
        elevation: 0,
        renderExpandableRow: (rowData: any, rowMeta: any) => {
            console.log(rowData, rowMeta);
            return (
                <UserTableRow rowData={rowData} updateHandler={updateHandler} deleteData={deleteData} />
            );
        }
    };
    return (

        <Grid container padding={4} spacing={3}>
            <Grid item xs={12}>
                <Paper
                    sx={{
                        p: 2
                    }}
                >
                    <PostTable data={users} columns={UserTableColumns} options={UserTableOptions} header={'Users'}/>
                </Paper>
            </Grid>
        </Grid>)
}