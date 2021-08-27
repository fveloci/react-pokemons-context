import { useEffect, useContext } from "react";
import { useParams } from "react-router";
import Loading from "../../components/Loading";
import PokemonContext  from "../../context/pokemons";
import PokeStats from "./components/PokeStats";
import ErrorMessage from "../../components/ErrorMessage";
import usePokemonsStore from "../../zustand/stores/pokemons";
import shallow from "zustand/shallow";

export default function PokeDetail() {
    const {id} = useParams();  
    //const { getPokemonDetail, pokemonDetail, isLoading, hasError, errorMessage } = useContext(PokemonContext);
    const { getPokemonDetail, pokemonDetail, isLoading, hasError, errorMessage }  = usePokemonsStore(state => ({getPokemonDetail: state.getPokemonDetail, pokemonDetail: state.pokemonDetail, isLoading: state.isLoading, hasError: state.hasError, errorMessage: state.errorMessage}), shallow)
    useEffect(() => {
        /* Get id each time changes */
        getPokemonDetail(id).catch(null)
    }, [])

    if(isLoading) return <Loading title="Loading pokemon..."/>;
    
    return (
        <div>
            {hasError ? 
            
            <ErrorMessage message={errorMessage} /> 
            :
            (
                <>
                    <h3 style={{marginTop: 15}}>Info</h3>
                    <p>{`Nombre: ${pokemonDetail?.name}`}</p>
                    <p>{`Peso: ${pokemonDetail?.weight} kgs.`}</p>
                    <p>{`Altura: ${pokemonDetail?.height} cms.`}</p>
                    <div>
                        <h3 style={{marginTop: 30}}>Habilidades</h3>
                        <PokeStats stats={pokemonDetail?.stats ?? []}/>
                    </div>
                </>
            )
            }
            
            
        </div>
    );
}