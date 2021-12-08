import GameCard from './GameCard'
import Search from './Search'
import '../componentStyles/ProfileStyles.css'
import {useEffect, useState} from 'react'
export default function Profile({user, search, searchResults, handleSearch, getGames}) {


  const [userGames, setUserGames] = useState([])
  useEffect(() => {
    if(user) {
    fetch(`/user/games/${user.id}`)
    .then(resp => resp.json())
    .then(data => setUserGames(data))
    }
  }, [])

  // const userGameSearch = ()

  console.log(userGames)
  return (
    <>
    {user ?
    <>
    <div className="profile-grid">
     
      <div className="user-info">
        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQdhnZO4YVdLifMuNbR_uNjtlW246uAayxk8wtAh_CLc6Nba7Aeys4tCPhFjIeT7hWe5co&usqp=CAU"/>
        <h1>{user.name}</h1>
        <h2>{user.age}</h2>
      </div>
      <div className="user-games"> 
      <div className="card-container">
        <Search search={search} handleSearch={handleSearch} />
        {searchResults().map(game => <GameCard key={game.id} game={game} user={user} getGames={getGames}/>)}
      </div>
      </div>
    </div> 
    </>
    : <h1>Loading Profile..</h1>}
    </>
  )
}