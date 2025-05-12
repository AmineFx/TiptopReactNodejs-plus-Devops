import React, { useState } from 'react'
import Logo from '../assets/logo.svg'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import { apiGlobal } from '../apiGlobal'
import Cookies from 'js-cookie'
import { Button, Modal, message } from 'antd'
import Banner from '../components/Banner'
import Nav from '../components/Nav'
import Footer from '../components/Footer'
import { Wheel } from 'react-custom-roulette'
import tea from '../assets/tea.png'
import box100g from '../assets/box-100g.png'
import box from '../assets/box.png'
import pack39 from '../assets/pack-39.png'
import pack69 from '../assets/pack-69.png'

const Check = () => {

  const [code, setCode] = useState('');
  const [loading, setLoading] = useState(false);
  const [loadingValid, setLoadingValid] = useState(false);
  const [ticket, setTicket] = useState(null);

  const verifierTicket = async () => {
    setLoading(true);
    try {
      const response = await apiGlobal.get(`billets/${code}`, {
        headers: {
          authorization: `Bearer ${Cookies.get('accessToken')}`
        }
      });
      if(response.status === 200) {
        if(response?.data) {
          if(response?.data?.recuperer === 1) {
            setLoading(false);
            message.error('Ce ticket a déjà été validé');
            return;
          }
          setTicket(response?.data);
          setLoading(false);
        }else{
          setLoading(false);
          message.error('Ce ticket n\'existe pas');
        }
      }
    } catch (error) {
      console.log(erro);
      setLoading(false);
    }
  }

  const validerTicket = async () => {
    setLoadingValid(true);
    try {
      const response = await apiGlobal.put(`billets/modifier/employe`, {id: ticket?.id}, {
        headers: {
          authorization: `Bearer ${Cookies.get('accessToken')}`
        }
      });
      if(response.status === 200) {
        message.success('Le gain a été validé avec succès');
        setCode('');
        setTicket(null);
        loadingValid(false);
      }
    } catch (error) {
      console.log(error);
      loadingValid(false);
    }
  }

  return (
    <div>
      <Banner />
      <Nav />
      <main className="w-full min-h-[300px] flex flex-col items-center justify-center px-4 pt-12 pb-20">
        <h1 className="text-3xl font-bold text-center mb-10">Vérifiez les gains des participants</h1>

        <input
          type="text"
          value={code}
          onChange={(e) => setCode(e.target.value)}
          placeholder="Entrez le code de vérification"
          className="border border-green-700 outline-none rounded-md p-2 w-80"
        />

        <Button
          className='!bg-[#559050] !text-white mt-5 text-xl h-10'
          type="primary"
          onClick={verifierTicket}
          loading={loading}
        >
          Vérifier
        </Button>

        {ticket?.id ? <div className='max-w-md mx-auto mt-10'>
          <div className='flex flex-col items-center'>
            <span className='text-2xl'>{ticket?.libelle}</span>
            <span className='text-sm'>{ticket?.code}</span>
          </div>
          <Button 
            onClick={validerTicket}
            className='!bg-[#559050] !text-white mt-5 text-xl h-10'
            loading={loadingValid}
          >
            Valider le gain
          </Button>
          </div>
          : null}
      </main>
      <Footer />
    </div>
  )
}

export default Check