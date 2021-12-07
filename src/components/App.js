import Landing from './Landing'
import NavBar from './NavBar'
import Login from './Login'
import GameContainer from './GameContainer'
import {useState, useEffect} from 'react'
import {Routes, Route, useNavigate} from 'react-router-dom'
import '../componentStyles/AppStyles.css'

function App() {

  const [loggedIn, setLoggedIn] = useState(false)
  const navigate = useNavigate()


  const [user, setUser] = useState(null)
  useEffect(() => {
    fetch("/me").then((response) => {
      if (response.ok) {
        response.json()
        .then(user => setUser(user))
        .then(navigate('/home'))
      }
    });
  }, []);

  const logOut = (e) => {
    fetch('/logout', {
      method: "DELETE",
      headers: {
        "Content-Type": 'application/json'
      },
    })
    .then(setUser(null))
    .then(console.log('user: ', user))
    // navigate('/')
  }

  return (
    <div className="App">
        <NavBar loggedIn={loggedIn} setLoggedIn={setLoggedIn} logOut={logOut} user={user}/>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path='/login' element={<Login setUser={setUser}/>} />
          <Route path='/home' element={<GameContainer user={user}/>} />
        </Routes>
    </div>
  );
}

export default App;
