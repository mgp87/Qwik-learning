import { Slot, component$, useContextProvider, useStore, useVisibleTask$ } from '@builder.io/qwik';
import type { PokemonListState } from './pokemon-list.context';
import { PokemonListContext } from './pokemon-list.context';
import type { PokemonGameState } from './pokemon-game.context';
import { PokemonGameContext } from './pokemon-game.context';

export const PokemonProvider = component$(() => {

    const pokemonGame = useStore<PokemonGameState>({
        pokemonId:4,
        isPokemonVisible:true,
        showBackImage:false,
    })
    
    const pokemonList = useStore<PokemonListState>({
        currentPage:1,
        isLoading:false,
        pokemons:[],
    })
    
    useContextProvider(PokemonGameContext, pokemonGame)
    useContextProvider(PokemonListContext, pokemonList)

    useVisibleTask$(()=>{
        if(localStorage.getItem('pokemon-game')){
            const {
                isPokemonVisible = true,
                pokemonId = 10,
                showBackImage = false
            } = JSON.parse(localStorage.getItem('pokemon-game')!) as PokemonGameState
            pokemonGame.isPokemonVisible = isPokemonVisible
            pokemonGame.showBackImage = showBackImage
            pokemonGame.pokemonId = pokemonId
        }
    })

    useVisibleTask$(({track})=>{
        track(()=>[pokemonGame.isPokemonVisible, pokemonGame.pokemonId, pokemonGame.showBackImage])
        localStorage.setItem('pokemon-game', JSON.stringify(pokemonGame))
    })

    return (
        <Slot/>
    )
});

