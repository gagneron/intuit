import React, { useEffect, useState } from 'react';
import { filter } from 'minimatch';

function MainPage({viewDetail, allPokemon}) {
    const [searchValue, setSearchValue] = useState("");
    const [filteredPokemonList, setFilteredPokemonList] = useState([]);

    useEffect(() => {
        console.log("main use effect", allPokemon, searchValue)
        getFilteredPokemonList(searchValue);
    }, [allPokemon]);

    const getFilteredPokemonList = (searchVal) => {
        let filteredList = [];
        if (!searchVal) {
            filteredList = allPokemon;
        } else {
            searchVal = searchVal.toLowerCase();
            filteredList = allPokemon.filter((pokemon) => {
                // TODO: consider showing matches that contain rather than start with
                return pokemon.name.toLowerCase().startsWith(searchVal);
            });
        }

        setFilteredPokemonList(filteredList);
    }



    const updateSearchValue = (searchVal) => {
        setSearchValue(searchVal);
        // TODO: use setTimeout to wait for user to finish typing
        getFilteredPokemonList(searchVal);
    }

    return (
        <div className="mainPage">
            <div className="flexContainer">
                <input placeholder="search" type="search" value={searchValue} onChange={(e) => {updateSearchValue(e.target.value)}} />
            </div>
            <div className="flexContainer">
                {filteredPokemonList.map((pokemon) => {
                    return <Card key={pokemon.name} pokemon={pokemon} viewDetail={viewDetail} />
                })}
            </div>
        </div>
    );
}

function Card({pokemon, viewDetail}) {
    // TODO: move to separate utility file
    // split url value of /pokemon api to get the id
    const getPokeId = (pokeUrl) => {
        let split = pokeUrl.split("/");
        let index = split[split.length - 2];
        return index;
    }

    const id = getPokeId(pokemon.url);
    const imgSrc = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`;
    return <div key={id} className="card" onClick={() => {viewDetail(pokemon)}}>
            <img className="cardImg" src={imgSrc} />
            <div className="label">{pokemon.name}</div>
        </div>
}

export default MainPage;