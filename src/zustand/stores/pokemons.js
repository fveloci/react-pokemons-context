import create from "zustand";
import apiCall from "../../api";

const usePokemonsStore = create((set, get) => ({
    getPokemons: async () => {
        try {
            set({isLoading: true, hasError: false, errorMessage: ""})
            const pokemonResult = await apiCall({
                url: "https://pokeapi.co/api/v2/pokemon?limit=100"
            });
            set({pokemons: pokemonResult.results})
        } catch (error) {
            set({ pokemons: [], hasError: true, errorMessage: ""})
        } finally {
            set({isLoading: false})
        }
    }, 
    pokemons: [], 
    getPokemonDetail: async (id) => {
        if(!id) return;
        try {
            set({isLoading: true, hasError: false, errorMessage: ""})
            const pokemonDetail = await apiCall({
                url: `https://pokeapi.co/api/v2/pokemon/${id}`
            });
            set({pokemonDetail})
        } catch (error) {
            set({pokemonDetail: [], hasError: true, errorMessage: "Something went wrong"})
        } finally {
            set({isLoading: false})
        }
    },
    pokemonDetail: {},
    isLoading: false,
    errorMessage: "",
    hasError: false
})); 

export default usePokemonsStore;
/*
    
*/