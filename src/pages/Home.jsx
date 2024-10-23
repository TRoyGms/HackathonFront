import { Helmet } from 'react-helmet';
import React, { useEffect } from 'react';
import Header from '../components/organisms/Header';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import BoxHomeClient from '../components/organisms/BoxHomeClient';
import BoxCatologoHome from '../components/organisms/BoxCatalogoHome';
import Swal from 'sweetalert2';

function Home() {
    const navigate = useNavigate();
    const { authToken, logout } = useAuth();
    const isLoggedIn = !!authToken;

    const handleHomeClick = () => {
        navigate('/'); 
    };

    const handleLogoutClick = () => {
        Swal.fire({
            title : '¿Estás seguro de cerrar sesión?',
            showCancelButton: true,
            confirmButtonText: 'Aceptar',
            cancelButtonText: 'Cancelar'
          }).then((Result) => {
            if(Result.isConfirmed){
              logout();
              navigate('/');
            }
          })
    };

    return (
        <div className="min-h-screen w-full overflow-hidden bg-gradient-to-r from-neutral-700 via-black to-stone-700 bg-[length:400%_400%] animate-gradient-x">
                <Helmet>
                    <title>INICIO</title>
                </Helmet>
            <Header
                onHomeClick={handleHomeClick}
                logoSrc="/LOGO_BLACK.jpeg"
                homeIconSrc="/path/to/home_icon.png"
                title="ATHLETIC_STORE"
                subtitle="WEARING WINNERS"
                isLoggedIn={isLoggedIn}
                showSubmenu={true}
                onLogoutClick={handleLogoutClick}
                className="bg-white text-black"
            />
            <div className="p-4 sm:p-6 md:p-8 lg:p-10 xl:p-12">
                <h2 className="text-3xl mb-2 text-center font-serif text-white text-4xl md:text-5xl lg:text-6xl mt-4 mb-6">NOVEDADES</h2>
                <div className="flex flex-col md:flex-row justify-evenly items-center">
                <div className="flex flex-col md:flex-row items-center border rounded-3xl p-4 bg-amber-200 w-full md:w-2/3 mb-4 md:mb-0">
                    <img src="/NikeInvincible3.jpeg" alt="Nike Invincible Run 3" className="w-full md:w-48 h-auto mb-4 md:mb-0 md:mr-8 md:ml-6 rounded-3xl" />
                    <div className="text-justify md:text-left max-w-full md:max-w-4xl ml-0 md:ml-4">
                        <h3 className="text-2xl md:text-3xl font-bold text-black">Nike Invincible Run 3</h3>
                        {/* <p className="text-lg md:text-xl text-black font-bold mt-3">Ofrecen máxima amortiguación...</p> */}
                        <p className="text-lg md:text-xl text-black font-bold mt-3">Ofrecen máxima amortiguación y confort con su espuma ZoomX ultraligera. Ideales para largas distancias, combinan ventilación superior y tracción óptima para un rendimiento y comodidad incomparables. Perfectos para tus entrenamientos diarios.</p>
                    </div>
                </div>
                    <div className="w-full md:w-auto">
                        <BoxCatologoHome onCatalogClick={() => navigate('/CatalogoClientes')} />
                    </div>
                </div>

                <h2 className="text-3xl font-serif text-center mt-6 text-4xl md:text-5xl lg:text-6xl text-white">CATEGORÍAS</h2>
                <BoxHomeClient
                    onRunClick={() => navigate('/Running')}
                    onFutClick={() => navigate('/Futbol')}
                    onCasualClick={() => navigate('/Casual')}
                />
                
            </div>
        </div>
    );
}

export default Home;
