
// split url value of /pokemon api to get the id
const getPokeId = (pokeUrl) => {
    let split = pokeUrl.split("/");
    let index = split[split.length - 2];
    return index;
}

const detailsCache = new Map();
const locationsCache = new Map();

async function getDetails(pokemon, callback) {
    if (detailsCache.has(pokemon.id)) {
        callback(detailsCache.get(pokemon.id));
    } else {
        try {
            let res = await fetch(pokemon.url);
            res = await res.json();
            detailsCache.set(pokemon.id, res);
            callback(res);
        } catch (e) {
            console.error(e);
            alert("failed to get pokemon details");
        }
    }
}

async function getLocations(pokemon, callback) {
    if (locationsCache.has(pokemon.id)) {
        callback(locationsCache.get(pokemon.id));
    } else {
        try {
            let res = await fetch(`https://api.craft-demo.net/pokemon/${pokemon.id}`, {
                method: 'GET',
                headers: {
                    'X-API-KEY': 'HHko9Fuxf293b3w56zAJ89s3IcO9D5enaEPIg86l',
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            });
            res = await res.json();
            if (res.locations) {
                const locations = res.locations.map((coor) => {
                    let split = coor.split(",");
                    return {
                        lat: parseFloat(split[0]),
                        lng: parseFloat(split[1]),
                    }
                });
                locationsCache.set(pokemon.id, locations);
                callback(locations);
            } else {
                callback([]);
            }
        } catch (e) {
            console.error(e);
            alert("failed to get pokemon coordinates");
        }
    }
}

export default { getPokeId , getDetails, getLocations }