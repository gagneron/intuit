import React, { useEffect, useState } from 'react';

function DetailPage({pokemon, backToMain}) {

    console.log(pokemon)
    return (
        <div className="detailpage">
            {pokemon.name}
            <button onClick={backToMain}>Back</button>
        </div>
    );
}

export default DetailPage;