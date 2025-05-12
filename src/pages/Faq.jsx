import { Breadcrumb } from 'antd';
import { HomeOutlined } from '@ant-design/icons';
import Banner from '../components/Banner';
import Nav from '../components/Nav';
import Footer from '../components/Footer';
import { Link } from 'react-router-dom';

const Faq = () => {
    const List = [
        {
            q: "Acceptation des Conditions",
            a: `En accédant et en utilisant le Service, vous reconnaissez avoir lu, compris et 
                accepté les présentes conditions générales d'utilisation. Si vous n'acceptez pas 
                ces conditions, veuillez ne pas utiliser le Service.`,
            list: false
        },
        {
            q: "Utilisation du Service",
            a: {
                a1: `Vous devez avoir au moins 16 ans pour participer aux jeux de concours proposés par TheTipTop.`,
                a2: `Vous êtes responsable de toutes les activités associées à votre compte.`,
                a3: `Vous vous engagez à utiliser le Service conformément aux règles et aux lois en vigueur.`
            },
            list: true
        },
        {
            q: "Compte Utilisateur",
            a: {
                a1: `Vous devez fournir des informations exactes et complètes lors de la création de votre compte.`,
                a2: `Vous êtes responsable du maintien de la confidentialité de votre mot de passe.`,
                a3: `Vous êtes responsable de toutes les activités sur votre compte, qu'elles soient autorisées ou non par vous.`
            },
            list: true
        },
        {
            q: "Participation aux Concours",
            a: {
                a1: `Les jeux de concours proposés sur TheTipTop sont soumis à des règles spécifiques publiées sur le site. En participant, vous acceptez ces règles.`,
                a2: `Les gagnants des concours seront notifiés conformément aux procédures définies dans les règles du concours.`
            },
            list: true
        },
        {
            q: "Propriété Intellectuelle",
            a: {
                a1: `Le contenu du Service, y compris les jeux de concours, est protégé par des 
                    droits d'auteur, des marques de commerce et d'autres droits de propriété 
                    intellectuelle détenus par TheTipTop.`,
                a2: `Vous vous engagez à ne pas copier, reproduire, distribuer ou créer des 
                    œuvres dérivées à partir du contenu du Service sans autorisation écrite.`
            },
            list: true
        },
        {
            q: "Modifications du Service et des Conditions",
            a: {
                a1: `TheTipTop se réserve le droit de modifier, suspendre ou interrompre le Service à tout moment`,
                a2: `TheTipTop se réserve le droit de modifier les présentes conditions 
                    générales d'utilisation à tout moment. Les modifications prendront effet dès 
                    leur publication sur le Service.`
            },
            list: true
        },
        {
            q: "Limitation de Responsabilité",
            a: {
                a1: `Le Service est fourni "tel quel" et "tel que disponible". TheTipTop ne 
                    garantit pas l'exactitude, l'exhaustivité, la pertinence ou la disponibilité du Service.`,
                a2: ` En aucun cas, TheTipTop ne sera responsable des dommages directs, 
                    indirects, accessoires, spéciaux, consécutifs ou punitifs résultant de l'utilisation 
                    ou de l'incapacité à utiliser le Service.`
            },
            list: true
        }
    ];

    return (
        <div>
            <Banner />
            <Nav />
            <div className="bg-white container max-w-4xl px-6 mx-auto">
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

                    <Link to="/faq" className="text-gray-600  hover:underline">
                        Faq
                    </Link>
                </div>
                <section className="pt-12 pb-28">
                    <h1
                        className="text-gray-800 text-center text-3xl font-extrabold sm:text-4xl"
                    >
                        Faq
                    </h1>
                    <p
                        className="text-gray-600 mx-auto text-center mt-2 max-w-[450px] font-medium"
                    >
                        Bienvenue dans notre foire aux questions. En utilisant notre site web, TheTipTop, ainsi que les services qui y sont associés (ci-après dénommés 
                        "le Service"), vous acceptez les conditions générales d'utilisation énoncées ci-dessous.
                    </p>
                    <div className="grid divide-y divide-neutral-200 max-w-4xl mx-auto mt-8 px-5">
                            {
                            List.map((item) => 
                                <div className="py-4" key={item.q}>
                                    <details className="group">
                                    <summary className="flex justify-between items-center font-medium cursor-pointer list-none">
                                        <span> {item.q}</span>
                                        <span className="transition group-open:rotate-180">
                                        <svg fill="none" height="24" shapeRendering="geometricPrecision" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" viewBox="0 0 24 24" width="24"><path d="M6 9l6 6 6-6"></path>
                                        </svg>
                                        </span>
                                    </summary>
                                    {!item.list ?
                                        <p className="text-neutral-600 ml-2 mt-3 group-open:animate-fadeIn">
                                            {typeof item.a === 'string' ? item.a : ''}
                                        </p>
                                        :
                                        <ul className="text-neutral-600 ml-5 mt-3 group-open:animate-fadeIn list-disc">
                                            {Object.values(item.a).map((value, index) => 
                                                <li key={index}>{value}</li>
                                            )}
                                        </ul>
                                    }
                                    </details>
                                </div>
                            )}
                    </div> 
                </section>
            </div>
            <Footer />
        </div>
    );
}

export default Faq