import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import styled from "styled-components";

export const Home = () => {
  const [pokemons, setPokemons] = useState([]);
  const [offset, setOffset] = useState(0);
  const [selectedType, setSelectedType] = useState("");

  const fetchPokemonsByType = async (type, newOffset = 0) => {
    try {
      const response = await axios.get(`https://pokeapi.co/api/v2/type/${type}`);
      const allPokemonOfType = response.data.pokemon.map(p => p.pokemon);

      if (allPokemonOfType.length === 0) {
        setPokemons([]);
        return;
      }

      const selectedPokemons = allPokemonOfType.slice(newOffset, newOffset + 10);

      const pokemonData = await Promise.all(selectedPokemons.map(async (pokemon) => {
        const details = await axios.get(pokemon.url);
        return {
          name: details.data.name,
          image: details.data.sprites.front_default,
          id: details.data.id
        };
      }));

      setPokemons((prev) => [...prev, ...pokemonData]);
    } catch (error) {
      console.error("Erro ao buscar Pokémon por tipo", error);
    }
  };

  useEffect(() => {
    if (selectedType) {
      setPokemons([]);
      setOffset(0);
      fetchPokemonsByType(selectedType, 0);
    }
  }, [selectedType]);

  const loadMorePokemons = () => {
    const newOffset = offset + 10;
    setOffset(newOffset);
    fetchPokemonsByType(selectedType, newOffset);
  };

  return (
    <Main>
      <Select>
        <label>Select the type of Pokemon:</label>
        <select value={selectedType} onChange={(e) => setSelectedType(e.target.value)}>
          <option value="">Todos</option>
          <option value="fire">🔥 Fire</option>
          <option value="water">💧 Water</option>
          <option value="grass">🌿 Grass</option>
          <option value="electric">⚡ Electric</option>
          <option value="psychic">🔮 Psychic</option>
          <option value="ice">❄️ Ice</option>
          <option value="dragon">🐉 Dragon</option>
          <option value="dark">🌑 Dark</option>
        </select>
      </Select>
      <List>
        {pokemons.map((pokemon) => (
          <Card key={pokemon.id}>
            <Link to={`/pokemon/${pokemon.id}`}>
              <img src={pokemon.image} alt={pokemon.name} />
              <p>{pokemon.name}</p>
            </Link>
          </Card>
        ))}
      </List>
      <Button onClick={loadMorePokemons}>Load more ...</Button>
    </Main>
  );
};

const Main = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const Card = styled.li`
  max-width: 150px;
  height: 240px;
  background: ${({ theme }) => theme.bgcard};
  margin: 30px;
  display: flex;
  justify-content: center;
  border-radius: 10px;
  box-shadow: 0 0 10px ${({ theme }) => theme.color};
  border: 2px solid ${({ theme }) => theme.color};
  transition: 0.2s;
  & img {
    width: 110px;
    margin: 20px;
  }
  & p {
    text-align: center;
    font-size: 20px;
    font-weight: 900;
    color: ${({ theme }) => theme.color};
  }
  & p::first-letter {
    text-transform: uppercase;
  }
  &:hover {
    scale: 1.1;
  }
`;
const List = styled.ul`
  display: grid;
  grid-template-columns: repeat(5, 210px);
  grid-template-rows: repeat(2, 300px);
  justify-content: center;
  @media (max-width: 1090px) {
    display: flex;
    flex-wrap: wrap;
  }
`;
const Button = styled.button`
  margin: 15px;
  width: 200px;
  padding: 10px;
  border-radius: 10px;
  background: ${({ theme }) => theme.bgbutton};
  color: ${({ theme }) => theme.color};
  font-size: 20px;
  font-weight: 900;
  cursor: pointer;
  border: 2px solid ${({ theme }) => theme.color};
  transition: 0.2s;
  &:hover {
    scale: 1.1;
  }
`;
const Select = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 20px;
  width: 300px;
  padding: 10px;
  border-radius: 10px;
  background: ${({ theme }) => theme.bgbutton};
  color: ${({ theme }) => theme.color};
  font-size: 20px;
  font-weight: 700;
  border: 2px solid ${({ theme }) => theme.color};
  gap: 10px;
  & select{
    width: 140px;
    height: 30px;
    text-align: center;
    background-color: ${({ theme }) => theme.bgbutton};
    color: ${({ theme }) => theme.color};
    border-radius: 10px;
    border: 2px solid ${({ theme }) => theme.color};
    font-size: 16px;
    font-weight: 700;
  }
`
