import GameCard from './GameCard'
import Search from './Search'
import '../componentStyles/ProfileStyles.css'
import {useEffect, useState} from 'react'
export default function Profile({user, getUser, search, searchResults, handleSearch, getGames}) {

  const [editProfile, setEditProfile] = useState(false)
  const [userGames, setUserGames] = useState([])
  const [profileData, setProfileData] = useState({
    name: '',
    profile_pic: ''
  })


  // Get all user's games
  useEffect(() => {
    if(user) {
    fetch(`/user/games/${user.id}`)
    .then(resp => resp.json())
    .then(data => setUserGames(data))
    }
  }, [])

  const handleEditProfile = () => setEditProfile(!editProfile)
  const handleProfileData = (e) => {
    setProfileData({...profileData, [e.target.name]:e.target.value})
    console.log(profileData)
  }

  const updateProfile = (e, id, profileData) => {
    const {name, profile_pic} = profileData
    e.preventDefault()

    fetch(`/users/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
         name,
         profile_pic
      })
    })
    .then(resp => resp.json())
    .then(data => console.log(data))
    .then(() => {
      handleEditProfile()
      getUser()
    })
  }
  // const userGameSearch = ()

  return (
    <>
    {user && userGames.length >= 0?
    <>
    <div className="profile-grid">
     
      <div className="user-info">
        
        <div className="card-container">
          {!editProfile ? <img className="profile-pic" src={user.profile_pic}/> 
            : <input type='text' value={profileData.profile_pic} name='profile_pic' className="prof-input-field"
              placeholder="Image URL" 
              onChange={(e) => handleProfileData(e)}/>}
          <div className="profile-details">
            <h1>Username: {user.name}</h1>     
          </div>
          
          {!editProfile ? 
          <button className="edit-profile" onClick={() =>handleEditProfile()}>Edit Profile Picture</button>
          : <button className="edit-profile" onClick={(e) => updateProfile(e, user.id, profileData)}>Save Picture</button>}
        </div>
      </div>
      <div className="user-games"> 
        <div className="card-container">
          <Search search={search} handleSearch={handleSearch} />
          {userGames.map(game => <GameCard key={game.id} game={game} user={user} getGames={getGames}/>)}
        </div>
      </div>
    </div> 
    </>
    : <h1>Loading Profile..</h1>}
    </>
  )
}