
// split url value of /pokemon api to get the id
const getPokeId = (pokeUrl) => {
    let split = pokeUrl.split("/");
    let index = split[split.length - 2];
    return index;
}

export default { getPokeId }