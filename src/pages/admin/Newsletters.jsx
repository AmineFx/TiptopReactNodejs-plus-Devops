import { Tag, Popconfirm, message, Table } from "antd";
import { useEffect, useState } from "react";
import Sidebar from "../../components/admin/Sidebar";
import { apiGlobal } from "../../apiGlobal";
import Cookies from "js-cookie";
import { QuestionCircleOutlined } from "@ant-design/icons";
import Header from "../../components/admin/Header";

const Newsletters = () => {
    const [sideBar, setSideBar] = useState(false);
    const [loading, setLoading] = useState(false);
    const [actionLoading, setActionLoading] = useState(false);
    const [data, setData] = useState([]);
    const [filterData, setFilterData] = useState([]);
    const [search, setSearch] = useState("");
    
    const getData = async () => {
        setLoading(true);
        try {
            const response = await apiGlobal.get('newsletters', {
                headers: {
                    authorization: `Bearer ${Cookies.get('accessToken')}`
                }
            });
        if(response.status === 200) {
            setData(response?.data);
            setFilterData(response?.data);
        }
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    }

    const Supprimer = async(e, id) => {
        e.preventDefault();
        setActionLoading(true);
        try {
            const response = await apiGlobal.delete(`newsletters/supprimer/${id}`, {
            headers: {
                authorization: `Bearer ${Cookies.get('accessToken')}`
            }
            });
            if(response.status === 204) {
            await getData();
            setActionLoading(false);
            message.success('Newsletter supprimée avec succès');
            }
        } catch (error) {
        console.log(error);
            setActionLoading(false);
        }
    }

    useEffect(() => {
        getData();
    }, []);

    const columns = [
        {
            title: 'Email',
            dataIndex: 'email',
            key: 'email',
        },
        {
            title: 'Statut',
            dataIndex: 'status',
            key: 'status',
            render: (_, { status }) => {
                if(status === 1){
                    return <Tag color="green">Actif</Tag>
                }
                return <Tag color="red">Inactif</Tag>
            }
        },
        {
            title: 'Action',
            key: 'action',
            render: (_, record) => (
                <Popconfirm
                    title="Suppression"
                    description="Voulez-vous vraiment supprimer cette newsletter ?"
                    onConfirm={(e) => Supprimer(e, record?.id)}
                    // onCancel={cancel}
                    okText="Confimrer"
                    cancelText="Annuler"
                    placement="bottom"
                    okType="danger"
                    icon={<QuestionCircleOutlined style={{ color: 'red' }} />}
                    okButtonProps={{
                        loading: actionLoading
                    }}
                >
                    <button className="font-medium text-red-600 hover:text-red-500">Supprimer</button>
                </Popconfirm>
            ),
        },
    ];

    useEffect(() => {
        if(search && search !== ""){
            const filter = data?.filter(item => item?.email.includes(search.trim()));
            setFilterData(filter);
        }else{
            setFilterData(data);
        }
    }, [search])
    

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
                                    Gestion des newsletters
                                </h3>
                                <p className="text-gray-600 mt-2">
                                    Cette page vous permet de consulter et gérer les newsletters.
                                </p>
                            </div>
                            <div className="mt-6 sm:mt-0">
                                <div className="relative">
                                    <svg className="w-6 h-6 text-gray-400 absolute left-3 inset-y-0 my-auto" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                        <path fillRule="evenodd" d="M9 3.5a5.5 5.5 0 100 11 5.5 5.5 0 000-11zM2 9a7 7 0 1112.452 4.391l3.328 3.329a.75.75 0 11-1.06 1.06l-3.329-3.328A7 7 0 012 9z" clipRule="evenodd" />
                                    </svg>
                                    <input
                                        type="text"
                                        placeholder="Rechercher..."
                                        onChange={(e) => setSearch(e.target.value)}
                                        value={search}
                                        className="w-full pl-12 pr-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-green-600 rounded-lg sm:max-w-xs"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                    <Table columns={columns} dataSource={filterData} loading={loading} />
                </div>
            </div>
        </div>
    )
};

export default Newsletters;