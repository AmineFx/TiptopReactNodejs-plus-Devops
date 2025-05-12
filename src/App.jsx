import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import Acceuil from './pages/Acceuil';
import Cookies from "js-cookie";
import Connexion from "./pages/Connexion";
import Inscription from "./pages/Inscription";
import NotFound from './pages/NotFound';
import { jwtDecode } from 'jwt-decode';
import Contact from './pages/Contact';
import Dashboard from './pages/admin/Dashboard';
import Newsletters from './pages/admin/Newsletters';
import Users from './pages/admin/Users';
import Tickets from './pages/admin/Tickets';
import Jeu from './pages/Jeu';
import Check from './pages/Check';
import MyWins from './pages/MyWins';
import Plan from './pages/Plan';
import Cgu from './pages/Cgu';
import Politique from './pages/Politique';
import Mention from './pages/Mention';
import Regles from './pages/Regles';
import { useEffect, useState } from 'react';
import Faq from './pages/Faq';
import Gains from './pages/admin/Gains';
import Google from './pages/Google';
import Game from './pages/admin/Game';

function App() {
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const hasAcceptedCookies = localStorage.getItem('accept-cookies');
    if (!hasAcceptedCookies) {
      setShowModal(true);
    }
  }, []);

  const acceptCookies = () => {
    localStorage.setItem('accept-cookies', true);
    setShowModal(false);
  };
  const decodedToken = Cookies?.get("accessToken") && jwtDecode(Cookies?.get("accessToken"));

  function requireAuth(redirectTo) {
    return Cookies.get('accessToken') ? redirectTo : <Navigate to={'/connexion'} />
  }

  function requireAuthAndEmploye(redirectTo) {
    return (Cookies.get('accessToken') &&
      decodedToken?.role === "EMPLOYE")
      ? redirectTo : <Navigate to={'/connexion'} />
  }

  function requireAuthAndAdmin(redirectTo) {
    return (Cookies.get('accessToken') &&
      decodedToken?.role === "MANAGER")
      ? redirectTo : <Navigate to={'/connexion'} />
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/">
          <Route index element={<Acceuil />} />
          <Route path='google' element={<Google />} />
          <Route path='contactez-nous' element={<Contact />} />
          <Route path='faq' element={<Faq />} />
          <Route path='plan' element={<Plan />} />
          <Route path='cgu' element={<Cgu />} />
          <Route path='politique' element={<Politique />} />
          <Route path='mention' element={<Mention />} />
          <Route path='regles' element={<Regles />} />
          <Route path="connexion" element={Cookies.get("accessToken") ? <Navigate to="/" /> : <Connexion />} />
          <Route path="inscription" element={Cookies.get("accessToken") ? <Navigate to="/" /> : <Inscription />} />
          <Route path="jeu" element={!Cookies.get("accessToken") ? <Navigate to="/connexion" /> : <Jeu />} />
          <Route path="check" element={requireAuthAndEmploye(<Check />)} />
          <Route path="participations" element={requireAuth(<MyWins />)} />
          <Route path="admin" element={requireAuthAndAdmin(<Dashboard />)} />
          <Route path="admin/newsletters" element={requireAuthAndAdmin(<Newsletters />)} />
          <Route path="admin/users" element={requireAuthAndAdmin(<Users />)} />
          <Route path="admin/tickets" element={requireAuthAndAdmin(<Tickets />)} />
          <Route path="admin/gains" element={requireAuthAndAdmin(<Gains />)} />
          <Route path="admin/game" element={requireAuthAndAdmin(<Game />)} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
      {
        showModal && (
          <div className="fixed bottom-4 right-4 bg-white p-4 rounded shadow-md z-[9999]">
            <h2 className="text-lg font-bold mb-2">Ce site utilise des cookies</h2>
            <p className="text-sm mb-2">Nous utilisons des cookies pour améliorer l'expérience utilisateur. En utilisant notre site Web, vous consentez à tous les cookies conformément à notre Politique de confidentialité.</p>
            <button className="px-3 py-1 bg-[#559050] text-white rounded text-sm" onClick={acceptCookies}>Accepter</button>
          </div>
        )
      }
    </BrowserRouter>


  )
}

export default App
