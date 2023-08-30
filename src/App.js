import './App.css';
import Header from './components/header/header';
import AdminPage from './components/pages/Admin/AdminPage/AdminPage';
import CurrentTime from './components/pages/CurrentTime';
import Login from './components/pages/login/Login';
import OwnerPage from './components/pages/owner/ownerPage/OwnerPage';
import Pdp from './components/pages/owner/productPrice/Pdp';
import SelectProduct from './components/pages/SelectProduct'

function App() {

  const clearLocalStorageAfterInterval = () => {
    const lastUpdateTime = localStorage.getItem('lastUpdateTime');
    const currentTime = new Date().getTime();
    const interval = 4 * 60 * 60 * 1000; // 4 soat = 4 * 60 * 60 * 1000 millisekund
  
    if (lastUpdateTime && currentTime - lastUpdateTime > interval) {
      localStorage.clear(); // Lokal saqlashni tozalash
    }
  
    localStorage.setItem('lastUpdateTime', currentTime);
  };
  

  return (
    <Login/>
  );
}


export default App;
