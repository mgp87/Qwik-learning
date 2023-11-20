/* eslint-disable qwik/jsx-img */
import { $, component$ } from "@builder.io/qwik";
import { useNavigate, type DocumentHead } from "@builder.io/qwik-city";
import { PokemonImage } from "~/components/pokemons/pokemon-image";
import { usePokemonGame } from "~/hooks/use-pokemon-game";

export default component$(() => {
  const nav = useNavigate()

  const {
    pokemonId,
    showBackImage,
    isPokemonVisible,
    nextPokemon,
    prevPokemon,
    toggleFromBack,
    toggleVisible,
  } = usePokemonGame()

  const goToPokemon = $((id:number)=>{
    nav(`/pokemon/${id}`)
  })

  return (
    <>
      <span class="text-2xl">Buscador simple</span>
      <span class="text-9xl">{ pokemonId.value }</span>
      <div onClick$={()=>goToPokemon(pokemonId.value)}>
        <PokemonImage
          id = {pokemonId.value}
          size = {200}
          backImage = {showBackImage.value}
          isVisible = {isPokemonVisible.value}
        />
      </div>
      
      <div class="mt-2">
        <button class="btn btn-primary mr-2" onClick$={prevPokemon}>Previous</button>
        <button class="btn btn-primary mr-2" onClick$={nextPokemon}>Next</button>
        <button class="btn btn-primary mr-2" onClick$={toggleFromBack}>Turn</button>
        <button class="btn btn-primary" onClick$={toggleVisible}>Reveal</button>
      </div>

    </>
  );
});

export const head: DocumentHead = {
  title: "PokeQwik",
  meta: [
    {
      name: "description",
      content: "My First Qwik App",
    },
  ],
};
