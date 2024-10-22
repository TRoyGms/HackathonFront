import { Helmet } from 'react-helmet';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Header from '../components/organisms/Header';
import Label from '../components/atoms/Label';
import BoxHomeAdmin from '../components/organisms/BoxHomeAdmin';

function HomeAdmin() {
    const navigate = useNavigate();
    const { authToken, logout } = useAuth();
    const isLoggedIn = !!authToken;

    const handleLogout = () => {
        logout();
        navigate('/'); 
    };

    return (
        <div className='min-h-screen bg-black'>
                  <Helmet>
                    <title>INICIO-ADMIN</title>
                </Helmet>
            <Header 
                title="ATHLETIC_STORE" 
                logoSrc="/LOGO_BLACK.jpeg"
                className="bg-white" 
                isLoggedIn={isLoggedIn}
                onLogoutClick={handleLogout}
            />
            <div className='text-center mt-12'>
                <Label className="text-4xl font-bold text-white">GESTIÓN DE VENTAS</Label>
                <Label className="text-xl mt-8 text-white">¿Qué operación desea realizar?</Label>
                <BoxHomeAdmin 
                    onPedidosClick={() => navigate('/Pedidos')}
                    onVentasClick={() => navigate('/Ventas')}
                    onGestionClick={() => navigate('/Gestion')}
                />
            </div>
        </div>
    );
}

export default HomeAdmin;
