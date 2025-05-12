import React, { useState } from 'react'
import Logo from '../assets/logo.svg'
import Banner from '../components/Banner'
import Nav from '../components/Nav'
import Footer from '../components/Footer'
import { Link, useNavigate } from 'react-router-dom'
import {Button, message} from 'antd'
import { apiGlobal } from '../apiGlobal'
import dayjs from 'dayjs'

const Inscription = () => {

  const [loading, setLoading] = useState('');
  const [nom, setNom] = useState('');
  const [prenom, setPrenom] = useState('');
  const [email, setEmail] = useState('');
  const [genre, setGenre] = useState('');
  const [dateNaissance, setDateNaissance] = useState('');
  const [mdp, setMdp] = useState('');
  const navigate = useNavigate();

  const Inscription = async (e) => {
    e.preventDefault();
    if (!prenom || prenom === "") {
      message.error('Veuillez remplir votre prénom');
      return;
    }

    if (!nom || nom === "") {
      message.error('Veuillez remplir votre nom');
      return;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      message.error('Veuillez fournir une adresse email valide');
      return;
    }

    if (!dateNaissance || dateNaissance === "") {
      message.error('Veuillez remplir votre date de naissance');
      return;
    }

    if (!genre || genre === "") {
      message.error('Veuillez sélectionner votre genre');
      return;
    }

    if (mdp.length < 8) {
      message.error('Le mot de passe doit contenir au moins 8 caractères');
      return;
    }
    setLoading(true);
    try {
      const response = await apiGlobal.post(`auth/inscription`,{
        nom, prenom, email, genre, dateNaissance, mdp
      });
      if(response.status === 201){
        setNom("");
        setPrenom("");
        setEmail("");
        setDateNaissance("");
        setMdp("");
        setLoading(false);
        message.success('Inscription reussie');
        setTimeout(() => {
          navigate('/connexion');
        }, 1000);
      }
      message
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  }

  return (
    <div>
      <Banner />
      <Nav />
        <main className="w-full min-h-screen flex flex-col items-center justify-center px-4 py-12">
            <div className="max-w-sm md:max-w-md w-full text-gray-600 space-y-4">
                <div className="text-center pb-2">
                    <img src={Logo} width={80} className="mx-auto" />
                    <div className="mt-5">
                        <h3 className="text-gray-800 text-xl font-bold sm:text-2xl">Créer votre propre compte.</h3>
                    </div>
                </div>
                <div className="space-y-4">
                  <div className='flex items-center gap-5'>
                    <div className='flex-1'>
                      <label className="font-medium text-sm">
                          Prénom
                      </label>
                      <input
                          type="text"
                          required
                          onChange={(e) => setPrenom(e.target.value)}
                          value={prenom}
                          className="w-full mt-1 px-3 py-1.5 text-gray-500 bg-transparent outline-none border focus:border-green-700 shadow-sm rounded-lg"
                      />
                    </div>
                    <div className='flex-1'>
                      <label className="font-medium text-sm">
                          Nom
                      </label>
                      <input
                          type="text"
                          required
                          onChange={(e) => setNom(e.target.value)}
                          value={nom}
                          className="w-full mt-1 px-3 py-1.5 text-gray-500 bg-transparent outline-none border focus:border-green-700 shadow-sm rounded-lg"
                      />
                    </div>
                  </div>
                  <div>
                      <label className="font-medium text-sm">
                          Email
                      </label>
                      <input
                          type="email"
                          required
                          onChange={(e) => setEmail(e.target.value)}
                          value={email}
                          className="w-full mt-1 px-3 py-1.5 text-gray-500 bg-transparent outline-none border focus:border-green-700 shadow-sm rounded-lg"
                      />
                  </div>
                  <div className='flex items-center gap-5'>
                    <div className='flex-1'>
                      <label className="font-medium text-sm">
                          Date de naissance
                      </label>
                      <input
                          type="date"
                          required
                          onChange={(e) => setDateNaissance(dayjs(e.target.value).format('YYYY-MM-DD' || ""))}
                          value={dayjs(dateNaissance).format('YYYY-MM-DD') || ""}
                          className="w-full mt-1 px-3 py-1.5 text-gray-500 bg-transparent outline-none border focus:border-green-700 shadow-sm rounded-lg"
                      />
                    </div>
                    <div className='flex-1'>
                      <label className="font-medium text-sm">
                          Genre
                      </label>
                      <div className="relative w-full mt-1">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="absolute top-0 bottom-0 w-5 h-5 my-auto text-gray-400 right-3"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path
                            fillRule="evenodd"
                            d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                            clipRule="evenodd"
                          />
                        </svg>
                        <select 
                          value={genre}
                          onChange={(e) => setGenre(e.target.value)}
                          className="w-full px-3 py-2 text-sm text-gray-600 bg-white border rounded-lg shadow-sm outline-none appearance-none focus:ring-offset-2 focus:ring-green-700 focus:ring-2"
                        >
                          <option>Selectionner votre genre</option>
                          <option value="HOMME">Homme</option>
                          <option value="FEMME">Femme</option>
                          <option value="AUTRE">Autre</option>
                        </select>
                      </div>
                    </div>
                  </div>
                  <div>
                      <label className="font-medium text-sm">
                          Mot de passe
                      </label>
                      <input
                          type="password"
                          required
                          onChange={(e) => setMdp(e.target.value)}
                          value={mdp}
                          className="w-full mt-1 px-3 py-1.5 text-gray-500 bg-transparent outline-none border focus:border-green-700 shadow-sm rounded-lg"
                      />
                  </div>
                  <Button
                      size='large'
                      loading={loading}
                      onClick={Inscription}
                      className="w-full text-white font-medium bg-[#559050] hover:!text-white hover:!border-green-800 hover:!bg-green-800 active:!bg-green-800 rounded-lg duration-150"
                  >
                      Inscription
                  </Button>
                </div>
                <p className="text-center">Vous avez un compte ? <Link to="/connexion" className="font-medium text-green-700 hover:text-green-800">Connectez-vous.</Link></p>
            </div>
        </main>
        <Footer />
    </div>
  )
}

export default Inscription