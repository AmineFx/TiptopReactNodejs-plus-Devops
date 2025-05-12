import React, { useState } from 'react'
import Logo from '../assets/logo.svg'
import { Link } from 'react-router-dom'
import {useNavigate} from 'react-router-dom'
import { apiGlobal } from '../apiGlobal'
import Cookies from 'js-cookie'
import {Button} from 'antd'
import Banner from '../components/Banner'
import Nav from '../components/Nav'
import Footer from '../components/Footer'
import Google from './Google'

const Connexion = () => {

    const [email, setEmail] = useState('');
    const [mdp, setMdp] = useState('');
    const [loading, setLoading] = useState(false);
    const [err, setErr] = useState(false);

    const navigate = useNavigate();

    const Connexion = async (e) => {
        setLoading(true);
        setErr(false);
        e.preventDefault();
        try {
            const response = await apiGlobal.post(`auth/connexion`, {email, mdp});
            Cookies.set("accessToken", response?.data?.accessToken);
            Cookies.set("userInfo", JSON.stringify(response?.data?.info));
            setLoading(false);
            navigate(0);
        } catch (error) {
            setErr(true);
            setLoading(false);
        }
    };


    return (
        <div>
            <Banner />
            <Nav />
            <main className="w-full min-h-screen flex flex-col items-center justify-center px-4">
                <div className="max-w-sm w-full text-gray-600 space-y-4">
                    <div className="text-center pb-2">
                        <img src={Logo} width={80} className="mx-auto" />
                        <div className="mt-5">
                            <h3 className="text-gray-800 text-xl font-bold sm:text-2xl">Connectez-vous à votre compte.</h3>
                        </div>
                    </div>
                    <div className="space-y-5">
                        <div>
                            <label htmlFor='email' className="font-medium">
                                Email
                            </label>
                            <input
                                type="email"
                                required
                                id='email'
                                onChange={(e) => setEmail(e.target.value)}
                                value={email}
                                className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-green-700 shadow-sm rounded-lg"
                            />
                        </div>
                        <div>
                            <label htmlFor='mdp' className="font-medium">
                                Mot de passe
                            </label>
                            <input
                                type="password"
                                id='mdp'
                                required
                                onChange={(e) => setMdp(e.target.value)}
                                value={mdp}
                                className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-green-700 shadow-sm rounded-lg"
                            />
                            {err &&<span className='text-sm text-red-500'>Email ou mot de pass incorrect.</span>}
                        </div>
                        <Button
                            size='large'
                            loading={loading}
                            onClick={Connexion}
                            className="w-full text-white font-medium bg-[#559050] hover:!text-white hover:!border-green-800 hover:!bg-green-800 active:!bg-green-800 rounded-lg duration-150"
                        >
                            Connexion
                        </Button>
                    </div>
                    <div className='flex items-center justify-center'>
                        <Google />
                    </div>
                    <p className="text-center">Vous n'avez pas encore de compte ? <Link to="/inscription" className="font-medium text-green-700 hover:text-green-800">Inscrivez-vous.</Link></p>
                </div>
            </main>
            <Footer />
        </div>
    )
}

export default Connexion