import React from 'react';
import Game from "./Game";
import GAME_DATA from "../gameData"
const generateGames = props => {
    let tempGame = null;
    let grid = [];
    GAME_DATA.forEach((data, index) => {
        if((props.new === true && data.new !== true) || (props.top === true && data.top !== true)){
            //do nothing
        }
        else if(data.big === true){
            grid.push(<div><Game key={index} image={data.image} alt={data.name}></Game></div>)
        }
        else if(tempGame === null){
            tempGame = <Game key={index} image={data.image} alt={data.name}></Game>
        }
        else{
            grid.push(
                <div key={index}>
                    {tempGame}
                    <Game key={index} image={data.image} alt={data.name}></Game>
                </div>   
            )
            tempGame = null;     
        }
    })
    return grid;
}
const Grid = props => {
    return(
        <div className="games">
            {generateGames(props)}
        </div>
    )
}

export default Grid;