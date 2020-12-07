function Card({pokemon, viewDetail, inBag}) {
    const imgSrc = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.id}.png`;
    let className = "card";
    if (inBag) {
        className += " inBag";
    }
    return (
        <div key={pokemon.id} className={className} onClick={() => {viewDetail && viewDetail(pokemon)}}>
            <img className="cardImg" src={imgSrc} alt={pokemon.name} />
            <div className="label">{pokemon.name}</div>
        </div>
    );
}

export default Card;