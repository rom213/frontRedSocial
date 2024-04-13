"use client"

import { useRouter } from "next/navigation";
import CreateUser from "../components/CreateUser";

const page = () => {

    const router = useRouter();
    return (
        <div className="px-40 py-40">
            <CreateUser />
        </div>
    )
}

export default page