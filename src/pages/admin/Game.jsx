import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import Sidebar from "../../components/admin/Sidebar";
import Header from "../../components/admin/Header";
import { apiGlobal } from '../../apiGlobal';
import Cookies from 'js-cookie';

const Game = () => {

  const navigate = useNavigate();
  const [sideBar, setSideBar] = useState(false);
  const [participants, setParticipants] = useState({});
  const [winner, setWinner] = useState(null);

  useEffect(() => {
    const getStats = async () => {
      try {
        const response = await apiGlobal.get('utilisateurs/participants', {
          headers: {
            authorization: `Bearer ${Cookies.get('accessToken')}`
          }
        });
        console.log(response)
        if (response.status === 200) {
          setParticipants(response.data);
        }
      } catch (error) {
        console.log(error);
      }
    }
    getStats();
  }, [])

  return (
    <div className="min-h-screen bg-gray-50" x-data="{ sideBar: false }">
      <Sidebar sideBar={sideBar} setSideBar={setSideBar} />
      <div className="ml-0 transition md:ml-60">
        <Header setSideBar={setSideBar} />
        <div className="max-w-screen-xl mx-auto px-4 pt-4 md:px-8 pb-16">
          <div className="mt-5 mb-12">
            <div className="items-start justify-between gap-x-4 py-4 border-b sm:flex">
              <div className="max-w-lg">
                <h3 className="text-gray-800 text-2xl font-bold">
                  Grand jeu
                </h3>
                <p className="text-gray-600 mt-2">
                  Cette page vous permet de tirer au sort un gagnant parmi les participants.
                </p>
              </div>
            </div>
          </div>
          <div className="bg-light w-1/2 mx-auto text-center">
            <p>Nombre de participants : {participants.length}</p>
            <button onClick={() => {
              const random = Math.floor(Math.random() * participants.length);
              setWinner(participants[random]);
            }} className="my-4 bg-[#00723b] text-white py-2 px-6 rounded-full text-lg font-semibold transition duration-300 ease-in-out transform hover:scale-105 hover:shadow-lg">Tirer au sort</button>
            {
              winner &&
              <div className='bg-gray-100 py-3 rounded '>
                <p>Le gagnant : <br></br><b>{winner?.prenom} {winner?.nom} ({winner?.email})</b></p>
              </div>
            }
          </div>        </div>
      </div>
    </div>
  );
}

export default Game