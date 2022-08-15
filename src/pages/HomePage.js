import React from "react";
import { Link } from "react-router-dom";
import '../static/css/home.css';

export default function NotFoundPage () {
    return (
        <div className="home">
            <div className="splash-text">
                <h1 >Plan your tasks</h1>
                <p> Plan out your tasks and vacations using trello</p>
            </div>
            <div className="text-center">
                <Link to="/boards" className="btn btn-lg btn-start">
                    Get Started
                </Link>
            </div>
        </div>
    )
}