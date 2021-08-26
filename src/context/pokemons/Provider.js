import PokemonContext from ".";
import apiCall from "../../api";
import { useState } from "react";

export default function PokemonProvider({children}) {
    const [pokemons, setPokemons] = useState([])
    const [pokemonDetail, setPokemonDetail] = useState({})
    const [isLoading, setIsLoading] = useState(false)
    const [hasError, setHasError] = useState(false)
    const [errorMessage, setErrorMessage] = useState("")

    const getPokemons = async () => {
        try {
            setIsLoading(true)
            setHasError(false)
            setErrorMessage("")
            const pokemonResult = await apiCall({
                url: "https://pokeapi.co/api/v2/pokemon?limit=100"
            })
            setPokemons(pokemonResult.results)
        } catch (error) {
            setPokemons([])
            setHasError(true)
            setErrorMessage("Something went wrong")
        } finally {
            setIsLoading(false)
        }
    }

    const getPokemonDetail = async (id) => {
        if(!id) Promise.reject("ID is required")
        try {
            setIsLoading(true)
            setHasError(false)
            setErrorMessage("")
            const pokemonDetail = await apiCall({
                url: `https://pokeapi.co/api/v2/pokemon/${id}`
            })
            setPokemonDetail(pokemonDetail)
        } catch (error) {
            setPokemonDetail({})
            setHasError(true)
            setErrorMessage("Something went wrong")
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <PokemonContext.Provider value={{ 
            getPokemons, 
            pokemons, 
            getPokemonDetail,
            pokemonDetail,
            isLoading,
            errorMessage,
            hasError 
            }}>
            {children}
        </PokemonContext.Provider>
    );
}