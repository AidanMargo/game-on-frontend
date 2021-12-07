import {useState} from 'react'
import '../componentStyles/GameCardStyles.css'


export default function GameCard({game, game:{name, sport, location, date,
current_players, max_players, description}}) {

  const [showDesc, setShowDesc] = useState(false)
  return (
    <div className="card">
      <div className="details">
        <div>
        <h1 className="game-name">{name}</h1>
        {!showDesc ? <i class="fas fa-plus" onClick={() => setShowDesc(true)}></i>
        : <i class="fas fa-minus" onClick={() => setShowDesc(false)}></i>}
        </div>
        <h2>{location}</h2>
        <h2>{date}</h2>
        {showDesc&&<p>{description}</p>}
        <h3 className="player-count">{current_players}/{max_players} Players</h3>
      </div>
    </div>
  )
}