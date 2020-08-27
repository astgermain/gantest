import React, {useState} from 'react';
import './App.css';
import Grid from "./components/Grid";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faStar, faBookmark} from '@fortawesome/free-regular-svg-icons'
import {faTh, faSearch, faTimes} from '@fortawesome/free-solid-svg-icons'
import GAME_DATA from "./gameData"

function App() {

  const [searchValue, setSearchValue] = useState("");
  const [showAll, setShowAll] = useState(true);
  const [showNew, setShowNew] = useState(false);
  const [showTop, setShowTop] = useState(false);
  const onChange = event => {
    setSearchValue(event.target.value);
  }
  const clearSearch = () => {
    setSearchValue("")
  }
  const handleAllClick = () => {
    setShowAll(true)
    setShowNew(false)
    setShowTop(false)
  }
  const handleNewClick = () => {
    setShowNew(true)
    setShowAll(false)
    setShowTop(false)
  }
  const handleTopClick = () => {
    setShowTop(true)
    setShowNew(false)
    setShowAll(false)
  }
  const searchIcon = <FontAwesomeIcon icon={faSearch} color="white" />
  const clearIcon = <FontAwesomeIcon icon={faTimes} color="black" />

  const searchResults = () => {
    let indexCheck = new Set();
    let filteredResults = GAME_DATA.filter((data, index) => {
      let pattern = searchValue.split("").map((x)=>{
        return `(?=.*${x})`
      }).join("");
      let regex = new RegExp(`${pattern}`, "i")
      if(indexCheck.has(data.id)){
        return null
      }
      else if(data.name.match(regex)){
        indexCheck.add(data.id)
        return data
      }
      else{
        return null
      }
    })
    return filteredResults
    
  }
  let sr = searchResults();
  return (

    <div className="App">
        <div className="header">

          <div className="pageName">Slots</div>
          
          <div className="filters">
            <div className="visibility">
              <button className={showAll === true ? 'active' : 'all'} onClick={handleAllClick}>
                <FontAwesomeIcon icon={faTh} />
                <span>All</span>
              </button>
              <button className={showNew === true ? 'active' : 'new'} onClick={handleNewClick}>
                <FontAwesomeIcon icon={faBookmark} />
                <span>New</span>
              </button>
              <button className={showTop === true ? 'active' : 'top'} onClick={handleTopClick}>
                <FontAwesomeIcon icon={faStar} />
                <span>Top</span>
              </button>
            </div>
            <div className="search">
              <input 
                type="text" 
                placeholder="Search" 
                value={searchValue} 
                onChange={onChange} 
                className="searchInput"
              />
              <label className="clearIcon" onClick={clearSearch}>{clearIcon}</label>
              <label className="searchIcon">{searchIcon}</label>
              <div>{searchValue !== "" ? <div className="searchResults">
                {sr.map(x => {
                  return <div className="searchItem"><img className="searchItemImg" src={x.image} alt={x.name}></img>{x.name}</div>
                })}
                </div> 
                : <div></div> 
                }
              </div>
            </div>
          </div>
        </div>
        <Grid all={showAll} new={showNew} top={showTop}/>
    </div>
  );
}

export default App;
