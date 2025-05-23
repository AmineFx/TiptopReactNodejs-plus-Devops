import React from 'react'
import { Link } from 'react-router-dom'
import Nav from '../components/Nav'
import Footer from '../components/Footer'
import Banner from '../components/Banner'

const NotFound = () => {
    return (
        <div>
            <Banner />
            <Nav />
            <section className="bg-white">
            <div className="container min-h-screen px-6 py-12 mx-auto lg:flex lg:items-center lg:gap-12">
                <div className="wf-ull lg:w-1/2">
                <p className="text-sm font-medium text-blue-500">404 Erreur</p>
                <h1 className="mt-3 text-2xl font-semibold text-gray-800 md:text-3xl">Page non trouvée</h1>
                <p className="mt-4 text-gray-500">Désolé, la page que vous recherchez n'existe pas.</p>

                <div className="flex items-center mt-6 gap-x-3">
                    <Link to="/" className="flex items-center justify-center w-1/2 px-5 py-2 text-sm text-gray-700 transition-colors duration-200 bg-white border rounded-lg gap-x-2 sm:w-auto hover:bg-gray-100">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5 h-5 rtl:rotate-180">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 15.75L3 12m0 0l3.75-3.75M3 12h18" />
                    </svg>
                    <span>Revenir à l'acceuil</span>
                    </Link>

                    {/* <button className="w-1/2 px-5 py-2 text-sm tracking-wide text-white transition-colors duration-200 bg-blue-500 rounded-lg shrink-0 sm:w-auto hover:bg-blue-600">
                    Revenir à l'acceuil
                    </button> */}
                </div>
                </div>

                <div className="relative w-full mt-12 lg:w-1/2 lg:mt-0">
                <img className="w-full max-w-lg lg:mx-auto" src="https://merakiui.com/images/components/illustration.svg" alt="" />
                </div>
            </div>
            </section>
            <Footer />
        </div>
    )
}

export default NotFound