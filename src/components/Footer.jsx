import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import { apiGlobal } from '../apiGlobal';
import {Button, notification} from 'antd';

const Footer = () => {

    const [api, contextHolder] = notification.useNotification();
    const [email, setEmail] = useState('');
    const [loading, setLoading] = useState(false);
    const [err, setErr] = useState(null);

    const footerNavs = [
        {
            label: "Liens :",
            items: [
                {
                    href: '/',
                    name: 'Accueil'
                },
                {
                    href: '/regles',
                    name: 'Règles de jeux'
                },
                {
                    href: '/contactez-nous',
                    name: 'Contact'
                },
                {
                    href: '/plan',
                    name: 'Plan du site'
                }
            ],
        },
        {
            label: "À propos de",
            items: [
                {
                    href: '/faq',
                    name: 'FAQs'
                },
                {
                    href: '/cgu',
                    name: "Conditions générales d'utilisation"
                },
                {
                    href: '/politique',
                    name: 'Politique de confidentialité'
                },
                {
                    href: '/mention',
                    name: 'Mentions légales'
                },
            ]
        },
        {
            label: "Réseaux sociaux",
            items: [
                {
                    href: 'https://www.facebook.com/profile.php?id=61556914457412',
                    name: 'Facebook'
                },
                {
                    href: 'https://www.instagram.com/thetiptop31/',
                    name: 'Instagram'
                },
                {
                    href: 'https://twitter.com/thetiptop11',
                    name: 'X'
                },
                {
                    href: 'https://www.tiktok.com/@thetiptop12',
                    name: 'Tiktok'
                },
            ]
        }
    ];

    const openNotificationWithIcon = () => {
        api['success']({
        message: 'Inscription réussie !',
        description: 'Vous avez bien souscrit à notre newsletter. Vous ne raterez plus les nouveautés de ThéTipTop ! Merci de votre confiance !',
        placement: 'bottomLeft'
        });
    };

    const Abonne = async (e) => {
        e.preventDefault();
        setLoading(true);
        setErr(null);
        try {
            if(email === '' || !email) {
                setErr('Veuillez saisir une adresse e-mail.');
                setLoading(false);
                return;
            }
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                setErr('Adresse e-mail non valide.');
                setLoading(false);
                return;
            }
            const response = await apiGlobal.post(`newsletters/ajouter`, {email});
            if(response.status === 201) {
                setEmail('');
                setErr(null);
                setLoading(false);
                openNotificationWithIcon();
            }
        } catch (error) {
            console.log(error);
            setLoading(false);
        }
    }

    return (
        <footer className="pt-10">
            {contextHolder}
            <div className="max-w-screen-xl mx-auto px-4 md:px-8">
                <div className="justify-between items-center gap-12 md:flex">
                    <div className="flex-1 max-w-lg">
                        <h3 className="text-xl font-bold">
                            Recevez notre magnifique bulletin d'information directement dans votre boîte de réception.
                        </h3>
                    </div>
                    <div className="flex-1 mt-6 md:mt-0">
                        <div className="flex items-start gap-x-3 md:justify-end">
                            <div>
                                <div className="relative">
                                    <svg className="w-6 h-6 text-gray-400 absolute left-3 inset-y-0 my-auto" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                                    </svg>
                                    <input
                                        type="text"
                                        onChange={(e) => setEmail(e.target.value)}
                                        value={email}
                                        placeholder="Saisissez votre email"
                                        className={`w-full pl-12 pr-3 py-2 bg-white outline-none border focus:border-green-600 shadow-sm rounded-lg ${err ? 'border-red-500' : 'border-gray-300'}`}
                                    />
                                </div>
                                {err && <span className='text-[12px] ml-1 text-red-500'>{err}</span>}
                            </div>
                            <Button 
                                loading={loading}
                                onClick={Abonne}
                                size='large'
                                className="block w-auto font-medium text-sm text-center !text-white !bg-[#559050] !border-none hover:!bg-green-700 active:shadow-none rounded-lg shadow"
                            >
                                Abonnée
                            </Button>
                        </div>
                    </div>
                </div>
                <div className="flex-1 mt-16 space-y-6 justify-between sm:flex md:space-y-0">
                    {
                        footerNavs.map((item, idx) => (
                            <ul
                                className="space-y-4 text-gray-600"
                                key={idx}
                            >
                                <h4 className="text-gray-800 font-semibold sm:pb-2">
                                    {item.label}
                                </h4>
                                {
                                    item.items.map(((el, idx) => (
                                        <li key={idx}>
                                            <Link
                                                to={el.href}
                                                className="hover:text-green-700 duration-150"

                                            >
                                                {el.name}
                                            </Link>
                                        </li>
                                    )))
                                }
                            </ul>
                        ))
                    }
                </div>
                <div className="mt-10 py-10 border-t items-center justify-center sm:flex">
                    <p className="text-gray-600">© 2024 Thé tiptop - Tous droits réservés - projet ecole</p>
                </div>
            </div>
        </footer>
    )
}

export default Footer