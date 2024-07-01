import React, { useState, useContext, useEffect} from 'react';
import Footer from './components/Footer/Footer';
import ImageGallery from './components/current/Current';
import Banerswaper from './components/banerswaper/Banerswaper';
import Header from './components/header/Header';
import Promo from './components/promo/Promo';
import Subtitle from './components/subtitle/Subtitle';
import { BrowserRouter } from 'react-router-dom';
import AppRouter from './components/compJS/AppRouter';
import NavBar from './components/compJS/NavBar';
import { observer } from 'mobx-react-lite';
import { Context } from '.';
import { check } from './components/http/userAPI';
import { Spinner } from 'react-bootstrap';

const App = observer (() => {
  const {user} = useContext(Context)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const verifyUser = async () => {
        try {
            const data = await check();
            user.setUser(data);
            user.setIsAuth(true);
        } catch (error) {
            user.setIsAuth(false);
            localStorage.removeItem('token'); 
        } finally {
            setLoading(false);
        }
    };

    verifyUser();
}, []);

if (loading) {
    return <Spinner animation={"grow"} />;
}

  return (
     <BrowserRouter>
     
       <NavBar/>
       <AppRouter />
       <Footer/>
     </BrowserRouter>
   
  );
});

export default App;