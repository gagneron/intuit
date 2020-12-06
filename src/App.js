import React, { useEffect, useState } from 'react';
import './App.css';
import './styles.scss';
import MainPage from './MainPage';
import DetailPage from './DetailPage';

function App() {
    const [currentView, setCurrentView] = useState("main");
    const [allPokemonLoaded, setAllPokemonLoaded] = useState(false);
    const [loadingFailed, setLoadingFailed] = useState(false);
    const [allPokemon, setAllPokemon] = useState([]);
    const [detailedPokemon, setDetailedPokemon] = useState();

    useEffect(() => {
        fetch("https://pokeapi.co/api/v2/pokemon?limit=151")
        .then(res => res.json())
        .then(res => {
            console.log(res);
            setAllPokemonLoaded(true);
            setAllPokemon(res.results);
            // https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png
        })
        .catch(() => {
            setLoadingFailed(true);
            alert("failed to get pokemon list");
        });
    }, []);

    const viewDetail = (pokemon) => {
        setCurrentView("detail");
        setDetailedPokemon(pokemon);
    }
    let page;
    if (allPokemonLoaded) {
        if (currentView === "main") {
            page = <MainPage viewDetail={viewDetail} allPokemon={allPokemon} />;
        } else {
            page =  <DetailPage pokemon={detailedPokemon} backToMain={() => {setCurrentView("main")}} />;
        }
    } else if (loadingFailed) {
        page = "Failed to load Pokemon";
    } else {
        page = "Loading...";
    }
    return (
        <div className="App">
            {page}
        </div>
    );
}

export default App;