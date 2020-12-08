import React, { useEffect, useState } from 'react';
import '../App.css';
import '../styles.scss';
import MainPage from './MainPage';
import DetailPage from './DetailPage';
import utils from '../utils';

function App() {
    const [currentView, setCurrentView] = useState("main");
    const [allPokemonLoaded, setAllPokemonLoaded] = useState(false);
    const [loadingFailed, setLoadingFailed] = useState(false);
    const [allPokemon, setAllPokemon] = useState([]);
    const [activePokemon, setActivePokemon] = useState();
    const [bag, setBag] = useState(new Set());
    const STORAGE_KEY = "storedPokemon";

    useEffect(() => {
        fetch("https://pokeapi.co/api/v2/pokemon?limit=151")
        .then(res => res.json())
        .then(res => {
            setAllPokemonLoaded(true);
            res.results.forEach((pokemon) => {
                pokemon.id = utils.getPokeId(pokemon.url)
            });
            setAllPokemon(res.results);
            // https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png
        })
        .catch(() => {
            setLoadingFailed(true);
            alert("failed to get pokemon list");
        });

        let storedPokemon = localStorage.getItem(STORAGE_KEY);
        try {
            const storedSet = new Set(storedPokemon);
            if (storedSet) {
                setBag(storedSet);
            }
        } catch (e) {
            // don't populate from errored storage
        }
    }, []);

    const viewDetail = (pokemon) => {
        setCurrentView("detail");
        setActivePokemon(pokemon);
    }

    const backToMain = () => {
        setCurrentView("main");
    };

    const updateBag = (id, inBag) => {
        let newBag = new Set(bag);
        if (inBag) {
            newBag.add(id);
        } else {
            newBag.delete(id);
        }
        setBag(newBag);
        localStorage.setItem(STORAGE_KEY, JSON.stringify([...newBag]));
    };

    let page;
    let className = "app";
    if (allPokemonLoaded) {
        page = <React.Fragment>
                 <MainPage viewDetail={viewDetail} allPokemon={allPokemon} bag={bag} />
                 {activePokemon &&
                    <DetailPage
                        pokemon={activePokemon}
                        inBag={bag.has(activePokemon.id)}
                        backToMain={backToMain}
                        updateBag={updateBag}
                    />
                }
            </React.Fragment>;
        if (currentView === "main") {
            className += " mainActive";
        } else {
            className += " detailActive";
        }
    } else if (loadingFailed) {
        page = "Failed to load Pokemon";
    } else {
        page = "Loading...";
    }
    return (
        <div className={className}>
            {page}
        </div>
    );
}

export default App;