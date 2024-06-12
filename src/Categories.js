import React from 'react';
import { Link } from 'react-router-dom';
import './Categories.css';

const Categories = () => {
    return (
        <div className="categories">
            <div className="category-links">
                <Link to="/characters" className="category-link">
                    <img src="/personagens.jpg" alt="Personagens" />
                    <p>Personagens</p>
                </Link>
                <Link to="/episodes" className="category-link">
                    <img src="/episodios.jpg" alt="Episódios" />
                    <p>Episódios</p>
                </Link>
                <Link to="/locations" className="category-link">
                    <img src="/locations.jpg" alt="Locais" />
                    <p>Locais</p>
                </Link>
            </div>
        </div>
    );
};

export default Categories;