
import React from 'react';
import { Link } from 'react-router-dom';
import './Inicio.css';

function Inicio() {
    return (
        <div className="container">
            <div className="content">
                <h1>Between Leaves</h1>
                <h2>Los libros son puertas a otras vidas</h2>
                </div>
            <div className="button-container">
                    <Link to="/button1"><button className="styled-button">Bienvenidos</button></Link>
                </div>         
        </div>
    );
}

export default Inicio;
