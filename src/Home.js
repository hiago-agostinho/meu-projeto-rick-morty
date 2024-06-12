import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import './Home.css';

const Home = () => {
    const navigate = useNavigate();

    const goToCharacterList = () => {
        navigate('/characters');
    };

    return (
        <div>
            <img src='/logo_ricky_morty.svg' className='logo'></img>
            <img src='/HighlightImage.svg' className='ricky'></img>
            <h2 className='slogan'>Saiba tudo em</h2>
            <h2 className='slogan2'>um só <span className='highlight'>lugar.</span></h2>
            <p className='wubba'>Wubba Lubba Dub Dub!</p>
            <div className="home">
                <button><Link to="/categories" className="home-button">Ver Categorias</Link></button>
            </div>
        </div>
    );
};

export default Home;