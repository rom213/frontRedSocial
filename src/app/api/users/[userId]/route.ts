import { User } from "@/app/page";
import { NextResponse } from "next/server";


interface Params{
    userId?:string
}

export async function GET(request: Request, params: {params: Params}){
    const res = await fetch(`https://reqres.in/api/users/${params.params.userId}`);
    const data:User = await res.json();
    return NextResponse.json(data);
}