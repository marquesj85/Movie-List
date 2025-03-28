import { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [count, setCount] = useState(0)
  const [movies, setMovies] = useState([])
  const [showList, setShowList] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')
  const [searchResults, setSearchResults] = useState([])
  const [showResults, setShowResults] = useState(false)

useEffect(() => {
  fetch("http://localhost:3000/movies")
  .then(res => res.json())
  .then(res2 => {
    setMovies(res2)
  })
}, [])

const handleSearch = (s) => {
  s.preventDefault()
  const matches = movies.filter(({title}) =>
    title.toLowerCase().includes(searchTerm.toLowerCase())
)
setSearchResults(matches)
setShowResults(true)
}

  return (
    <>
        <h1>Search Movies</h1>
        <form onSubmit={handleSearch}>
          <input
            type="text"
            placeholder="Search for a movie"
            value={searchTerm}
            onChange={(s) => setSearchTerm(s.target.value)}
            />
            <button type='submit'>Search Movie</button>
        </form>

        {showResults && (
          <ul>
            {searchResults.length > 0 ? (
              searchResults.map(({title}) => (
                <li key={title}>{title}</li>
              ))
            ) : (
              <li>No matching movies.</li>

            )}
          </ul>
        )}

        <h1>Movie List</h1>

        <button onClick = {() => {
          if (showList==false) {
          setShowList(true);
        } else {
          setShowList(false)
        }
        }}>Show Current Movies</button>

        {showList && (
          <ul>
            {movies.map(({title}) => (
              <li key={title}>{title}</li>
            )
          )}
          </ul>
        )}


    </>
  )
}

export default App
