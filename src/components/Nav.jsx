import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Logo from '../assets/logo.svg'
import Cookies from 'js-cookie'
import { jwtDecode } from 'jwt-decode'

const Nav = () => {
    const [isOpen, setIsOpen] = useState(false);
    const decodedToken = Cookies?.get("accessToken") && jwtDecode(Cookies?.get("accessToken"));
    const navigate = useNavigate();

    const Deconnexion = () => {
        Cookies.remove('accessToken');
        Cookies.remove('userInfo');
        navigate(0);
    }

    return (
        <nav x-data={{ isOpen: false }} className="relative bg-white shadow">
            <div className="container px-6 py-3 mx-auto md:flex">
                <div className="flex items-center justify-between">
                <Link to="/">
                    <img className="w-auto h-8 sm:h-10" src={Logo} alt="photo de logo" />
                </Link>

                {/* Mobile menu button */}
                <div className="flex lg:hidden">
                    <button x-cloak onClick={() => setIsOpen(!isOpen)} type="button" className="text-gray-500 hover:text-gray-600 focus:outline-none focus:text-gray-600" aria-label="toggle menu">
                    {!isOpen ? (
                        <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M4 8h16M4 16h16" />
                        </svg>
                    ) : (
                        <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    )}
                    </button>
                </div>
                </div>

                {/* Mobile Menu open: "block", Menu closed: "hidden" */}
                <div x-cloak className={`absolute inset-x-0 z-20 w-full px-6 py-4 transition-all duration-300 ease-in-out bg-white md:mt-0 md:p-0 md:top-0 md:relative md:opacity-100 md:translate-x-0 md:flex md:items-center md:justify-between ${isOpen ? 'translate-x-0 opacity-100' : 'opacity-0 -translate-x-full'}`}>
                <div className="flex flex-col px-2 -mx-4 md:flex-row md:mx-10 md:py-0">
                    <Link to="/" className="px-2.5 py-2 text-gray-700 transition-colors duration-300 transform rounded-lg hover:bg-gray-100 md:mx-2">Accueil</Link>
                    <Link to="/jeu" className="px-2.5 py-2 text-gray-700 transition-colors duration-300 transform rounded-lg hover:bg-gray-100 md:mx-2">Jeu</Link>
                    <Link to="/regles" className="px-2.5 py-2 text-gray-700 transition-colors duration-300 transform rounded-lg hover:bg-gray-100 md:mx-2">Règles de jeux</Link>
                    {decodedToken?.role === "CLIENT" && <Link to="/participations" className="px-2.5 py-2 text-gray-700 transition-colors duration-300 transform rounded-lg hover:bg-gray-100 md:mx-2">Mes tickets</Link>}
                    {decodedToken?.role === "EMPLOYE" && <Link to="/check" className="px-2.5 py-2 text-gray-700 transition-colors duration-300 transform rounded-lg hover:bg-gray-100 md:mx-2">Valider les gains</Link>}
                    {decodedToken?.role === "MANAGER" && <Link to="/admin" className="px-2.5 py-2 text-gray-700 transition-colors duration-300 transform rounded-lg hover:bg-gray-100 md:mx-2">Administration</Link>}
                </div>

                    <div className='flex items-center gap-2 flex-col md:flex-row'>
                        {!Cookies?.get('accessToken') ?
                            <>
                                <Link to="/inscription" className="px-2.5 py-2 text-gray-700 transition-colors duration-300 transform rounded-lg hover:bg-gray-100 md:mx-2">Inscription</Link>
                                <Link to="/connexion" className="py-2 px-4 text-white bg-[#559050] hover:bg-green-700 rounded-md shadow">Connexion</Link>
                            </>
                        :   
                            <button onClick={Deconnexion} className="px-2.5 py-2 text-gray-700 transition-colors duration-300 transform rounded-lg hover:bg-gray-100 md:mx-2">Déconnexion</button>
                        }
                    </div>
                </div>
            </div>
        </nav>
    )
}

export default Nav