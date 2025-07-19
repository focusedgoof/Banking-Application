import React, { useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Login from './Components/Login/Login';
import Footer from './Components/Footer/Footer';
import Header from './Components/Header/Header';
import TransactionProvider from './Components/Transactions/TransactionProvider';
import AccountSummary from './Components/AccountSummary/AccountSummary';
import Contact from './Components/ContactUs/Contact';
import Beneficiary from './Components/Beneficiary/Beneficiary';
import Transactions from './Components/Transactions/Transactions';
import './App.css';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem('user'));

  const handleLogin = (user) => {
    setIsLoggedIn(true);
    localStorage.setItem('user', JSON.stringify(user));
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    localStorage.removeItem('user');
  };

  const PrivateRoutes = () => {
    if (!isLoggedIn) {
      return <Navigate to="/" />;
    }

    return (
      <Routes>
        <Route exact path="/accountsummary" element={<AccountSummary />} />
        <Route exact path="/beneficiaries" element={<Beneficiary />} />
        <Route exact path="/transactions" element={<Transactions />} />
        <Route exact path="/contact" element={<Contact />} />
        <Route path="*" element={<Navigate to="/accountsummary" />} />
      </Routes>
    );
  };

  return (
    <div className='app'>
      {isLoggedIn && <Header handleLogout={handleLogout} />}

      <TransactionProvider>
        <Routes>
          {!isLoggedIn && <Route exact path="/" element={<Login handleLogin={handleLogin} />} />}
          <Route path="/*" element={<PrivateRoutes />} />
        </Routes>
      </TransactionProvider>

      {isLoggedIn && <Footer />}
    </div>
  );
}

export default App;
