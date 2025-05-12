import React from 'react'
import Banner from '../components/Banner'
import Footer from '../components/Footer'
import Nav from '../components/Nav'
import bg from '../assets/bg.jpeg'
import { useNavigate } from 'react-router-dom'
import tea from '../assets/tea.png'
import box100g from '../assets/box-100g.png'
import box from '../assets/box.png'
import pack39 from '../assets/pack-39.png'
import pack69 from '../assets/pack-69.png'

const Acceuil = () => {
  const navigate = useNavigate()
  return (
    <div>
      <Banner />
      <Nav />
      <main className="relative w-full min-h-screen flex flex-col items-center justify-center px-4" style={{ backgroundImage: `url(${bg})`, backgroundSize: 'cover' }}>
        <div className="w-full min-h-screen bg-black bg-opacity-50 absolute top-0 left-0" ></div>
        <h1 className="text-5xl font-bold text-center text-white mb-10" style={{ zIndex: 999 }}>Bienvenue sur notre jeu</h1>
        <button onClick={() => navigate('jeu')} className="bg-[#559050] text-white text-xl h-10 px-5 rounded-md" style={{ zIndex: 999 }}>Jouer</button>
      </main>

      <div className=' py-20 max-w-[1000px] mx-auto'>
        <h2 className="text-3xl font-bold text-center mb-10">Les gains à gagner</h2>
        <p className="text-gray-600 text-center mb-10">Découvrez les gains que vous pouvez remporter en jouant à notre jeu. Plus vous jouez, plus vous avez de chances de gagner.</p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div className="bg-white rounded-lg p-6 shadow-md">
            <img src={tea} alt="Image1" className="w-full h-48 mx-auto mb-4" />
            <h2 className="text-xl font-bold mb-2">Infuseur à thé</h2>
            <p className="text-gray-600">Gagnez un infuseur à thé dans 60% des tickets. Une manière élégante de déguster nos thés bios et faits à la main.</p>
          </div>
          <div className="bg-white rounded-lg p-6 shadow-md">
            <img src={box} alt="Image2" className="w-full h-48 mx-auto mb-4" />
            <h2 className="text-xl font-bold mb-2">Boite de 100g - Thé détox ou infusion photo</h2>
            <p className="text-gray-600">Recevez une boîte de 100g de thé détox ou d'infusion photo dans 20% des tickets. Découvrez nos mélanges uniques.</p>
          </div>
          <div className="bg-white rounded-lg p-6 shadow-md">
            <img src={box100g} alt="Image3" className="w-full h-48 mx-auto mb-4" />
            <h2 className="text-xl font-bold mb-2">Boite de 100g - Thé signature</h2>
            <p className="text-gray-600">Dans 10% des tickets, gagnez une boîte de 100g de l'un de nos thés signature. Une sélection exclusive pour nos clients.</p>
          </div>
          <div className="bg-white rounded-lg p-6 shadow-md">
            <img src={pack39} alt="Image4" className="w-full h-48 mx-auto mb-4" />
            <h2 className="text-xl font-bold mb-2">Coffret découverte 39€</h2>
            <p className="text-gray-600">Dans 6% des tickets, recevez un coffret découverte d'une valeur de 39€. Explorez notre gamme de thés bios.</p>
          </div>
          <div className="bg-white rounded-lg p-6 shadow-md">
            <img src={pack69} alt="Image5" className="w-full h-48 mx-auto mb-4" />
            <h2 className="text-xl font-bold mb-2">Coffret découverte 69€</h2>
            <p className="text-gray-600">Gagnez un coffret découverte d'une valeur de 69€ dans 4% des tickets. L'expérience ultime pour les amateurs de thé.</p>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}

export default Acceuil