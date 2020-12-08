import React, { useEffect, useState } from 'react';
import Card from "./Card";

function MainPage({viewDetail, allPokemon, bag}) {
    const [searchValue, setSearchValue] = useState("");
    const [filteredPokemonList, setFilteredPokemonList] = useState([]);
    const [isBagFiltered, setBagFiltered] = useState(false);

    useEffect(() => {
        getSearchFilteredPokemonList(searchValue);
    }, [allPokemon]);

    const getSearchFilteredPokemonList = (searchVal) => {
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
        getSearchFilteredPokemonList(searchVal);
    }

    // TODO: disable button if filter is on
    let filterWrapClass = "flexContainer filterWrap";
    let cardContainerClass = "flexContainer";

    if (isBagFiltered) {
        filterWrapClass += " filtered";
        cardContainerClass += " filtered";
    }

    return (
        <div className="page mainPage">
            <div className={filterWrapClass}>
                <button className="filterBtn all" onClick={() => {setBagFiltered(false)}}>All</button>
                <button className="filterBtn bag" onClick={() => {setBagFiltered(true)}}>Bag</button>
            </div>
            <div className="flexContainer">
                <input placeholder="search" type="search" value={searchValue} onChange={(e) => {updateSearchValue(e.target.value)}} />
            </div>
            <div className={cardContainerClass}>
                {filteredPokemonList.map((pokemon) => {
                    return <Card key={pokemon.name} inBag={bag.has(pokemon.id)} pokemon={pokemon} viewDetail={viewDetail} />
                })}
            </div>
        </div>
    );
}

export default MainPage;