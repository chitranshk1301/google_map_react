// header with a logo only
import React from 'react';
import logo from '../images/logo.jpg';

const Header = () => (
    <header className='header'>
        <img className='logo' src={logo} alt="logo" />
    </header>
);

export default Header;