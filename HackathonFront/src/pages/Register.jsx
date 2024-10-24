import React from 'react';
import { useNavigate } from 'react-router-dom';
import RegisterForm from '../components/organisms/RegisterForm';
import Header from '../components/organisms/Header';
import Swal from 'sweetalert2';

export default function Register() {
  const navigate = useNavigate();

  const handleRegister = async (formData) => {
    const dataWithRole = { ...formData, Id_Rol: 2 }; // Asigna el rol de cliente (Id_Rol = 2)
    try {
      const response = await fetch('https://localhost:8080/api/clientes/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(dataWithRole),
      });

      if (!response.ok) {
        const errorData = await response.json();
        if(errorData.errno === 1062) {
          Swal.fire({
            icon : "error",
            title : "Email ya registrado"
          })
        }
      } else {
        Swal.fire({
          icon : "success",
          title : "Registro exitoso",
        })
        navigate('/login'); // Redirigir al login después del registro exitoso
      }
    } catch (error) {
      console.error('Error en el registro:', error);
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
          <h2 className="text-2xl mb-4 text-center font-bold">REGISTRARSE</h2>
          <h3 className="text-xl mb-4 text-center">Datos personales</h3>
          <RegisterForm onSubmit={handleRegister} onCancel={() => navigate('/')} />
          <div className="mt-4 text-center">
              <p className="text-sm text-gray-600">¿Ya tienes una cuenta? <span onClick={() => navigate('/login')} className="text-blue-500 cursor-pointer">Inicia Sesión</span></p>
          </div>
        </div>
      </div>
    </div>
  );
}