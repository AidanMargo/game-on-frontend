import Landing from './Landing'
import NavBar from './NavBar'
import Login from './Login'
import GameContainer from './GameContainer'
import Profile from './Profile'
import {useState, useEffect} from 'react'
import {Routes, Route, useNavigate} from 'react-router-dom'
import '../componentStyles/AppStyles.css'

function App() {

  const navigate = useNavigate()

  // Fetch all games and set to state
  const [games, setGames] = useState([])
  useEffect(() => {
    fetch('/games')
    .then(resp => resp.json())
    .then(data => setGames(data))
  }, [])

  const getGames = () => {
    fetch('/games')
    .then(resp => resp.json())
    .then(data => setGames(data))
  }


  // Set Current User
  const [user, setUser] = useState(null)
  useEffect(() => {
    fetch("/me").then((response) => {
      if (response.ok) {
        response.json()
        .then(user => setUser(user))
      }
    });
  }, []);

  const getUser = () => {
    fetch("/me").then((response) => {
      if (response.ok) {
        response.json()
        .then(user => setUser(user))
      }
    })
  }

  // Handle Search function
  const [search, setSearch] = useState('')
  const handleSearch = (e) => setSearch(e.target.value)
  const searchByNameResults = () => {
    if (search.length > 0 && user) {
      return games.filter(game => game.name.toLowerCase().includes(search.toLowerCase()) 
      || game.location.toLowerCase().includes(search.toLowerCase()))
    } else {
      return games
    }
  }

  // Logout
  const logOut = (e) => {
    fetch('/logout', {
      method: "DELETE",
      headers: {
        "Content-Type": 'application/json'
      },
    })
    .then(setUser(null))
  }

  return (
    <div className="App">
        <NavBar logOut={logOut} user={user}/>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path='/login' element={<Login setUser={setUser}/>} />
          <Route path='/home' element={<GameContainer user={user} setGames={setGames} games={games} search={search} handleSearch={handleSearch}
            searchResults={searchByNameResults} getGames={getGames} />} />
          <Route path='/profile' element={<Profile user={user} search={search} handleSearch={handleSearch} searchResults={searchByNameResults}
            getGames={getGames} getUser={getUser}/>} />
        </Routes>
    </div>
  );
}

export default App;
