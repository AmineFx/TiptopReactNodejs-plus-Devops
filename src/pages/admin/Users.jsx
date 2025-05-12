import { Tag, Popconfirm, message, Table, Space, Modal, Button } from "antd";
import { useEffect, useState } from "react";
import Sidebar from "../../components/admin/Sidebar";
import { apiGlobal } from "../../apiGlobal";
import Cookies from "js-cookie";
import { QuestionCircleOutlined } from "@ant-design/icons";
import Header from "../../components/admin/Header";
import dayjs from "dayjs";

const Users = () => {
    const [sideBar, setSideBar] = useState(false);  
    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const [actionLoading, setActionLoading] = useState(false);
    const [data, setData] = useState([]);
    const [filterData, setFilterData] = useState([]);
    const [search, setSearch] = useState("");

    const [nom, setNom] = useState('');
    const [prenom, setPrenom] = useState('');
    const [email, setEmail] = useState('');
    const [role, setRole] = useState('');
    const [genre, setGenre] = useState('');
    const [dateNaissance, setDateNaissance] = useState('');
    const [mdp, setMdp] = useState('');
    const [id, setId] = useState(null);
    const [isEdit, setIsEdit] = useState(false);

    const showModal = () => setOpen(true);
    const handleCancel = () => {
        setOpen(false);
        setNom('');
        setPrenom('');
        setEmail('');
        setRole('');
        setGenre('');
        setDateNaissance('');
        setMdp('');
    };
    
    const getData = async () => {
        setLoading(true);
        try {
            const response = await apiGlobal.get('utilisateurs', {
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
        } finally{
            setLoading(false);
        }
    }

    const Supprimer = async(e, id) => {
        e.preventDefault();
        setActionLoading(true);
        try {
            const response = await apiGlobal.delete(`utilisateurs/supprimer/${id}`, {
            headers: {
                authorization: `Bearer ${Cookies.get('accessToken')}`
            }
            });
            if(response.status === 204) {
                await getData();
                setActionLoading(false);
                message.success('Utilisateur supprimée avec succès');
            }
        } catch (error) {
            console.log(error);
            setActionLoading(false);
        }
    }

    const Enregistrer = async(e) => {
        e.preventDefault();
        setActionLoading(true);
        try {
        const response = isEdit ?
            await apiGlobal.put(`utilisateurs/modifier/${id}`,{
                nom, prenom, email, genre, dateNaissance, mdp, role
            },
            {
                headers: {
                    authorization: `Bearer ${Cookies.get('accessToken')}`
                }
            })
        :
            await apiGlobal.post(`utilisateurs/ajouter`,{
                nom, prenom, email, genre, dateNaissance, mdp, role
            },
            {
                headers: {
                    authorization: `Bearer ${Cookies.get('accessToken')}`
                }
            });
        if(response.status === 201 || response.status === 200){
            setActionLoading(false);
            await getData();
            handleCancel();
            message.success('Utilisateur enregistré avec succès');
        }
        message
        } catch (error) {
            setActionLoading(false);
            error.response.status === 400 ? 
                message.error('Email déjà existe.')
            :
                console.log(error);
        }
    }

    useEffect(() => {
        getData();
    }, []);

    const columns = [
        {
            title: 'Nom',
            dataIndex: 'nom',
            key: 'nom',
        },
        {
            title: 'Prénom',
            dataIndex: 'prenom',
            key: 'prenom',
        },
        {
            title: 'Email',
            dataIndex: 'email',
            key: 'email',
        },
        {
            title: 'Role',
            dataIndex: 'role',
            key: 'role'
        },
        {
            title: 'Genre',
            dataIndex: 'genre',
            key: 'genre'
        },
        {
            title: 'Date de naissance',
            dataIndex: 'dateNaissance',
            key: 'dateNaissance',
            render: dateNaissance => dayjs(dateNaissance).format('DD/MM/YYYY'),
        },
        {
            title: 'Statut',
            dataIndex: 'compte',
            key: 'compte',
            render: (_, { compte }) => {
                if(compte === 1){
                    return <Tag color="green">Actif</Tag>
                }
                return <Tag color="red">Inactif</Tag>
            }
        },
        {
            title: 'Action',
            key: 'action',
            render: (_, record) => (
                <Space size="middle">
                    <button 
                        onClick={() => {
                            setIsEdit(true);
                            setId(record?.id);
                            setNom(record?.nom);
                            setPrenom(record?.prenom);
                            setEmail(record?.email);
                            setRole(record?.role);
                            setDateNaissance(record?.dateNaissance);
                            setGenre(record?.genre);
                            showModal();
                        }} 
                        className="font-medium text-indigo-600 hover:text-indigo-500"
                    >
                        Modifier
                    </button>
                    <Popconfirm
                        title="Suppression"
                        description="Voulez-vous vraiment supprimer cette newsletter ?"
                        onConfirm={(e) => Supprimer(e, record?.id)}
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
                </Space>
            ),
        }
    ];

    useEffect(() => {
        if(search && search !== ""){
            const filter = data?.filter(item => item?.email.includes(search.trim()));
            setFilterData(filter);
        }else{
            setFilterData(data);
        }
    }, [search]);
    
    return (
        <div className="min-h-screen bg-gray-50" x-data="{ sideBar: false }">
            <Sidebar sideBar={sideBar} setSideBar={setSideBar} />
            <div className="ml-0 transition md:ml-60">
                <Header setSideBar={setSideBar} />
                <div className="max-w-screen-xl mx-auto px-4 pt-4 md:px-8">
                    <div className="mt-5 mb-10">
                        <div className="items-start justify-between gap-x-4 py-4 border-b sm:flex">
                            <div className="max-w-lg">
                                <h3 className="text-gray-800 text-2xl font-bold">
                                    Gestion des utilisateurs
                                </h3>
                                <p className="text-gray-600 mt-2">
                                    Cette page vous permet de consulter et gérer les utilisateurs.
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
                    <div className="my-4 flex justify-end">
                        <button
                            onClick={showModal}
                            className="inline-block px-4 py-2 text-white duration-150 font-medium bg-green-600 rounded-lg hover:bg-green-700 active:bg-green-700 md:text-sm"
                        >
                            Add member
                        </button>
                    </div>
                    <Table columns={columns} dataSource={filterData} loading={loading} />
                </div>
            </div>
            <Modal 
                title="Ajouter un utilisateur" 
                open={open}
                footer={[]}
                onCancel={handleCancel}
            >
                <form onSubmit={Enregistrer} className="px-6 pt-6">
                    <div>
                        <label className="text-gray-700" for="prenom">Prénom</label>
                        <input 
                            id="prenom" 
                            type="text" 
                            required
                            onChange={(e) => setPrenom(e.target.value)}
                            value={prenom}
                            className="block w-full px-4 py-2 mt-1 text-gray-700 bg-white border border-gray-200 rounded-md focus:border-green-400 focus:ring-green-300 focus:ring-opacity-40 focus:outline-none focus:ring" 
                        />
                    </div>
                    <div className="mt-3">
                        <label className="text-gray-700" for="nom">Nom</label>
                        <input 
                            id="nom" 
                            type="text" 
                            required
                            onChange={(e) => setNom(e.target.value)}
                            value={nom}
                            className="block w-full px-4 py-2 mt-1 text-gray-700 bg-white border border-gray-200 rounded-md focus:border-green-400 focus:ring-green-300 focus:ring-opacity-40 focus:outline-none focus:ring" 
                        />
                    </div>
                    <div className="mt-3">
                        <label className="text-gray-700" for="email">Email</label>
                        <input 
                            id="email" 
                            type="email" 
                            required
                            onChange={(e) => setEmail(e.target.value)}
                            value={email}
                            className="block w-full px-4 py-2 mt-1 text-gray-700 bg-white border border-gray-200 rounded-md focus:border-green-400 focus:ring-green-300 focus:ring-opacity-40 focus:outline-none focus:ring" 
                        />
                    </div>
                    <div className="mt-3">
                        <label className="text-gray-700" for="mdp">Mot de passe</label>
                        <input 
                            id="mdp" 
                            type="password" 
                            required={!isEdit}
                            onChange={(e) => setMdp(e.target.value)}
                            value={mdp}
                            className="block w-full px-4 py-2 mt-1 text-gray-700 bg-white border border-gray-200 rounded-md focus:border-green-400 focus:ring-green-300 focus:ring-opacity-40 focus:outline-none focus:ring" 
                        />
                    </div>
                    <div className="mt-3">
                        <label className="text-gray-700" for="genre">Role</label>
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
                                id="role"
                                name="role"
                                required
                                onChange={(e) => setRole(e.target.value)}
                                value={role}
                                className="w-full px-3 py-2 text-sm text-gray-600 bg-white border rounded-lg shadow-sm outline-none appearance-none focus:ring-offset-2 focus:ring-green-700 focus:ring-2"
                            >
                                <option value="">Selectionner un role</option>
                                <option value="CLIENT">Client</option>
                                <option value="EMPLOYE">Employe</option>
                                <option value="MANAGER">Manager</option>
                            </select>
                        </div>
                    </div>
                    <div className="mt-3">
                        <label className="text-gray-700" for="dateNaissance">Date de naissance</label>
                        <input 
                            id="dateNaissance" 
                            type="date" 
                            required
                            onChange={(e) => setDateNaissance(dayjs(e.target.value).format('YYYY-MM-DD' || ""))}
                            value={dayjs(dateNaissance).format('YYYY-MM-DD') || ""}
                            className="block mt-1 w-full placeholder-gray-400/70 rounded-lg border border-gray-200 bg-white px-5 py-2.5 text-gray-700 focus:border-green-400 focus:outline-none focus:ring focus:ring-green-300 focus:ring-opacity-40" 
                        />
                    </div>
                    <div className="mt-3">
                        <label className="text-gray-700" for="genre">Genre</label>
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
                                id="genre"
                                name="genre"
                                required
                                onChange={(e) => setGenre(e.target.value)}
                                value={genre}
                                className="w-full px-3 py-2 text-sm text-gray-600 bg-white border rounded-lg shadow-sm outline-none appearance-none focus:ring-offset-2 focus:ring-green-700 focus:ring-2"
                            >
                                <option value="">Selectionner un genre</option>
                                <option value="HOMME">Homme</option>
                                <option value="FEMME">Femme</option>
                                <option value="AUTRE">Autre</option>
                            </select>
                        </div>
                    </div>
                    <div className="mt-6 flex items-center justify-end gap-4">
                        <Button 
                            danger 
                            type="primary"
                            onClick={handleCancel}
                        >
                            Annuler
                        </Button>
                        <Button 
                            className="!text-white bg-green-600 border-none hover:!bg-green-700"
                            htmlType="submit"
                            loading={actionLoading}
                        >
                            Enregistrer
                        </Button>
                    </div>
                </form>
            </Modal>
        </div>
    )
};

export default Users;