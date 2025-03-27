import { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [count, setCount] = useState(0)
  const [movies, setMovies] = useState([])

useEffect(() => {
  fetch("http://localhost:3000/movies")
  .then(res => res.json())
  .then(res2 => {
    setMovies(res2)
  })
}, [])

  // [
  //   {title: 'Mean Girls'},
  //   {title: 'Hackers'},
  //   {title: 'The Grey'},
  //   {title: 'Sunshine'},
  //   {title: 'Ex Machina'},
  // ]


const list = () => {
  return (
    <ul>
    {movies.map(({title}) => (
        <li key={title}>{`${title}`}</li>
    ))}
            </ul>
  )
};
  return (
    <>

        <h1>Movie List</h1>
        {list()}

    </>
  )
}

export default App
