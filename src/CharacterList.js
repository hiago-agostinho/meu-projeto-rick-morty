import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { RiAliensLine } from "react-icons/ri";
import { IoMdPlanet } from "react-icons/io";
import { IoIosPulse } from "react-icons/io";
import { IoMdInformationCircleOutline } from "react-icons/io";
import { BsGenderAmbiguous } from "react-icons/bs";
import './Character.css';

const CharacterList = () => {
    const [characters, setCharacters] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [statusFilter, setStatusFilter] = useState('');
    const [speciesFilter, setSpeciesFilter] = useState('');
    const [genderFilter, setGenderFilter] = useState('');
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [showModal, setShowModal] = useState(false);
    const [selectedCharacter, setSelectedCharacter] = useState(null);
    const [closingModal, setClosingModal] = useState(false);
    const [episodeCount, setEpisodeCount] = useState(0);

    useEffect(() => {
        axios.get(`https://rickandmortyapi.com/api/character?page=${page}`)
            .then(response => {
                setCharacters(response.data.results);
                setTotalPages(response.data.info.pages);
            })
            .catch(error => {
                console.error('Erro ao buscar personagens:', error);
            });
    }, [page]);

    const filteredCharacters = characters.filter(character =>
        character.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
        (statusFilter === '' || character.status === statusFilter) &&
        (speciesFilter === '' || character.species === speciesFilter) &&
        (genderFilter === '' || character.gender === genderFilter)
    );

    const openModal = (character) => {
        setSelectedCharacter(character);
        setEpisodeCount(character.episode.length);
        setShowModal(true);
    };

    const closeModal = () => {
        setClosingModal(true);
        setTimeout(() => {
            setShowModal(false);
            setSelectedCharacter(null);
            setClosingModal(false);
            setEpisodeCount(0);
        }, 300);
    };

    return (
        <div className='body'>
            <div className='personagem'>
                <h1 className='lista-personagens'>Lista de Personagens</h1>
                <input
                    type="text"
                    placeholder="Buscar personagem"
                    value={searchTerm}
                    onChange={e => setSearchTerm(e.target.value)}
                    className='input'
                />
                <select value={statusFilter} onChange={e => setStatusFilter(e.target.value)} className='select'>
                    <option value="">Todos os Status</option>
                    <option value="Alive">Vivo</option>
                    <option value="Dead">Morto</option>
                    <option value="unknown">Desconhecido</option>
                </select>
                <select value={speciesFilter} onChange={e => setSpeciesFilter(e.target.value)} className='select'>
                    <option value="">Todas as Espécies</option>
                    <option value="Human">Humano</option>
                    <option value="Alien">Alienígena</option>
                </select>
                <select value={genderFilter} onChange={e => setGenderFilter(e.target.value)} className='select'>
                    <option value="">Todos os Gêneros</option>
                    <option value="Male">Homem</option>
                    <option value="Female">Mulher</option>
                </select>
            </div>
            <hr className='linha'></hr>
            <ul className='character-list'>
                {filteredCharacters.map(character => (
                    <li key={character.id} className='character-item'>
                        <img src={character.image} alt={character.name} width="50" height="50" className='character-image'/>
                        <div className='character-info'>
                            <div>
                                <h2>{character.name}</h2>
                                <p><IoIosPulse className='character-icons'/> {character.status}</p>
                                <p><RiAliensLine className='character-icons'/> {character.species}</p>
                                <p><IoMdPlanet className='character-icons'/> {character.location.name}</p>
                            </div>
                        </div>
                        <button className='more-info' onClick={() => openModal(character)}>
                            <IoMdInformationCircleOutline /> Saiba Mais
                        </button>
                    </li>
                ))}
            </ul>
            <div>
                <button onClick={() => setPage(page - 1)} disabled={page === 1}>
                    Anterior
                </button>
                <span> Página {page} de {totalPages} </span>
                <button onClick={() => setPage(page + 1)} disabled={page === totalPages}>
                    Próxima
                </button>
            </div>

            {showModal && (
                <div className={`modal ${showModal ? 'show' : ''}`}>
                    <div className={`modal-content ${closingModal ? 'zoom-out' : ''}`}>
                        <span className='close' onClick={closeModal}>&times;</span>
                        {selectedCharacter && (
                            <div className='modal-info'>
                                <img src={selectedCharacter.image} alt={selectedCharacter.name} width="200" height="200" className='image-modal'/>
                                <h2>{selectedCharacter.name}</h2>
                                <hr className='linha-modal'></hr>
                                <p><IoIosPulse className='character-icons'/> {selectedCharacter.status}</p>
                                <p><RiAliensLine className='character-icons'/> {selectedCharacter.species}</p>
                                <p><IoMdPlanet className='character-icons'/> {selectedCharacter.location.name}</p>
                                <p><BsGenderAmbiguous className='character-icons'/> {selectedCharacter.gender}</p>
                                <p><BsGenderAmbiguous className='character-icons'/> {episodeCount}</p>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};

export default CharacterList;