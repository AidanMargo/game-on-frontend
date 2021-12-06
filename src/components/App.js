import Landing from './Landing'
import NavBar from './NavBar'
import Login from './Login'
import GameCard from './GameCard'
import {BrowserRouter, Routes, Route,} from 'react-router-dom'
import '../componentStyles/AppStyles.css'

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <NavBar />
        <GameCard />
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path='/login' element={<Login />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
