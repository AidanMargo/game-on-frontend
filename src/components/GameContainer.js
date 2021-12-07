import GameCard from "./GameCard"
import Search from './Search'
import {useEffect, useState} from 'react'
import '../componentStyles/GameContainerStyles.css'

export default function GameContainer({user, setUser}) {

  // State Variables
  const [games, setGames] = useState([])
  const [search, setSearch] = useState('')
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

  
  // Get Game and current user
  useEffect(() => {
    fetch('/games')
    .then(resp => resp.json())
    .then(data => setGames(data))
  }, [])
  
  
  // State Handler Functions
  const handleSearch = (e) => setSearch(e.target.value)
  const handleGameData = (e) => {
    setGameData({...gameData, [e.target.name]:e.target.value})
  }

  // Search functionality
  const searchByNameResults = () => {
    if (search.length > 0) {
      return games.filter(game => game.name.toLowerCase().includes(search.toLowerCase()) 
      || game.location.toLowerCase().includes(search.toLowerCase()))
    } else {
      return games
    }
  }

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
    .then(data => setGames([data, ...games]))
  }

  
  return (
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
        {searchByNameResults().map(game => <GameCard key={game.id}game={game}/>)}
      </div>
    </div>
  )
}