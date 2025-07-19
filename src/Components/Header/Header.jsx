import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Logo from '../../Assets/Logo.jpg';
import PropTypes from 'prop-types';
import './Header.css';

const Header = ({ handleLogout }) => {
  const navigate = useNavigate();

  const logout = () => {
    handleLogout();
    navigate('/');
  };

  return (
    <header className="header">
        <ul className='left-header'>
          <li>
            <Link to='/' style={{textDecoration:"none"}}>
              <div className="logo-container">
                <img src={Logo} alt="logo" className='HeaderImage' />
                <p>Anna Bank</p>
              </div>
            </Link>
          </li>
        </ul>

        <ul className='right-header'>
          <li><Link to='/beneficiaries'>Beneficiaries</Link></li>
          <li><Link to='/transactions'>Transactions</Link></li>
          <li><Link to='/contact'>Contact Us</Link></li>
          <li className="logout-link" onClick={logout}>Logout</li>
        </ul>
    </header>
  );
};

Header.propTypes = {
  handleLogout: PropTypes.func.isRequired,
};

export default Header;
