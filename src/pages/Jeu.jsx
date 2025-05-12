import React, { useState } from 'react'
import Logo from '../assets/logo.svg'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import { apiGlobal } from '../apiGlobal'
import Cookies from 'js-cookie'
import { Button, Modal, Input, Form, message } from 'antd'
import Banner from '../components/Banner'
import Nav from '../components/Nav'
import Footer from '../components/Footer'
import { Wheel } from 'react-custom-roulette'
import tea from '../assets/tea.png'
import box100g from '../assets/box-100g.png'
import box from '../assets/box.png'
import pack39 from '../assets/pack-39.png'
import pack69 from '../assets/pack-69.png'

const Jeu = () => {

  const [prizeNumber, setPrizeNumber] = useState(2);
  const [mustSpin, setMustSpin] = useState(false);
  const [modal, setModal] = useState(false);
  const [verifier, setVerifier] = useState(false);
  const [code, setCode] = useState('');
  const [loading, setLoading] = useState(false);
  const [ticket, setTicket] = useState(null);

  const verifierTicket = async () => {
    setLoading(true);
    try {
      const response = await apiGlobal.get(`billets/${code}`, {
        headers: {
          authorization: `Bearer ${Cookies.get('accessToken')}`
        }
      });
      console.log(response?.data);
      if (response.status === 200) {
        if (response?.data) {
          if (response?.data?.statut === 1) {
            setLoading(false);
            setVerifier(false);
            message.error('Ce ticket a déjà été utilisé');
            return;
          }
          setVerifier(true);
          setTicket(response?.data);
          setLoading(false);
        } else {
          setLoading(false);
          setVerifier(false);
          message.error('Ce ticket n\'existe pas');
        }
      }
    } catch (error) {
      console.log(erro);
      setLoading(false);
    }
  }

  return (
    <div>
      <Banner />
      <Nav />
      <main className="w-full min-h-screen flex flex-col items-center justify-center px-4">
        <Wheel
          mustStartSpinning={mustSpin}
          prizeNumber={prizeNumber}
          data={[
            { option: '1', style: { backgroundColor: '#EFF1FE', textColor: '#000' }, image: { uri: tea, offsetY: 150 } },
            { option: '2', style: { backgroundColor: '#EFF1FE', textColor: '#000' }, image: { uri: box100g, offsetY: 150 } },
            { option: '3', style: { backgroundColor: '#EFF1FE', textColor: '#000' }, image: { uri: box, offsetY: 150 } },
            { option: '4', style: { backgroundColor: '#EFF1FE', textColor: '#000' }, image: { uri: pack39, offsetY: 150 } },
            { option: '5', style: { backgroundColor: '#EFF1FE', textColor: '#000' }, image: { uri: pack69, offsetY: 150 } },
          ]}
          onStopSpinning={async () => {
            await apiGlobal.put('billets/modifier/client', { id: ticket?.id }, {
              headers: {
                'Authorization': `Bearer ${Cookies.get('accessToken')}`
              }
            });
            setMustSpin(false);
            setModal(true);
          }}
          spinDuration={0.3}
          radiusLineColor='#559050'
          radiusLineWidth={6}
          backgroundColors={["#ffffff8c"]}
          outerBorderColor='#559050'
          outerBorderWidth={8}
        />
        {verifier ?
          <Button
            className='!bg-[#559050] text-white mt-5 text-xl h-10'
            type="primary"
            onClick={() => {
              setMustSpin(true);
            }}
          >
            Tourner
          </Button>
          :
          <div className='mt-4'>
            <p className='py-2'>Entrer ici votre code ticket pour participer.</p>
            <div className='flex flex-col'>
              <Form.Item label="Code ticket">
                <Input onChange={(e) => setCode(e.target.value)} />
              </Form.Item>
              <Button
                className='!bg-[#559050] text-white'
                type="primary"
                disabled={!code || code === ''}
                onClick={verifierTicket}
                loading={loading}
              >
                Vérifier
              </Button>
            </div>
          </div>
        }
        <Modal
          title="Félicitations"
          open={modal}
          footer={null}
          closable={false}
        >
          <h3>Vous avez gagné un cadeau</h3>

          <div className='bg-[#559050] text-center text-white py-4 w-[full] mt-4 rounded'>{ticket?.libelle}</div>
          <p className='mt-4'>Merci de présenter le code suivant pour récupérer votre cadeau</p>
          <h3 className='bg-[#559050] text-white text-center py-2 w-[full] mt-4 rounded'>CODE: {ticket?.code}</h3>
          <Link to="/participations"><Button type='default' className='mt-5 w-full mx-auto'>Voir mes Tickets</Button></Link>
        </Modal>
      </main>
      <Footer />
    </div>
  )
}

export default Jeu