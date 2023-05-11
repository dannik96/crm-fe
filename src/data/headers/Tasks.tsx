import PostTableRow from "@/components/channels/posts/PostTableRow";
import Link from "next/link";

export interface TaskTableInterface {
    id: number;
    name: string;
    deadline: string;
    assignee: string;
    state: string;
}

export const TaskTableColumns = [
    {
        name: "id",
        label: "Id",
    },
    {
        name: "name",
        label: "Name"
    },
    {
        name: "deadline",
        label: "Deadline",
        options: { sortOrder: 'asc' }
    },
    {
        name: "assignee",
        label: "Assignee"
    },
    {
        name: "state",
        label: "State"
    }
];