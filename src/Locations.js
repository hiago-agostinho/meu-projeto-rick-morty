import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { FaArrowLeft } from 'react-icons/fa';
import { GiGalaxy } from "react-icons/gi";
import { FiType } from "react-icons/fi";
import './Locations.css';

const Locations = () => {
    const [locations, setLocations] = useState([]);

    useEffect(() => {
        axios.get('https://rickandmortyapi.com/api/location')
            .then(response => {
                setLocations(response.data.results);
            })
            .catch(error => {
                console.error("Local não encontrado!", error);
            });
    }, []);

    return (
        <div className="locations">
            <h1 className='title-locations'>Locais</h1>
            <hr className='linha'></hr>
            <div className="locations-list">
                {locations.map(location => (
                    <div key={location.id} className="location-card">
                        <h2>{location.name}</h2>
                        <hr className='linha-locations'></hr>
                        <p><FiType className='character-icons-locations'/> {location.type}</p>
                        <p><GiGalaxy className='character-icons-locations'/> {location.dimension}</p>
                    </div>
                ))}
            </div>
            <button className="home-button-locations">
                <Link to="/categories" className="home-link-locations">
                    <FaArrowLeft className='arrow-left'/> Voltar
                </Link>
            </button>
        </div>
    );
};

export default Locations;