import React, { useState } from 'react';
import { fruitsList } from '../constants';

export function Navbar() {
    const [searchFruit, setSearchFruit] = useState("");
    const [fruits, setFruits] = useState(fruitsList);

    return React.createElement('nav', {
        style: { backgroundColor: 'green' }
    },

        React.createElement('input', {
            type: "text",
            placeholder: "Search?",
            value: searchFruit,
            onChange: function (input) {
                setSearchFruit(input.target.value);
            }
        }),

        // don't use index as a key
        fruits.map((fruit, key) => (
            fruit.toLocaleLowerCase().startsWith(searchFruit.toLocaleLowerCase()) &&
            React.createElement('li', { key }, fruit)
        ))
    );
}

export default Navbar;
