import React, { useEffect, useState } from 'react';
import './App.css';
import './styles.scss';

function App() {
    const [allPokemon, setAllPokemon] = useState([]);
    const [filteredPokemonList, setFilteredPokemonList] = useState([]);
    const [searchValue, setSearchValue] = useState("");

    useEffect(() => {
        fetch("https://pokeapi.co/api/v2/pokemon?limit=151")
        .then(res => res.json())
        .then(res => {
            console.log(res);
            setAllPokemon(res.results);
            setFilteredPokemonList(res.results);
            // https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png
        })
        .catch(() => {
            alert("failed to get pokemon list");
        });
    }, []);

    // split url value of /pokemon api to get the id
    const getPokeId = (pokeUrl) => {
        let split = pokeUrl.split("/");
        let index = split[split.length - 2];
        return index;
    }

    const updateSearchValue = (searchVal) => {
        setSearchValue(searchVal);
        // TODO: use setTimeout to wait for user to finish typing
        getFilteredPokemonList(searchVal);
    }

    const getFilteredPokemonList = (searchVal) => {
        if (!searchValue) {
            return allPokemon;
        }
        searchVal = searchVal.toLowerCase();
        setFilteredPokemonList(allPokemon.filter((pokemon) => {
            // TODO: consider showing matches that contain rather than start with
            return pokemon.name.toLowerCase().startsWith(searchVal);
        }));
    }

    return (
        <div className="App">
            <div className="flexContainer">
                <input placeholder="search" type="search" value={searchValue} onChange={(e) => {updateSearchValue(e.target.value)}} />
            </div>
            <div className="flexContainer">
            {filteredPokemonList.map((pokemon) => {
                let id = getPokeId(pokemon.url);
                let imgSrc = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`;
                return <div key={id} className="card">
                        <img className="cardImg" src={imgSrc} />
                        <div className="label">{pokemon.name}</div>
                </div>
            })}
            </div>
        </div>
    );
}

export default App;

