import GameCard from "./GameCard"
import Search from './Search'
import {useEffect, useState} from 'react'
import '../componentStyles/GameContainerStyles.css'

export default function GameContainer({user, setGames, games, search, searchResults, handleSearch, getGames}) {

  // State Variables
  const [gameData, setGameData] = useState({
    name: '',
    date: '',
    sport: '',
    location: '',
    current_players: 0,
    max_players: 0,
    description: '',
    host_id: 1
  })

  
  // State Handler Functions
  const handleGameData = (e) => {
    setGameData({...gameData, [e.target.name]:e.target.value})
  }
  // Search functionality
  

  // Create a new game
const createGame = (e, gameData) => {
 const {name, date, sport, location, current_players, max_players,
    description} = gameData
    e.preventDefault()

    fetch('/games', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name, 
        date,
        sport,
        location,
        current_players,
        max_players,
        description,
        host_id: user.id
      })
    })
    .then(resp => resp.json())
    .then(data => setGames([...games, data]))
  }

  
  return (
    <>
    {games.length >= 0 && user ?  
    <>
    <h1>Welcome, {user.name}!</h1>
    <div className="game-grid">
      {/* Create a Game Form */}
      <form className="login-form" onSubmit={(e) => createGame(e, gameData)}>
        <label>Game Name </label>
        <input
          type='text'
          className='input-field'
          name= 'name'
          required='required'
          value={gameData.name}
          placeholder='Name'
          onChange={(e) => handleGameData(e)}></input>
        <label>Date: </label>
        <input
          type='datetime-local'
          name='date'
          required='required'
          className='input-field'
          value={gameData.date}
          placeholder='Password'
          onChange={(e) => handleGameData(e)}></input>
        <label>Sport: </label>
        <input
          type='string'
          name='sport'
          required='required'
          className='input-field'
          value={gameData.sport}
          placeholder='Sport'
          onChange={(e) => handleGameData(e)}></input>
        <label>Location: </label>
        <input
          type='string'
          name='location'
          required='required'
          className='input-field'
          value={gameData.location}
          placeholder='Location'
          onChange={(e) => handleGameData(e)}></input>
          <label>Current Players: </label>
        <input
          type='number'
          name='current_players'
          required='required'
          className='input-field'
          value={gameData.current_players}
          placeholder='Current Players'
          onChange={(e) => handleGameData(e)}></input>
          <label>Max Players: </label>
        <input
          type='number'
          name='max_players'
          required='required'
          className='input-field'
          value={gameData.max_players}
          placeholder='Max Players'
          onChange={(e) => handleGameData(e)}></input>
          <label>Description: </label>
        <input
          type='text-area'
          name='description'
          required='required'
          className='input-field'
          value={gameData.description}
          placeholder='Description of your game'
          onChange={(e) => handleGameData(e)}></input>
          <button>Create Game</button>
      </form>

      {/* Game Container */}
      <div className="card-container">
        <Search search={search} handleSearch={handleSearch} />
        {searchResults().map(game => <GameCard key={game.id} game={game} user={user} getGames={getGames} gameData={gameData}/>)}
      </div>
      </div>
    </>
    : <h1 className="loading-msg">Loading Data...</h1>}
  </>
  )
}