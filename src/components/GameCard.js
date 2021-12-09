import {useState, useEffect} from 'react'
import '../componentStyles/GameCardStyles.css'


export default function GameCard({user, game, gameData, setGameData, getGames, setGames, game:{name, sport, location, date,
current_players, max_players, description, host_id, id}}) {

  const [showDesc, setShowDesc] = useState(false)
  const [edit, setEdit] = useState(false)
  const [participants, setParticipants] = useState([])
  const [gameInfo, setGameInfo] = useState({
    name ,
    sport,
    date ,
    location ,
    description  
  })

  useEffect(() => {
    fetch(`/games/${id}` , {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then(resp => resp.json())
    .then(data => setParticipants(data.participants))
  }, [])

  // Create participant and add to user's games
  const joinGame = (e, userId, gameId) => {
    e.preventDefault()

    fetch('/participants', {
      method: 'POST',
      headers: {
        'Content-Type':'application/json'
      }, 
      body: JSON.stringify({
        user_id: userId,
        game_id: gameId
      })
    })
    .then(resp => resp.json())
    .then(data => console.log(data))
    .then(() => getGames())
  }

  // Edit game if you're the host of it

  const handleEdit = () => setEdit(!edit)
  const handleGameInfo = (e) => {
    setGameInfo({...gameInfo, [e.target.name]:e.target.value})
  }

  const updateGame = (e, id, gameInfo) => {
    const {name, date, sport, location, description} = gameInfo
    e.preventDefault()

    fetch(`/games/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
         name,
         date,
         sport,
         location,
         description
      })
    })
    .then(resp => resp.json())
    .then(data => console.log(data))
    .then(() => {
      handleEdit()
      getGames()
    })
  }
  // Delete game if the user host is logged in
  const deleteGame = (e, id) => {
    e.preventDefault()

    fetch(`/games/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then(() => getGames())
  }

  return (
    <>  
    <div className="card">
      <div className="details">
        <div>
        
          {edit ? 
          <input type="text" 
          value={gameInfo.name}
          className = "edit-field"
          name="name"
          onChange ={(e) => handleGameInfo(e)} /> 
          
          : <h1 className="game-name">{name}</h1>}

          {/* Show game Description */}
          {!showDesc ? <i className="fas fa-plus" onClick={() => setShowDesc(true)}></i>
          : <i className="fas fa-minus" onClick={() => setShowDesc(false)}></i>}

        </div>

        {edit ? 
          <input type="text" 
          value={gameInfo.sport}
          className = "edit-field"
          name="sport"
          onChange ={(e) => handleGameInfo(e)} /> 
          
          : <h2>Sport: {sport}</h2> }

        {edit ? 
          <input type="text" 
          value={gameInfo.location}
          className = "edit-field"
          name="location"
          onChange ={(e) => handleGameInfo(e)} /> 
          
          : <h2>Location: {location}</h2>}

        {edit ? 
          <input type="datetime-local" 
          value={gameInfo.date}
          className = "edit-field"
          name="date"
          onChange ={(e) => handleGameInfo(e)} /> 
          
          : <h2>Date: {date}</h2> }

        {showDesc&& 
        <>
          <h3>Description:</h3> 
          <br/>
          {edit ? 
          <input type="textarea" 
          value={gameInfo.description}
          className = "edit-field"
          name="description"
          onChange ={(e) => handleGameInfo(e)} /> : <p>{description}</p>}
        </>}
        <div className="player-count">
          <h3>{current_players}/{max_players} Players</h3>
          {!participants.user_id === user.id && participants.length !== 0 
            &&<button className="action-btn join-btn" onClick={(e) => joinGame(e, user.id, id)}>Join This Game!</button>}
        </div>
        
        {/* Only edit or delete if user created the card */}
        {host_id === user.id ? 
          <div className="action-btn-container">
            {edit ? <button className= "action-btn" onClick ={(e) => updateGame(e, id, gameInfo)}>Save</button>
              :<button className= "action-btn" onClick ={() => handleEdit()}>Edit</button> }
            <button className= "action-btn delete-btn" onClick={(e)=> deleteGame(e, id)}>Delete</button>
          </div> : null}
      </div>
    </div>
    </>
  )
}