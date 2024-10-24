import { useNavigate } from 'react-router-dom';
import Logo from '../atoms/Logo';
import HeaderTitle from '../atoms/HeaderTitle';
import Button from '../atoms/Button';
import Submenu from '../molecules/Submenu';

function Header({ onHomeClick, logoSrc, title, subtitle, isLoggedIn, onLogoutClick, className, searchTerm, onSearchChange, showSearch, showSubmenu, isAdminView }) {
    const navigate = useNavigate();

    return (
        <header className={`flex flex-col md:flex-row justify-between items-center py-4 md:py-8 px-4 md:px-8 ${className}`}>
            <button onClick={onHomeClick}>
                <Logo src={logoSrc} alt="Logo" className="rounded-full w-20" />
            </button>
            <div className="flex flex-col items-center">
                <HeaderTitle>{title}</HeaderTitle>
                <h2 className="text-xl">{subtitle}</h2> 
            </div>
            <div className="flex items-center space-x-4">
                {showSearch && (
                    <input 
                        type="text" 
                        value={searchTerm} 
                        onChange={onSearchChange} 
                        placeholder="Buscar productos..." 
                        className="py-2 px-4 border rounded-lg"
                    />
                )}
                {!isLoggedIn ? (
                    !isAdminView && (
                        <button onClick={() => navigate('/login')} className="rounded-full bg-white">
                            <img src="/profile.png" alt="Profile" className="w-8 h-8 md:w-14 md:h-14" />
                        </button>
                    )
                ) : (
                    <Button
                        onClick={onLogoutClick}
                        className="py-2 px-4 rounded-lg hover:bg-neutral-400 hover:text-black bg-black text-white"
                    >
                        Cerrar Sesión
                    </Button>
                )}
                {showSubmenu && <Submenu />}
            </div>
        </header>
    );
}

export default Header;
