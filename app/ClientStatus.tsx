"use client"
import React from 'react'
import { useSession } from 'next-auth/react';

export default function ClientStatus(props: React.PropsWithChildren<{
    info_from_server: string;
}>) {

    // using the session in a client component
    const { data: session, status } = useSession();

    return (
        <div>
            <p>hello from client</p>
            <p>{session && "status: logged in"}</p>
            <p>{!session && "status: logged out"}</p>
            <p>example passing props: {props.info_from_server}</p>
            <p>click to test: </p><a href="/api/protected?helloParam=hello from client">API route with protected session</a>
        </div>
    )
}