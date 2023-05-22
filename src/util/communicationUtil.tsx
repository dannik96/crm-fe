import { NextRouter, Router } from "next/router";

export async function getData(callback : Function, router : NextRouter, path : string) {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}` + path, {
        headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + localStorage.getItem("token")
        }
    })

    if (res.ok) {
        const json = await res.json()
        callback(json)
    } else if (res.status === 401) {
        router.push('/login');
    }
}