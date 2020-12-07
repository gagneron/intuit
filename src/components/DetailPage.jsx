import { useEffect, useState } from 'react';
import Card from "./Card";
import PokeDetails from "./PokeDetails"
import GoogleMapReact from 'google-map-react';

function DetailPage({pokemon, inBag, backToMain, updateBag}) {
    const [pokeDetails, setPokeDetails] = useState(null);
    const [locations, setLocations] = useState(null);

    useEffect(() => {
        console.log("detail page update", pokemon)

        fetch(pokemon.url)
        .then(res => res.json())
        .then(res => {
            setPokeDetails(res);
        })
        .catch(() => {
            // setLoadingFailed(true);
            alert("failed to get pokemon details");
        });

        fetch(`https://api.craft-demo.net/pokemon/${pokemon.id}`, {
            method: 'GET',
            headers: {
                'X-API-KEY': 'HHko9Fuxf293b3w56zAJ89s3IcO9D5enaEPIg86l',
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        })
        .then(res => res.json())
        .then(res => {
            console.log(res);
            if (res.locations) {
                const locations = res.locations.map((coor) => {
                    let split = coor.split(",");
                    return {
                        lat: parseFloat(split[0]),
                        lng: parseFloat(split[1]),
                    }
                });
                setLocations(locations);
            } else {
                setLocations([]);
            }
        })
        .catch(() => {
            // setLoadingFailed(true);
            alert("failed to get pokemon coordinates");
        });


    }, [pokemon]);
    const imgSrc = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.id}.png`;

    return (
        <div className="page detailPage">
            <button onClick={backToMain}>Back</button>
            <div className="detailsWrap">
                <div className="detailsSection">
                    <Card pokemon={pokemon} />
                    {pokeDetails &&

                        <PokeDetails pokeDetails={pokeDetails} pokeId={pokemon.id} inBag={inBag} updateBag={updateBag} />
                    }
                </div>
                <div className="mapSection" style={{ height: '50vh', width: '50%' }}>
                    {locations &&
                        <GoogleMapReact
                            bootstrapURLKeys={{ key: "AIzaSyDzKQU1DjkP8StMIBMrxFGZbE96izErUVU"}}
                            defaultCenter={{
                                lat: 32.734778,
                                lng: -117.152630
                            }}
                            defaultZoom={11}
                        >
                            {locations.map((location) => {
                                return <Marker lat={location.lat} lng={location.lng} imgSrc={imgSrc}/>
                            })}
                        </GoogleMapReact>
                    }
                </div>
            </div>
        </div>
    );
}

function Marker({ imgSrc }) {
    return <img className="cardImg" src={imgSrc}/>;
}

export default DetailPage;