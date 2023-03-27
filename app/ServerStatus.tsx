import { getServerSession } from "next-auth/next"
import authOptions from "../pages/api/auth/[...nextauth]"
import ClientStatus from "./ClientStatus"

export default async function ServerStatus(searchParams: Record<string, string>) {

    // using the session in a server component
    const session = await getServerSession(authOptions)
    console.log(session)

    const { helloParam } = searchParams;

    let useHello = "hello from server";
    if (helloParam) {
        useHello = helloParam
    }

    return (
        <div>
            <p>{useHello}</p>
            <ClientStatus info_from_server="here is a prop" />
        </div>
    )
}