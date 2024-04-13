"use client"
import { useRouter } from 'next/navigation';
import { useState } from 'react'

const CreateUser = () => {

    const router = useRouter();

    const [formData, setFormData] = useState({
        username: '',
        password: '',
        firstname: '',
        lastname: '',
        country: '',
        avatar: '',
    });

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
            const response = await fetch('http://localhost:8080/auth/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                console.log('Usuario registrado exitosamente.');
                router.push("/login");
            } else {
                console.error('Error al registrar usuario:', response.statusText);
            }
        } catch (error) {
            console.error('Error al registrar usuario:', error);
        }
    };

    return (
        <div>
            <h1 className='text-4xl'>Register</h1>
            <br />
            <form className='grid grid-cols-2 gap-4' onSubmit={handleSubmit}>
                <input
                    type="text"
                    className='px-2 border-blue-500 border-solid border-2 focus:outline-none rounded-md py-2'
                    name="username"
                    placeholder="Nombre de usuario"
                    autoComplete='off'
                    value={formData.username}
                    onChange={handleChange}
                    required
                />
                <input
                    type="password"
                    className='px-2 border-blue-500 border-solid border-2 focus:outline-none rounded-md py-2'
                    name="password"
                    autoComplete='off'
                    placeholder="Contraseña"
                    value={formData.password}
                    onChange={handleChange}
                    required
                />
                <input
                    type="text"
                    className='px-2 border-blue-500 border-solid border-2 focus:outline-none rounded-md py-2'
                    name="firstname"
                    placeholder="Nombre"
                    value={formData.firstname}
                    onChange={handleChange}
                    required
                />
                <input
                    type="text"
                    className='px-2 border-blue-500 border-solid border-2 focus:outline-none rounded-md py-2'
                    name="lastname"
                    placeholder="Apellido"
                    value={formData.lastname}
                    onChange={handleChange}
                    required
                />
                <input
                    type="text"
                    className='px-2 border-blue-500 border-solid border-2 focus:outline-none rounded-md py-2'
                    name="country"
                    placeholder="País"
                    value={formData.country}
                    onChange={handleChange}
                    required
                />
                <input
                    type="url"
                    className='px-2 border-blue-500 border-solid border-2 focus:outline-none rounded-md py-2'
                    name="avatar"
                    placeholder="URL del avatar"
                    value={formData.avatar}
                    onChange={handleChange}
                    required
                />
                <button className='bg-blue-600 rounded-md p-2 cursor-pointer text-cyan-50' type="submit">Registrarse</button>
            </form>
        </div>

    );
};

export default CreateUser