"use server"

import Link from "next/link";
import { AiFillLike } from "react-icons/ai";
import { FaRegCommentDots } from "react-icons/fa6";
import { PostProps } from "../page";



async function fetchLikes(id: number): Promise<any[]> {
    const res = await fetch(`http://localhost:8080/api/v1/likes/${id}`);
    const data = await res.json();
    return data;
  }


const Users: React.FC<PostProps> = async({ post }) => {
    const like: any[] = await fetchLikes(post.id);
    return (
        <Link className="flex-grow bg-gray-200 rounded-xl overflow-hidden w-100" href={`/users/${post.id}`}>
            <div key={post.id}>
                <div className="p-5 flex gap-3">
                    <img src={post.user.avatar} alt={`${post.user.avatar}`} className="rounded-full max-w-20 max-h-10" />
                    <h1>{post.user.username} {post.user.lastname}</h1>
                </div>

                <div className="px-12">
                    <p>{post.contenido}</p>
                    <img className="min-w-full" src={post.img_post} alt={`${post.id}`} />
                </div>
                <div className="py-3 bg-sky-400">
                    <div className="flex justify-start px-10 gap-3">
                        <div className="flex gap-2">
                            <AiFillLike size={30} /> 
                            {like.length > 0 ? like.length-1: like.length}
                        </div>
                        <FaRegCommentDots size={30} />
                    </div>
                </div>
            </div>
        </Link>


    )
}

export default Users
