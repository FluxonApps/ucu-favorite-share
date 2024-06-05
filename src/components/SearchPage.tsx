import React, { useState } from 'react';
import logo from '../assets/BEHONEST02.png';
// import './Search.css'; // Create and import a CSS file for styling
function Search() {
    return (
        <div className="search-page">
            <Header />
        </div>
    );
}

function Header() {
    const [searchQuery, setSearchQuery] = useState('');

    const handleInputChange = (event) => {
        setSearchQuery(event.target.value);
    };

    return (
        <header className="search-header">
            <img src={logo} alt="Logo" className="logo" />
            <div className="search-container">
                {/* <img icon={faSearch} className="search-icon" /> */}
                <input
                    type="text"
                    placeholder="Search..."
                    className="search-input"
                    value={searchQuery}
                    onChange={handleInputChange}
                />
            </div>
        </header>
    );
}
export default Search;
