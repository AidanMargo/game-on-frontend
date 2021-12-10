import '../componentStyles/SearchStyles.css'

export default function Search ({search, handleSearch }) {
  return (
    <div className="searches">
      <input type="text" value={search} placeholder="Search for a game" onChange={(e) => handleSearch(e)}/>
    </div>
  )
}