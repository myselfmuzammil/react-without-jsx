import React from 'react';
import { Navbar } from '../components';

export function Header() {
    console.log('header');
    return React.createElement('header', null,
        // your header child will be here
        React.createElement(Navbar)
    );
}

export default Header;
