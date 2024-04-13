"use client"
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import useStore from '../store/store';

const LoginForm = () => {
    const [username, setUserName] = useState('');
    const [password, setPassword] = useState('');
    const router = useRouter(); 
    const{ setToken }=useStore()

    const handleSubmit = async (event) => {



        event.preventDefault();

        try {
            const response = await fetch('http://localhost:8080/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username, password }),
            });

            if (response.ok) {
                const data = await response.json()
                const token = data.token;
                setToken(token);
                localStorage.setItem('token', token);
                router.push("/")
            } else {
                // Manejar errores aquí
                console.error('Error al iniciar sesión');
            }
        } catch (error) {
            console.error('Error de red:', error);
        }
    };

    return (
        <div className="w-full h-300 flex justify-center align-middle p-40">

            <form className='flex flex-col gap-2' onSubmit={handleSubmit}>
                <h2>LOGIN</h2>
                <div>
                    <label htmlFor="userName">Nombre de Usuario:</label><br />
                    <input className='px-2 border-blue-500 border-solid border-2 focus:outline-none rounded-md py-2' type="text" id="userName" value={username} onChange={(e) => setUserName(e.target.value)} required />
                </div>
                <div>
                    <label htmlFor="password">Contraseña:</label><br />
                    <input className='px-2 border-blue-500 border-solid border-2 focus:outline-none rounded-md py-2' type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                </div>
                <div className=''>
                    <button className='bg-blue-400 rounded-md p-2' type="submit">Iniciar Sesión</button>
                </div>
            </form>

        </div>

    );
};

export default LoginForm;
