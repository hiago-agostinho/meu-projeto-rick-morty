import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const CharacterDetail = () => {
    const { id } = useParams();
    const [character, setCharacter] = useState(null);

    useEffect(() => {
        axios.get(`https://rickandmortyapi.com/api/character/${id}`)
            .then(response => {
                setCharacter(response.data);
            })
            .catch(error => {
                console.error('Erro ao buscar detalhes do personagem:', error);
            });
    }, [id]);

    if (!character) {
        return <div>Carregando...</div>;
    }

    return (
        <div>
            <h1>{character.name}</h1>
            <img src={character.image} alt={character.name} width="200" height="200" />
            <p>Status: {character.status}</p>
            <p>Espécie: {character.species}</p>
            <p>Gênero: {character.gender}</p>
            <p>Origem: {character.origin.name}</p>
            <p>Localidade: {character.location.name}</p>
        </div>
    );
};

export default CharacterDetail;
