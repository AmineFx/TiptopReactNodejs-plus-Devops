import React from 'react'
import { Link } from 'react-router-dom'

const Banner = () => {
    return (
        <div className="bg-[#559050]">
            <div className="max-w-screen-xl mx-auto px-4 py-3 text-white sm:text-center md:px-8">
                <p className="font-medium">
                    Nous avons lancé notre jeu! <Link to="/jeu" className="font-semibold underline duration-150 hover:text-indigo-100 inline-flex items-center gap-x-1">
                        Jouez maintenant
                    </Link>
                </p>
            </div>
        </div>
    )
}

export default Banner