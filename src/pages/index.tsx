import { useRouter } from "next/router";
import React, { useEffect } from "react";


function HomePage() {
    const router = useRouter()

    useEffect(() => {
        router.replace('/projects/projects')
    })
    return (<React.Fragment />)
}

export default HomePage;