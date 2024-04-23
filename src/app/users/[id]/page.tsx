"use client"

import { UserClaims } from "@/app/components/Navbar";
import useStore from "@/app/store/store";
import { useEffect, useState } from "react";
import "@/app/users/[id]/styles.css"
import { FaGraduationCap, FaRegCommentDots } from "react-icons/fa6";
import { IoIosHome } from "react-icons/io";
import { CiLocationOn } from "react-icons/ci";
import { MdOutlinePhone } from "react-icons/md";
import { PiCakeDuotone } from "react-icons/pi";
import CreatePost from "@/app/components/CreatePost";
import { useParams } from "next/navigation";
import { Post } from "@/app/page";
import { FiMoreVertical } from "react-icons/fi";
import { AiFillLike } from "react-icons/ai";
import { TfiPencilAlt } from "react-icons/tfi";
import { FaTrashCan } from "react-icons/fa6";
// import { useParams } from "next/navigation";





const page = () => {

  const [claims, setClaims] = useState<UserClaims | null>(null);
  const [posts, setPosts] = useState<Post[] | null>(null);
  const [likes, setLikes] = useState<any>();
  const [modalShow, setmodalShow] = useState<boolean>(false);


  const { token } = useStore()
  const params = useParams<{ id: string }>();



  useEffect(() => {
    handleInfoData();
  }, [params])

  const handleInfoData = async () => {
    const timestamp = new Date().getTime();
    const res = await fetch(`http://localhost:8080/api/v1/publicaciones/all/${params.id}?timestamp=${timestamp}`);
    const data: Post[] = await res.json();
    setPosts(data.reverse());
  }

  const handleDeletePost = async (id: number) => {
    try {
      const timestamp = new Date().getTime();
      const token = localStorage.getItem("token"); // Replace with your actual token
      const response = await fetch(`http://localhost:8080/api/v1/publicaciones/${id}?timestamp=${timestamp}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`, // Set the Authorization header
        },
      });
  
      if (!response.ok) {
        throw new Error(`Error deleting post: ${response.statusText}`);
      }
  
      window.location.reload()
    } catch (error) {
      console.error('Error deleting post:', error);
    }
  };
  



  useEffect(() => {
    const storedToken = localStorage.getItem("token");
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
        console.log(data)
        setClaims(data);
      }
    } catch (error) {
      console.error('no autorizado:', error);
    }
  };

  return (
    <div className="cont_user">
      <div className="section_1">
        <div className="section_img">
          <div className="flex gap-1 flex-col">
            <div className="img_avatar">
              <img src={`${claims?.user.avatar}`} alt="" />
            </div>
            <div>
              <h2 className="text-2xl">{claims?.user.firstname}</h2>
              <span>1 mil amigos</span>
              <div>
                <div className="bg-orange-400 w-6 h-6 rounded-full">
                  <div className="bg-slate-400 w-6 h-6 rounded-full relative left-3">
                    <div className="bg-black w-6 h-6 rounded-full relative left-3">
                      <div className="bg-blue-500 w-6 h-6 rounded-full relative left-3">
                        <div className="bg-orange-400 w-6 h-6 rounded-full relative left-3"></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="section_info">
          <div className="flex gap-3 justify-center">
            <div className="cursor-pointer border-b border-black"><span>Informacion</span></div>
            <div className=" cursor-pointer hover:border-b border-black"><span>Amigos</span></div>
            <div className="cursor-pointer hover:border-b border-black"><span>Fotos</span></div>
          </div>
          <div className="p-3">
            <div className="flex gap-2 flex-col">
              <div className="flex gap-2"><FaGraduationCap style={{ fontSize: "35px", opacity: "0.9" }} /> <span className="relative top-1">Estudio en colegio de velez</span></div>
              <div className="flex gap-2 align-middle"><IoIosHome style={{ fontSize: "35px", opacity: 0.9 }} /> <span className="relative top-1">vive en velez</span> </div>
              <div className="flex gap-2 align-middle"><CiLocationOn style={{ fontSize: "35px", opacity: 0.9 }} /> <span className="relative top-1">de la paz</span> </div>
              <div className="flex gap-2 align-middle"><MdOutlinePhone style={{ fontSize: "35px", opacity: 0.9 }} /> <span className="relative top-1">3224668364</span> </div>
              <div className="flex gap-2 align-middle"><PiCakeDuotone style={{ fontSize: "35px", opacity: 0.9 }} /> <span className="relative top-1">23 febrero 2001</span> </div>
            </div>
          </div>
        </div>
      </div>
      <div className="section_2">
        <div className="scale-75" style={{ zIndex: "-1" }}>
          <CreatePost />
        </div>
        <div className="px-32 flex flex-col gap-2">
          {
            posts?.map((post) => {
              return <div className="rounded-xl overflow-hidden w-100" style={{ background: "linear-gradient(0deg, rgba(249,253,254,1) 31%, rgb(37, 204, 219) 100%)" }}>
                <div key={post.id}>
                  <div className="flex justify-between align-middle">
                    <div className="p-5 flex gap-3">
                      <img src={post.user.avatar} alt={`${post.user.avatar}`} className="rounded-full max-w-20 max-h-10" />
                      <h1>{post.user.username} {post.user.lastname}</h1>
                    </div>
                    <div className="relative top-6 right-6 hover_modal">
                      <FiMoreVertical style={{fontSize:"25px", cursor:"pointer"}} onClick={()=>{setmodalShow(!modalShow)}} />
                      {
                        modalShow &&
                        <div className="modal_cont">
                          <TfiPencilAlt style={{fontSize:"25px", cursor:"pointer"}} />
                          <FaTrashCan style={{fontSize:"25px", color:"red", opacity:"0.8", cursor:"pointer"}} onClick={()=>{handleDeletePost(post.id)}} />
                        </div>
                      }
                    </div>
                  </div>


                  <div className="px-12">
                    <p>{post.contenido}</p>
                    <img className="min-w-full" src={post.img_post} alt={`${post.id}`} />
                  </div>
                  <div className="py-3 bg-sky-400">
                    <div className="flex justify-start px-10 gap-3">
                      <div className="flex gap-2">
                        <AiFillLike size={30} />
                        {/*                         {like.length > 0 ? like.length - 1 : like.length} */}
                      </div>
                      <FaRegCommentDots size={30} />
                    </div>
                  </div>
                </div>
              </div>
            })
          }
        </div>
      </div>
    </div>
  )
}

export default page