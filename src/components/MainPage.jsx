import React, { useEffect, useState } from 'react';
import Card from "./Card";

function MainPage({viewDetail, allPokemon, bag}) {
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
        <div className="page mainPage">
            <div className="flexContainer">
                <input placeholder="search" type="search" value={searchValue} onChange={(e) => {updateSearchValue(e.target.value)}} />
            </div>
            <div className="flexContainer">
                {filteredPokemonList.map((pokemon) => {
                    return <Card key={pokemon.name} inBag={bag.has(pokemon.id)} pokemon={pokemon} viewDetail={viewDetail} />
                })}
            </div>
        </div>
    );
}

export default MainPage;