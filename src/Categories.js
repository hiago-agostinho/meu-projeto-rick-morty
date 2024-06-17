import React from 'react';
import { Link } from 'react-router-dom';
import './Categories.css';

const Categories = () => {
    return (
        <div className="categories">
            <div className="category-top">
                <Link to="/characters" className="category-link">
                    <div className="image-container">
                        <img src="/personagens.jpg" alt="Personagens" className="horizontal-img"/>
                        <p className="image-title title-bottom">Personagens</p>
                    </div>
                </Link>
            </div>
            <div className="category-bottom">
                <Link to="/episodes" className="category-link">
                    <div className="image-container">
                        <img src="/episodios.jpg" alt="Episódios" />
                        <p className="image-title title-bottom">Episódios</p>
                    </div>
                </Link>
                <Link to="/locations" className="category-link">
                    <div className="image-container">
                        <img src="/locais.jpg" alt="Locais" className='locais'/>
                        <p className="image-title title-bottom">Locais</p>
                    </div>
                </Link>
            </div>
            <img src='/logo2.png' className='logo'></img>
        </div>
    );
};

export default Categories;