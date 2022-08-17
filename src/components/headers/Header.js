import React from "react";
import { Link } from "react-router-dom";

const Header = () => {
    return (
        <>
            <header
                className='header'>
                <div className="header__section">
                    <ul className="header__list">
                        <Link to='/'>
                        <li className="header__li">
                            <i className="fab fa-trello"></i> Board
                        </li>
                        </Link>
                    </ul>
                </div>
                <div className="header__section">
                    <h1>Trello Basic Features</h1>
                </div>
                <div className="header__section">
                    <ul className="header__list">
                        <li className="header__li header__li--profile">
                            Hello World
                        </li>
                    </ul>
                </div>
                <div className="out-of-focus"></div>
            </header>
        </>
    );
};

export default Header;
