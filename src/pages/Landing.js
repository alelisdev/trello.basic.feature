import React from "react";
import { Link } from "react-router-dom";
import useDocumentTitle from "../hooks/useDocumentTitle";
import bgImage from "../static/img/bg-home.jpg";

const Landing = () => {
    useDocumentTitle("Trello");
    return (
        <div className="landing-banner">
            <img className="landing-banner__image" src={bgImage} alt='not found' />
            <div className="landing-banner__content">
                <h1 className="landing-banner__title">
                    Trello Basic Feature Here.
                </h1>
                <Link to={`/board/${process.env.REACT_APP_BOARD_ID}`} className="btn">
                    Get Started
                </Link>
            </div>
        </div>
    );
};

export default Landing;
