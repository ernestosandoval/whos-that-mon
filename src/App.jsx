import { useState, useEffect } from 'react'
import './App.css'
import Pokemon from './Pokemon'
import axios from 'axios'
import Refresh from './Refresh'

function App() {
  const [pokemon, setPokemon] = useState({})
  const [currentPageUrl, setCurrentPageUrl] = useState(generateRandomPokemonUrl())
  const [loading, setLoading] = useState(true)

  // State to manage the user's input and result
  const [userInput, setUserInput] = useState("");
  const [result, setResult] = useState("");

  useEffect(() => {
    setLoading(true)
    let cancel

    axios.get(currentPageUrl, {
      cancelToken: new axios.CancelToken(c => cancel = c)
    }).then(res => {
      setLoading(false)
      setPokemon(res.data)
    });

    return () => cancel()
  }, [currentPageUrl])

  function refresh() {
    const randomPokemonId = Math.floor(Math.random() * 1017) + 1;
    setCurrentPageUrl(`https://pokeapi.co/api/v2/pokemon-species/${randomPokemonId}/`);
  }

  function generateRandomPokemonUrl() {
    const randomPokemonId = Math.floor(Math.random() * 1017) + 1;
    return `https://pokeapi.co/api/v2/pokemon-species/${randomPokemonId}/`;
  }

  if (loading) return "Loading..."

  return (
    <>
      <Pokemon pokemon={pokemon} />
      <Refresh refresh={refresh} />
    </>
  )
}

export default App
