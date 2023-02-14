import { Routes, Route } from 'react-router-dom';

import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import AccountPage from './pages/AccountPage';
import Layout from './components/Layout';
import MainProvider from './context/MainProvider';

function App() {
  return (
    <MainProvider>
      <Layout>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/login' element={<Login />} />
          <Route path='/signup' element={<Signup />} />
          <Route path='/user' element={<AccountPage />} />
          <Route path='*' element={<p>Your Lost! No Page Here!</p>} />
        </Routes>
      </Layout>
    </MainProvider>
  );
}

export default App;
