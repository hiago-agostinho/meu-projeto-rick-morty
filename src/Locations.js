import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { FaArrowLeft } from 'react-icons/fa';
import { GiGalaxy } from "react-icons/gi";
import { FiType } from "react-icons/fi";
import { IoMdInformationCircleOutline } from "react-icons/io";
import './Locations.css';

const Locations = () => {
    const [locations, setLocations] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [selectedLocation, setSelectedLocation] = useState(null);
    const [closingModal, setClosingModal] = useState(false);
    const [residents, setResidents] = useState([]);

    useEffect(() => {
        axios.get('https://rickandmortyapi.com/api/location')
            .then(response => {
                setLocations(response.data.results);
            })
            .catch(error => {
                console.error("Local não encontrado!", error);
            });
    }, []);

    const fetchResidents = (location) => {
        const residentUrls = location.residents;
        const residentPromises = residentUrls.map(url => axios.get(url).then(res => res.data));
        
        Promise.all(residentPromises)
            .then(residents => {
                setResidents(residents);
            })
            .catch(error => {
                console.error("Erro ao buscar residents!", error);
            });
    };

    const openModal = (location) => {
        setSelectedLocation(location);
        fetchResidents(location);
        setShowModal(true);
    };

    const closeModal = () => {
        setClosingModal(true);
        setTimeout(() => {
            setShowModal(false);
            setSelectedLocation(null);
            setClosingModal(false);
            setResidents([]);
        }, 300);
    };

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
                        <button className='more-info-locations' onClick={() => openModal(location)}>
                            <IoMdInformationCircleOutline className='character-icons'/> Saiba Mais
                        </button>
                    </div>
                ))}
            </div>
            {showModal && (
                <div className={`modal-locations ${closingModal ? 'closing' : ''}`}>
                    <div className="modal-content-locations">
                        <h2>{selectedLocation.name}</h2>
                        <p><FiType /> {selectedLocation.type}</p>
                        <p><GiGalaxy /> {selectedLocation.dimension}</p>
                        <h3>Residents</h3>
                        <ul>
                            {residents.length > 0 ? (
                                residents.map(resident => (
                                    <li key={resident.id}>{resident.name}</li>
                                ))
                            ) : (
                                <p>No residents found</p>
                            )}
                        </ul>
                        <button className="close-modal-locations" onClick={closeModal}>Fechar</button>
                    </div>
                </div>
            )}
            <button className="home-button-locations">
                <Link to="/categories" className="home-link-locations">
                    <FaArrowLeft className='arrow-left'/> Voltar
                </Link>
            </button>
        </div>
    );
};

export default Locations;