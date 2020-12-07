import React, { useEffect, useState } from 'react';
import Card from "./Card";
import PokeDetails from "./PokeDetails"

function DetailPage({pokemon, inBag, backToMain, updateBag}) {
    const [pokeDetails, setPokeDetails] = useState(null);

    console.log(pokeDetails);

    useEffect(() => {
        console.log("detail page update", pokemon)

        fetch(pokemon.url)
        .then(res => res.json())
        .then(res => {
            console.log(res);
            setPokeDetails(res);
            // setAllPokemonLoaded(true);
            // setAllPokemon(res.results);
            // https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png
        })
        .catch(() => {
            // setLoadingFailed(true);
            alert("failed to get pokemon list");
        });
    }, [pokemon]);

    console.log(pokemon)
    return (
        <div className="page detailPage">
            <Card pokemon={pokemon} />
            {pokeDetails && <PokeDetails pokeDetails={pokeDetails} pokeId={pokemon.id} inBag={inBag} updateBag={updateBag} />}
            <button onClick={backToMain}>Back</button>
        </div>
    );
}

export default DetailPage;