import {useState} from 'react'
import '../componentStyles/GameCardStyles.css'


export default function GameCard({user, game, getGames, game:{name, sport, location, date,
current_players, max_players, description, host_id, id}}) {

  const [showDesc, setShowDesc] = useState(false)

  const editGame = (e, id) => {

  }



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
  }

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
    <div className="card">
      <div className="details">
        <div>
          <h1 className="game-name">{name}</h1>
          {!showDesc ? <i className="fas fa-plus" onClick={() => setShowDesc(true)}></i>
          : <i className="fas fa-minus" onClick={() => setShowDesc(false)}></i>}
        </div>
        <h2>Sport: {sport}</h2>
        <h2>Location: {location}</h2>
        <h2>Date: {date}</h2>
        {showDesc&& 
        <>
          <h3>Description:</h3> 
          <br/>
          <p>{description}</p>
        </>}
        <div className="player-count">
          <h3>{current_players}/{max_players} Players</h3>
          <button className="action-btn join-btn" onClick={(e) => joinGame(e, user.id, id)}>Join This Game!</button>
        </div>
        
        {/* Only edit or delete if user created the card */}
        {host_id === user.id ? 
          <div className="action-btn-container">
            <button className= "action-btn " onClick={e => editGame(e, game.id)}>Edit</button>
            <button className= "action-btn delete-btn" onClick={(e)=> deleteGame(e, game.id)}>Delete</button>
          </div> : null}
      </div>
    </div>
  )
}