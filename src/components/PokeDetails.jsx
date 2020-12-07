import { LoremIpsum } from 'react-lorem-ipsum';

function PokeDetails({pokeDetails, pokeId, inBag, updateBag}) {
    const handleBagChange = (e) => {
        const isChecked = e.target.checked;
        updateBag(pokeId, isChecked);
    }
    return (
        <div>
            <div>Height: {pokeDetails.height}</div>
            <div>Weight: {pokeDetails.weight}</div>
            <div>In Bag: <input type="checkbox" checked={inBag} onChange={handleBagChange} /></div>
            <div className="pokeTypesList">
                Types: {pokeDetails.types.map((type) => {
                    return <span key={type.slot}>{type.type.name} </span>
                })}
            </div>
            <div className="description">
                <LoremIpsum />
            </div>
            <div className="abilities">
                <h5>Abilities</h5>
                {pokeDetails.abilities.map((ability) => {
                    return <div key={ability.slot}>
                            <a  href={ability.ability.url}>{ability.ability.name}</a>
                        </div>
                })}
            </div>
        </div>
    );
}

export default PokeDetails;