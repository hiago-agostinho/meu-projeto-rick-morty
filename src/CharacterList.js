import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { RiAliensLine } from "react-icons/ri";
import { IoMdPlanet } from "react-icons/io";
import { IoIosPulse } from "react-icons/io";
import { IoMdInformationCircleOutline } from "react-icons/io";
import './Character.css';

const CharacterList = () => {
    const [characters, setCharacters] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [statusFilter, setStatusFilter] = useState('');
    const [speciesFilter, setSpeciesFilter] = useState('');
    const [genderFilter, setGenderFilter] = useState('');
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

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
                        <button className='more-info'>
                            <Link to={`/character/${character.id}`} className="character-link">
                                <IoMdInformationCircleOutline /> Saiba Mais
                            </Link>
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
        </div>
    );
};

export default CharacterList;
