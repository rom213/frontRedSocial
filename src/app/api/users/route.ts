import { User } from '@/app/page';
import { NextResponse } from 'next/server';



export async function GET(): Promise<NextResponse<User[]>> {
    const res = await fetch("https://reqres.in/api/users");
    const data:User[] = await res.json();
    return NextResponse.json(data);
}



export function POST(){
    return NextResponse.json({
        "messaje":"creando datps"
    })
}


export function PUT(){
    return NextResponse.json({
        "messaje":"hello word"
    })
}

export function DELETE(){
    return NextResponse.json({
        "messaje":"hello word"
    })
}