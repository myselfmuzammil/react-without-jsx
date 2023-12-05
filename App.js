import React, { useState } from 'react';
import ReactDOM from 'react-dom/client';

import { fruitsList } from './constants';

import "./global.css";



function Navbar() {
    const [searchFruit, setSearchFruit] = useState("");
    const [fruits, setFruits] = useState(fruitsList);

    return React.createElement('nav',{
            style: { backgroundColor: 'green' }
        }, 

        React.createElement('input', {
            type: "text",
            placeholder: "Search?",
            value: searchFruit,
            onChange: function(input) {
                setSearchFruit(input.target.value)
            }
        }),

        // don't use index as a key
        fruits.map((fruit, key)=> (
            fruit.startsWith(searchFruit.toLocaleLowerCase()) &&
            React.createElement('li', { key }, fruit)
        )
    ));
}

function Header() {
    return React.createElement('header', null, 
        // your header child will be here
        React.createElement(Navbar)
    )
}

function App() {
    return React.createElement(React.Fragment, null, 
        // your component will be here
        React.createElement(Header),
    );
}

// this root var come from html 
ReactDOM.createRoot(root).
render(React.createElement(App));