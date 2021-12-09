import {useState, useEffect} from 'react'
import '../componentStyles/GameCardStyles.css'


export default function GameCard({user, game, gameData, setGameData, getGames, setGames, game:{name, sport, location, date,
current_players, max_players, description, host_id, id}}) {

  // State Variables
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

  // Get all participants for the game and set to state
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

  const getParticipants = () => {
    fetch(`/games/${id}` , {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then(resp => resp.json())
    .then(data => setParticipants(data.participants))
  }

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
    .then(() => {
      getGames()
      getParticipants()
    })
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

  // Delete user from participants
  const leaveGame = (e, id) => {
    e.preventDefault()

    fetch(`/participants/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(() => {    
      getGames()
      getParticipants()
    })
  }

  // Returns "Game is Full" or an option to join a game dependent on participant status and # of participants
  const joinOptions = () => {
    if(current_players === max_players && !participant){
      return <p>Game is full</p>
    } else if (!participant && current_players < max_players) {
      return <button className="action-btn join-btn" onClick={(e) => joinGame(e, user.id, id)}>Join This Game!</button>
    } else {
      return <button className="action-btn leave-btn" onClick={(e) => leaveGame(e, participant.id)}>Leave Game</button>
    }
  }

  // Checks to see if user is a participant in this game
  let participant = participants.length > 0 &&participants.find(participant => participant.user_id === user.id)

  return (
    <>  
    <div className="card">
      <div className="details">
        <div className="expand-btn">
        
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
          
        </div>
        
        {/* Only edit or delete if user created the card */}

        {host_id === user.id ? 
        <div className="action-btn-container">
          <div className= "edit-delete-container">
            {edit ? <button className= "action-btn" onClick ={(e) => updateGame(e, id, gameInfo)}>Save</button>
              :<button className= "action-btn" onClick ={() => handleEdit()}>Edit</button> }
            <button className= "action-btn delete-btn" onClick={(e)=> deleteGame(e, id)}>Delete</button>
            </div>
          </div> : null}
          <div className ="participant-btn-container">
            {joinOptions()}
          </div>
          
      </div>
    </div>
    </>
  )
}