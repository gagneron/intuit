import React, { useEffect, useState } from 'react';
import './App.css';
import './styles.scss';

function App() {
    const [allPokemon, setAllPokemon] = useState([]);

    useEffect(() => {
        fetch("https://pokeapi.co/api/v2/pokemon?limit=151")
        .then(res => res.json())
        .then(res => {
            console.log(res);
            setAllPokemon(res.results);
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

    return (
        <div className="App">
            <div className="flexContainer">
            {allPokemon.map((pokemon) => {
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