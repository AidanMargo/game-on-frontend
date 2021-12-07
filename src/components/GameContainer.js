import GameCard from "./GameCard"
import Search from './Search'
import {useEffect, useState} from 'react'
import '../componentStyles/GameContainerStyles.css'

export default function GameContainer() {

  const [games, setGames] = useState([])
  const [search, setSearch] = useState('')


  const handleSearch = (e) => setSearch(e.target.value)

  useEffect(() => {
    fetch('/games')
    .then(resp => resp.json())
    .then(data => setGames(data))
  }, [])


  const searchByNameResults = () => {
    if (search.length > 0) {
      return games.filter(game => game.name.toLowerCase().includes(search.toLowerCase()) 
      || game.location.toLowerCase().includes(search.toLowerCase()))
    } else {
      return games
    }
  }

  
  return (
    <div className="container">
      <Search search={search} handleSearch={handleSearch} />
      {searchByNameResults().map(game => <GameCard key={game.id}game={game}/>)}
    </div>
  )
}