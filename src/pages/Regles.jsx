import { Link } from "react-router-dom";
import Banner from '../components/Banner'
import Nav from '../components/Nav'
import Footer from "../components/Footer";

const Regles = () => (
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

                <Link to="/regles" className="text-gray-600  hover:underline">
                    Règles de jeux
                </Link>
            </div>
            <div className="py-10">
                <h1 className="text-2xl font-semibold text-center text-gray-800 lg:text-3xl ">Règles de jeux</h1>
                <div className="mt-12 space-y-8">
                    <div className="text-center p-5">
                        <h2 className="text-2xl font-bold mb-2">Bienvenue au Concours de Thé Tiptop !</h2>
                        <p>Participez à notre jeu-concours et tentez de gagner de nombreux prix exceptionnels. Pour célébrer l'ouverture de notre 10ème boutique à Nice, nous offrons à nos clients la chance de remporter des infuseurs à thé, des boîtes de thés exclusifs et bien plus encore !</p>
                    </div>
                    <div className="p-5">
                        <h3 className="text-xl font-semibold mb-3">Règles du jeu</h3>
                        <ul className="list-disc list-inside">
                        <li>Tous les clients ayant un ticket de caisse ou une facture supérieure à 49€ peuvent participer.</li>
                        <li>Chaque ticket contient un code unique de participation.</li>
                        <li>Le jeu se déroule sur une période de 30 jours.</li>
                        </ul>
                    </div>
                    <div className="p-5">
                        <h3 className="text-xl font-semibold mb-3">Prix à gagner</h3>
                        <ul className="list-disc list-inside">
                        <li>60% des tickets offrent un infuseur à thé.</li>
                        <li>20% des tickets offrent une boîte de 100g de thé.</li>
                        <li>10% des tickets offrent une boîte de 100g d’un thé signature.</li>
                        <li>6% des tickets offrent un coffret découverte d’une valeur de 39€.</li>
                        <li>4% des tickets offrent un coffret découverte d’une valeur de 69€.</li>
                        </ul>
                    </div>
                    <div className="p-5">
                        <h3 className="text-xl font-semibold mb-3">Comment participer ?</h3>
                        <p>Entrez le code de votre ticket sur notre site web pour découvrir immédiatement si vous avez gagné. Vous avez jusqu'à 30 jours après la fin du concours pour réclamer votre prix.</p>
                    </div>
                </div>
            </div>
        </section>
        <Footer />
    </div>
);

export default Regles;
