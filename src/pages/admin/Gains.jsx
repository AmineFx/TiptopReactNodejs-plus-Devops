import { Tag, Table } from "antd";
import { useEffect, useState } from "react";
import Sidebar from "../../components/admin/Sidebar";
import { apiGlobal } from "../../apiGlobal";
import Cookies from "js-cookie";
import Header from "../../components/admin/Header";

const Gains = () => {
    const [sideBar, setSideBar] = useState(false);
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState([]);
    
    const getData = async () => {
        setLoading(true);
        try {
            const response = await apiGlobal.get('gains-type', {
                headers: {
                authorization: `Bearer ${Cookies.get('accessToken')}`
                }
            });
        if(response.status === 200) {
            setData(response?.data);
        }
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        getData();
    }, []);

    const columns = [
        {
            title: 'Image',
            dataIndex: 'img',
            key: 'img',
            render: img => <img src={`/assets/${img}`} alt="photo de gain" className="w-16 h-16 rounded-full" />
        },
        {
            title: 'Libelle',
            dataIndex: 'libelle',
            key: 'libelle',
        },
        {
            title: 'Pourcentage',
            dataIndex: 'percentage',
            key: 'percentage',
        },
        {
            title: 'Nombre Total des tickets',
            dataIndex: 'ticketsTotal',
            key: 'ticketsTotal',
        },
        {
            title: 'Tickets restés',
            dataIndex: 'ticketsUtilise',
            key: 'ticketsUtilise',
        },
    ];
    

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
                                    Gestion des Gains
                                </h3>
                                <p className="text-gray-600 mt-2">
                                    Cette page vous permet de consulter les gains.
                                </p>
                            </div>
                        </div>
                    </div>
                    <Table columns={columns} dataSource={data} loading={loading} />
                </div>
            </div>
        </div>
    )
};

export default Gains;