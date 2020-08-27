import React from 'react';

const Game = props => {
    return(
        <div className="game"><img src={props.image} alt={props.alt}></img></div>
    )
}

export default Game;