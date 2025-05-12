import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { apiGlobal } from '../apiGlobal'
import Cookies from 'js-cookie'
import { Table, Tag } from 'antd'
import Banner from '../components/Banner'
import Nav from '../components/Nav'
import Footer from '../components/Footer'
import { jwtDecode } from 'jwt-decode'
import dayjs from 'dayjs'

const MyWins = () => {

  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const decodedToken = Cookies.get('accessToken') && jwtDecode(Cookies.get('accessToken'));

  const getData = async () => {
    setLoading(true);
    try {
      const response = await apiGlobal.get(`billets/client/${decodedToken?.id}`, {
        headers: {
          authorization: `Bearer ${Cookies.get('accessToken')}`
        }
      });
      if(response.status === 200) {
        setData(response?.data)
      }
    } catch (error) {
      console.log(error);
    } finally{
      setLoading(false);
    }
  };

  const columns = [
    {
      title: 'Code',
      dataIndex: 'code',
      key: 'code',
    },
    {
      title: 'Gain',
      dataIndex: 'libelle',
      key: 'libelle',
    },
    {
      title: 'Utilisé',
      dataIndex: 'statut',
      key: 'statut',
      render: (_, { statut }) => {
        if(statut === 1){
            return <Tag color="green">Oui</Tag>
        }
        return <Tag color="red">Non</Tag>
      }
    },
    {
      title: 'Date d\'utiliastion',
      dataIndex: 'dateUtilise',
      key: 'dateUtilise',
      render: dateUtilise => dayjs(dateUtilise).format('DD/MM/YYYY')
    },
    {
      title: 'Récupérer',
      dataIndex: 'recuperer',
      key: 'recuperer',
      render: (_, { recuperer }) => {
        if(recuperer === 1){
            return <Tag color="green">Oui</Tag>
        }
        return <Tag color="red">Non</Tag>
      }
    },
  ];

  useEffect(() => {
    getData();
  }, []);

  return (
    <div>
      <Banner />
      <Nav />
      <section className="bg-white container max-w-4xl px-6 mx-auto">
          <div className="flex items-center py-4 overflow-x-auto whitespace-nowrap">
            <Link to="/" className="text-gray-600 ">
                <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
                </svg>
            </Link>

            <span className="mx-5 text-gray-500  rtl:-scale-x-100">
                <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                </svg>
            </span>

            <Link to="/participations" className="text-gray-600  hover:underline">
                Mes tickets
            </Link>
          </div>
          <div className="pt-10 pb-28">
            <h4 className='text-2xl font-bold text-center'>Mes tickets</h4>
            <div className='pt-10'>
              <Table columns={columns} dataSource={data} loading={loading} />
            </div>
          </div>
      </section>
      <Footer />
    </div>
  )
}

export default MyWins