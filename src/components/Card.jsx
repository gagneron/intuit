function Card({pokemon, viewDetail, inBag}) {
    const imgSrc = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.id}.png`;
    return (
        <div key={pokemon.id} className="card" onClick={() => {viewDetail && viewDetail(pokemon)}}>
            <img className="cardImg" src={imgSrc} />
            <div className="label">{pokemon.name}</div>
            {inBag ? "inBag": ""}
        </div>
    );
}

export default Card;