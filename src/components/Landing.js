import '../componentStyles/LandingStyles.css'




export default function Landing() {
  return (
    <div className="landing">
      <div className = "about-game-on">
        <h3>Game On's Mission:</h3>
        <p>
          Game On was made with adults who love play in mind.  In adulthood it grows harder and harder to form meaningful
          conections and make new friends. With this often comes a lack of social contact and exercise. Game On is committed
          forming and maintaining conections through the medium of sport.  Pickup games and club sports were an important 
          part of our childhood, and helped make us who we are now. We think that these activities are still important to 
          many adults. If you think like us, get out there, and get your game on!
        </p>
      </div>


      <footer className = "landing-footer">
        <p>Game On is made possible by adds, sorry about this.  Game On is commited to personal privacy, and though
          some data is collected to aid in advertising, none of this data is tied to your identity and no location 
          or sales data is colected outside of what you have chosen to include in your profile. 
        </p>
        <p>Game On is also commited to providing a safe, competative environment for all individuals.</p>
      </footer>
    </div>
  )
}