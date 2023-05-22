import React, { useState } from "react";
import MUIDataTable from "mui-datatables";
import PostTableRow from "./PostTableRow";

const PostTable = (props: any) => {
    return (
        <MUIDataTable
            title={props.header ? props.header : ""}
            data={props.data}
            columns={props.columns}
            options={props.options}
            key={'table'}    
        />
    );
};

export default PostTable;
