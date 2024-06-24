import React, { useEffect, useState } from 'react';
import { IoMdInformationCircleOutline, IoIosPulse } from 'react-icons/io';
import { CiCalendarDate } from "react-icons/ci";
import { PiTelevisionSimple } from "react-icons/pi";
import './Episodes.css';

const Episodes = () => {
    const [episodes, setEpisodes] = useState([]);
    const [selectedEpisode, setSelectedEpisode] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [characters, setCharacters] = useState([]);

    useEffect(() => {
        fetch('https://rickandmortyapi.com/api/episode')
            .then(response => response.json())
            .then(data => setEpisodes(data.results))
            .catch(error => console.error('Error fetching episodes:', error));
    }, []);

    const fetchCharacters = async (episode) => {
        const characterPromises = episode.characters.map(url =>
            fetch(url).then(res => res.json())
        );
        const characterData = await Promise.all(characterPromises);
        setCharacters(characterData);
    };

    const openModal = (episode) => {
        setSelectedEpisode(episode);
        fetchCharacters(episode);
        setShowModal(true);
        setTimeout(() => {
            document.querySelector('.modal-overlay').classList.add('opening');
        }, 100);
    };

    const closeModal = () => {
        document.querySelector('.modal-overlay').classList.remove('opening');
        setTimeout(() => {
            setShowModal(false);
            setSelectedEpisode(null);
            setCharacters([]);
        }, 300);
    };

    return (
        <div className="episodes">
            <h1 className='title-episodes'>Episódios</h1>
            <hr className='linha'></hr>
            <div className="episode-list">
                {episodes.map(episode => (
                    <div key={episode.id} className="episode-card">
                        <h2>{episode.name}</h2>
                        <hr className='linha-locations'></hr>
                        <p><PiTelevisionSimple className='character-icons-episodes'/> {episode.episode}</p>
                        <p><CiCalendarDate className='character-icons-episodes'/> {episode.air_date}</p>
                        <button className='more-info-episodes' onClick={() => openModal(episode)}>
                            <IoMdInformationCircleOutline /> Saiba Mais
                        </button>
                    </div>
                ))}
            </div>
            {showModal && (
                <div className="modal-overlay opening">
                    <div className="modal-content-episodes">
                        <span className='close' onClick={closeModal}>&times;</span>
                        <h2>Personagens</h2>
                        <hr className='linha-modal'></hr>
                        <div className='info-modal-episodes'>
                            {characters.length > 0 ? (
                                characters.map(character => (
                                    <div key={character.id} className='character-card'>
                                        <img src={character.image} alt={character.name} />
                                        <div className='character-info'>
                                            <p>{character.name}</p>
                                            <p><IoIosPulse className='character-icons'/> {character.status}</p>
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <p>No characters found</p>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Episodes;