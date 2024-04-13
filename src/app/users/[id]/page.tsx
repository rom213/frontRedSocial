"use client"

import { UserClaims } from "@/app/components/Navbar";
import { useState } from "react";

// import { useParams } from "next/navigation";



const page = async ({ params }) => {
    const [claims, setClaims] = useState<UserClaims | null>(null);

    const handleInfoTOken = async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await fetch(`http://localhost:8080/api/v1/gettoken`, {
                method: 'POST',
                headers: {
                    "Content-Type": 'application/json', // Adjust content type as needed
                    "Authorization": `Bearer ${token}`,
                },
                body: JSON.stringify({}),
                // mode:'no-cors',
            })

            if (response.ok) {
                const data = await response.json()
                setClaims(data);
            }
        } catch (error) {
            console.error('no autorizado:', error);
        }
    };
    return (

        <div className="flex justify-center py-20">
            <div className="">
                
            </div>
        </div>
    )
}

export default page