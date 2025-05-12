import { Link } from 'react-router-dom';
import Banner from '../components/Banner';
import Nav from '../components/Nav';
import Footer from '../components/Footer';

const Plan = () => {

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

                    <Link to="/plan" className="text-gray-600  hover:underline">
                        Plan du site
                    </Link>
                </div>
                <div className="pt-12 pb-28">
                    <h1
                        className="text-gray-800 text-center text-2xl font-extrabold sm:text-4xl"
                    >
                        Plan du site
                    </h1>
                    <div className="grid divide-y divide-neutral-200 max-w-xl mx-auto mt-10 px-5">
                        <Link to="/"><p className="py-4 hover:font-medium hover:text-green-700">Accueil</p></Link>
                        <Link to="/jeu"><p className="py-4 hover:font-medium hover:text-green-700">Jeu</p></Link>
                        <Link to="/regles"><p className="py-4 hover:font-medium hover:text-green-700">Règles de jeux</p></Link>
                        <Link to="/contactez-nous"><p className="py-4 hover:font-medium hover:text-green-700">Contactez-nous</p></Link>
                        <Link to="/faq"><p className="py-4 hover:font-medium hover:text-green-700">Faq</p></Link>
                        <Link to="/cgu"><p className="py-4 hover:font-medium hover:text-green-700">Conditions générales d'utilisation</p></Link>
                        <Link to="/politique"><p className="py-4 hover:font-medium hover:text-green-700">Politique de confidentialité</p></Link>
                        <Link to="/mention"><p className="py-4 hover:font-medium hover:text-green-700">Mentions légales</p></Link>
                    </div> 
                </div>
            </section>
            <Footer />
        </div>
    )
}

export default Plan