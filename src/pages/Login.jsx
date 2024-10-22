import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Header from '../components/organisms/Header';
import LoginForm from '../components/organisms/LoginForm';
import Swal from 'sweetalert2';

export default function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleLogin = async (credentials) => {
    try {
      const response = await fetch('https://athleticstoreapi.integrador.xyz/api/Clientes/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(credentials),
      });

      if (response.ok) {
        const data = await response.json();
        const token = response.headers.get('Authorization');
        if (token) {
          login(token, data.id, data.rol); // Asegúrate de pasar el rol aquí
          if (data.rol === 1) {
            navigate('/HomeAdmin');
            Swal.fire({
              icon : "success",
              title : "Inicio de sesión exitoso"
            })
          } else if (data.rol === 2) {
            navigate('/');
            navigate('/HomeAdmin');
            Swal.fire({
              icon : "success",
              title : "Inicio de sesión exitoso"
            })
          } else {
            console.error('Rol no reconocido');
          }
        } else {
          console.error('No se recibió el token de autenticación');
        }
      } else {
        const errorData = await response.json();
        if (errorData.message === "Contraseña incorrecta") {
          Swal.fire({
            icon : "error",
            title : "Error al autenticarse",
            text : "Contraseña ingresada incorrecta"
          })
        } else if(errorData.message === "Usuario no encontrado") {
          Swal.fire({
            icon : "error",
            title : "Error al autenticarse",
            text : "Usuario ingresado no encontrado"
          })
        }
      }
    } catch (error) {
      if(error) {
        Swal.fire({
            icon : "error",
            title : "Error del sistema"
        })
      }
    }
  };

  return (
    <div>
      <Header 
        title="ATHLETIC_STORE" 
        logoSrc="/LOGO_BLACK.jpeg"
        className="bg-white"
        homeIconSrc="/path/to/home_icon.png"
        onHomeClick={() => navigate("/")}
      />
      <div className="min-h-screen flex items-center justify-center bg-black">
        <div className="bg-white p-8 rounded-lg shadow-lg w-96">
          <h2 className="text-2xl mb-4 text-center">Iniciar Sesión</h2>
          <LoginForm onSubmit={handleLogin} onCancel={() => navigate('/')} />
          <div className="mt-4 text-center">
            <p className="text-sm text-gray-600">¿No estás registrado? <span onClick={() => navigate('/register')} className="text-blue-500 cursor-pointer">Regístrate</span></p>
          </div>
        </div>
      </div>
    </div>
  );
}