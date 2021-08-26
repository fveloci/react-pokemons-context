import { useContext, useEffect } from "react";
import Loading from "../../components/Loading";
import ErrorMessage from "../../components/ErrorMessage";
import PokemonContext from "../../context/pokemons";
import PokemonList from "./components/PokemonList";

export default function Home() {
    const {getPokemons, pokemons, isLoading, hasError, errorMessage} = useContext(PokemonContext);
    
    useEffect(() => {
        getPokemons().catch(null)    
    }, [])

    if(isLoading) return <Loading title="Loading pokemons..."/>; 
    
    return (
        <>            
            {hasError ? 
            <ErrorMessage message={errorMessage}/>
            : 
            <PokemonList pokemons={pokemons}/>}
        </>
        
    );
}