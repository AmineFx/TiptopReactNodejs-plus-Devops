import { Breadcrumb } from 'antd';
import { useEffect } from 'react';
import { HomeOutlined } from '@ant-design/icons';
import Banner from '../components/Banner';
import Nav from '../components/Nav';
import Footer from '../components/Footer';
import { Link } from 'react-router-dom';

const Politique = () => {
    const List = [
        {
            q: "Informations personnelles recueillies",
            a: `Lorsque vous vous rendez sur le Site, nous recueillons automatiquement certaines informations concernant votre appareil, notamment des informations sur votre navigateur web, votre adresse IP, votre fuseau horaire et certains des cookies qui sont installés sur votre appareil. En outre, lorsque vous parcourez le Site, nous recueillons des informations sur les pages web ou produits individuels que vous consultez, les sites web ou les termes de recherche qui vous ont permis d'arriver sur le Site, ainsi que des informations sur la manière dont vous interagissez avec le Site. Nous désignons ces informations collectées automatiquement sous l'appellation « Informations sur l'appareil ».`
        },
        {
            q: "Comment utilisons-nous vos informations personnelles ?",
            a: `En règle générale, nous utilisons les Informations sur la commande que nous recueillons pour traiter toute commande passée par le biais du Site (y compris pour traiter vos informations de paiement, organiser l'expédition de votre commande et vous fournir des factures et/ou des confirmations de commande).  En outre, nous utilisons ces Informations sur la commande pour :
                communiquer avec vous ;
                évaluer les fraudes ou risques potentiels ; et
                lorsque cela correspond aux préférences que vous nous avez communiquées, vous fournir des informations ou des publicités concernant nos produits ou services.
                Nous utilisons les Informations sur l'appareil (en particulier votre adresse IP) que nous recueillons pour évaluer les fraudes ou risques potentiels et, de manière plus générale, pour améliorer et optimiser notre Site (par exemple, en générant des analyses sur la façon dont nos clients parcourent et interagissent avec le Site, et pour évaluer la réussite de nos campagnes de publicité et de marketing).`
        },
        {
            q: "Partage de vos informations personnelles",
            a: `Enfin, il se peut que nous partagions aussi vos Informations personnelles pour respecter les lois et règlementations applicables, répondre à une assignation, à un mandat de perquisition ou à toute autre demande légale de renseignements que nous recevons, ou pour protéger nos droits.`
        },
        {
            q: "Publicité comportementale",
            a: `Comme indiqué ci-dessus, nous utilisons vos Informations personnelles pour vous proposer des publicités ciblées ou des messages de marketing qui, selon nous, pourraient vous intéresser.  Pour en savoir plus sur le fonctionnement de la publicité ciblée, vous pouvez consulter la page d'information de la Network Advertising Initiative (NAI) à l'adresse suivante : http://www.networkadvertising.org/understanding-online-advertising/how-does-it-work.`
        },
        {
            q: "Ne pas suivre",
            a: `Veuillez noter que nous ne modifions pas la collecte de données de notre Site et nos pratiques d'utilisation lorsque nous détectons un signal « Ne pas suivre » sur votre navigateur.`
        },
        {
            q: "Vos droits",
            a: `Si vous êtes résident(e) européen(ne), vous disposez d'un droit d'accès aux informations personnelles que nous détenons à votre sujet et vous pouvez demander à ce qu'elles soient corrigées, mises à jour ou supprimées. Si vous souhaitez exercer ce droit, veuillez nous contacter au moyen des coordonnées précisées ci-dessous.
                Par ailleurs, si vous êtes résident(e) européen(ne), notez que nous traitons vos informations dans le but de remplir nos obligations contractuelles à votre égard (par exemple si vous passez une commande sur le Site) ou de poursuivre nos intérêts commerciaux légitimes, énumérés ci-dessus.  Veuillez également noter que vos informations seront transférées hors de l'Europe, y compris au Canada et aux États-Unis.`
        },
        {
            q: "Rétention des données",
            a: `Lorsque vous passez une commande par l'intermédiaire du Site, nous conservons les Informations sur votre commande dans nos dossiers, sauf si et jusqu'à ce que vous nous demandiez de les supprimer.`
        },
        {
            q: "Mineurs",
            a: `Le Site n'est pas destiné aux individus de moins de 16 ans.`
        },
        {
            q: "Changements",
            a: `Nous pouvons être amenés à modifier la présente politique de confidentialité de temps à autre afin d'y refléter, par exemple, les changements apportés à nos pratiques ou pour d'autres motifs opérationnels, juridiques ou réglementaires.`
        },
        {
            q: "Nous contacter",
            a: `Pour en savoir plus sur nos pratiques de confidentialité, si vous avez des questions ou si vous souhaitez déposer une réclamation, veuillez nous contacter par e-mail à thetiptop@dsp5-archi-f23-15m-g4.fr, ou par courrier à l'adresse suivante :
                18 rue Léon Frot, 75011 Paris, France`
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

                    <Link to="/politique" className="text-gray-600  hover:underline">
                        Politique de confidentialité
                    </Link>
                </div>
                <section className="py-12">
                    <h1
                        className="text-gray-800 text-center text-2xl font-extrabold sm:text-4xl"
                    >
                        Politique de confidentialité
                    </h1>
                    <p
                        className="text-gray-600 mx-auto text-center mt-2 max-w-[450px] font-medium"
                    >
                        La présente Politique de confidentialité décrit la façon dont vos informations personnelles sont recueillies, utilisées et partagées lorsque vous vous rendez sur www.thetiptop.com (le « Site ») ou que vous y effectuez un achat.
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
                                    <p className="text-neutral-600 mt-3 group-open:animate-fadeIn">
                                        {item.a}
                                    </p>
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

export default Politique