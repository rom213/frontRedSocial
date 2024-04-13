"use client"
import { useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';


const CreatePost = () => {
  const route = useRouter();

  const [formData, setFormData] = useState({
    contenido: "",
    img_post: "",
  });

  // Function to handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      const token = localStorage.getItem('token');
      const randomString = Math.random().toString(36).substring(7); // Genera una cadena de consulta aleatoria
      const response = await fetch(`http://localhost:8080/api/v1/publicaciones?cacheBuster=${randomString}`, {
        method: 'POST',
        headers: {
          "Content-Type": 'application/json', // Ajusta el tipo de contenido según sea necesario
          "Authorization": `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
        // mode:'no-cors',
      });
  
      if (response.ok) {
        console.log('Post created successfully!');
        setFormData({contenido:"", img_post:""})
        window.location.reload();
        
      } else {
        console.error('Error creating post:', response.statusText);
      }
    } catch (error) {
      console.error('Error creating post:', error);
    }
  };
  

  return (
    <div>
      {
        typeof localStorage !== 'undefined' && localStorage.getItem("token") &&
        <div>
          <h2 className="text-2xl">Create Post</h2>
          <form className="grid gap-4" onSubmit={handleSubmit}>
            <input
              type="text"
              className="px-2 border-blue-500 border-solid border-2 focus:outline-none rounded-md py-2"
              name="contenido"
              placeholder="Title for your post"
              autoComplete="off"
              value={formData.contenido}
              onChange={handleChange}
              required
            />
            <input
              type="text"
              className="px-2 border-blue-500 border-solid border-2 focus:outline-none rounded-md py-2"
              name="img_post"
              placeholder="URL of the post image"
              value={formData.img_post}
              onChange={handleChange}
              required
            />
            <button className="bg-blue-600 rounded-md p-2 cursor-pointer text-cyan-50" type="submit">
              Create Post
            </button>
          </form>
        </div>
      }

      {/* )} */}
    </div>
  );
};

export default CreatePost;



