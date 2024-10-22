import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Submenu() {
    const [isOpen, setIsOpen] = useState(false);
    const navigate = useNavigate();

    const toggleMenu = () => setIsOpen(!isOpen);

    return (
        <div className="relative">
            <button onClick={toggleMenu} className="rounded-full bg-white p-2">
                <img src="/menu.png" alt="Submenu" className="w-8 h-8" />
            </button>
            {isOpen && (
                <div className="absolute right-0 mt-2 bg-black text-white border border-gray-300 rounded-lg shadow-lg">
                    <ul>
                        <li>
                            <button
                                onClick={() => navigate('/wishlist')}
                                className="block px-4 py-2 hover:bg-amber-200 hover:text-black"
                            >
                                Wishlist
                            </button>
                        </li>
                        <li>
                            <button
                                onClick={() => navigate('/ordersClient')}
                                className="block px-4 py-2 hover:bg-amber-200 hover:text-black"
                            >
                                Pedidos
                            </button>
                        </li>
                    </ul>
                </div>
            )}
        </div>
    );
}

export default Submenu;
