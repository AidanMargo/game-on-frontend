import Landing from './Landing'
import NavBar from './NavBar'
import Login from './Login'
import GameContainer from './GameContainer'
import {useState} from 'react'
import {Routes, Route, useNavigate} from 'react-router-dom'
import '../componentStyles/AppStyles.css'

function App() {

  const [loggedIn, setLoggedIn] = useState(false)
  const navigate = useNavigate()

  const logOut = (e) => {
    fetch('/me', {
      method: "DELETE",
      headers: {
        "Content-Type": 'application/json'
      },
    })
    .then(resp => resp.json())
    
    setLoggedIn(!loggedIn)
    navigate('/')
  }

  return (
    <div className="App">
        <NavBar loggedIn={loggedIn} setLoggedIn={setLoggedIn} logOut={logOut}/>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path='/login' element={<Login />} />
          <Route path='/home' element={<GameContainer />} />
        </Routes>
    </div>
  );
}

export default App;
