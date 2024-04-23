"use client"
import Link from 'next/link'
import { useRouter, usePathname } from 'next/navigation';
import { useEffect, useState } from 'react'
import useStore from '../store/store';
import { IoPower } from "react-icons/io5";
import { CiHome } from "react-icons/ci";
interface User {
    id: number;
    username: string;
    firstname: string;
    lastname: string;
    email: string;
    avatar: string;
    country: string;
}

export interface UserClaims {
    user: User,
    sub: string;
    iat: number;
    exp: number;
}



const Navbar = () => {
    const [tokens, settoken] = useState<string | null>(null);
    const router = useRouter();
    const patname = usePathname();
    const [claims, setClaims] = useState<UserClaims | null>(null);

    const [modal, setmodal] = useState(false)

    const { token } = useStore()
    useEffect(() => {
        const storedToken = localStorage.getItem("token");
        settoken(storedToken);
        if (storedToken) {
            handleInfoTOken();
        }
    }, [token])

    

    const handleInfoTOken = async () => {

        try {
            const token = localStorage.getItem('token');
            const response = await fetch("http://localhost:8080/api/v1/gettoken", {
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
            }else{
                localStorage.removeItem("token")
                window.location.reload();
                router.push("/")
            }
        } catch (error) {
            console.error('no autorizado:', error);
        }
    };

    return (
        <div className="fixed w-full flex justify-between align-middle py-2 px-20" style={{ backgroundColor: "#6AD4DD", zIndex:"100" }}>
            <h1 className='text-4xl'>NexNet</h1>
            <div className="flex gap-6 text-2xl">
                <Link href={"/"}><CiHome style={{fontSize:"35px"}} /></Link>
                {
                    !tokens ? <>
                        <Link href={"/login"}>Login</Link>
                        <Link href={"/register"}>register</Link>
                    </> : <>
                        <div className='cursor-pointer' onClick={() => {
                            localStorage.removeItem("token");
                            router.push("/")
                            window.location.reload()
                            settoken(null);
                        }}><IoPower style={{fontSize:"35px", color:"red", opacity:"0.8"}} /></div>

                        <div onClick={() => {
                            if (!(patname == `/users/${claims?.user.id}`)) {
                                router.push(`users/${claims?.user.id}`)
                            }
                        }
                        } className='flex gap-3 cursor-pointer'>
                            <img className='rounded-full max-w-20 max-h-10' src={`${claims?.user.avatar}`} alt="" />
                            <p className='text-sm font-normal'>{claims?.user.firstname}</p>
                        </div>
                        {/* {
                            modal && <div className='absolute top-12 right-0 h-60 w-80' style={{backgroundColor:"#FBF3D5"}}>
                                <h2>hola esto es grande</h2>
                            </div>
                        } */}
                    </>

                }
            </div>
        </div>
    )
}

export default Navbar