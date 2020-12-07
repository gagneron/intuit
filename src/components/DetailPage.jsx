import { useEffect, useState } from 'react';
import Card from "./Card";
import PokeDetails from "./PokeDetails"

function DetailPage({pokemon, inBag, backToMain, updateBag}) {
    const [pokeDetails, setPokeDetails] = useState(null);

    useEffect(() => {
        console.log("detail page update", pokemon)

        fetch(pokemon.url)
        .then(res => res.json())
        .then(res => {
            console.log(res);
            setPokeDetails(res);
            // https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png
        })
        .catch(() => {
            // setLoadingFailed(true);
            alert("failed to get pokemon details");
        });
    }, [pokemon]);

    return (
        <div className="page detailPage">
            <button onClick={backToMain}>Back</button>
            <Card pokemon={pokemon} />
            {pokeDetails &&
            <div>
                <PokeDetails pokeDetails={pokeDetails} pokeId={pokemon.id} inBag={inBag} updateBag={updateBag} />
            </div>
        }
        </div>
    );
}

export default DetailPage;