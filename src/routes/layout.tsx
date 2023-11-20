import { component$, Slot, useStyles$ } from "@builder.io/qwik";
import type { RequestHandler } from "@builder.io/qwik-city";

import styles from "./styles.css?inline";

export const onGet: RequestHandler = async ({ cacheControl }) => {
  // Control caching for this request for best performance and to reduce hosting costs:
  // https://qwik.builder.io/docs/caching/
  cacheControl({
    // Always serve a cached response by default, up to a week stale
    staleWhileRevalidate: 60 * 60 * 24 * 7,
    // Max once every 5 seconds, revalidate on the server to get a fresh version of this page
    maxAge: 5,
  });
};

export default component$(() => {
  useStyles$(styles);

  // const pokemonGame = useStore<PokemonGameState>({
  //   pokemonId:4,
  //   isPokemonVisible:true,
  //   showBackImage:false,
  // })

  // const pokemonList = useStore<PokemonListState>({
  //   currentPage:1,
  //   isLoading:false,
  //   pokemons:[],
  // })

  // useContextProvider(PokemonGameContext, pokemonGame)
  // useContextProvider(PokemonListContext, pokemonList)

  return (
    <Slot/>
  );
});
