import { useEffect, useState } from 'react';
import Card from "./Card";
import PokeDetails from "./PokeDetails"
import GoogleMapReact from 'google-map-react';
import utils from '../utils';


function DetailPage({pokemon, inBag, backToMain, updateBag}) {
    const [pokeDetails, setPokeDetails] = useState(null);
    const [locations, setLocations] = useState(null);
    const [cache, setCache] = useState({});

    useEffect(() => {
        utils.getDetails(pokemon, setPokeDetails);
        utils.getLocations(pokemon, setLocations);

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
                            {locations.map((location, i) => {
                                return <Marker key={i} lat={location.lat} lng={location.lng} imgSrc={imgSrc}/>
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