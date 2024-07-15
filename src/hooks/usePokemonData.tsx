import { useCallback, useEffect, useReducer } from "react";
import { dataFetchReducer, initialData } from "./reducer";

const usePokemonData = () => {
  const [state, dispatch] = useReducer(dataFetchReducer, initialData);

  const fetchPokemonsList = useCallback(async () => {
    dispatch({ type: "FETCH_INIT" });
    try {
      const response = await fetch("https://pokeapi.co/api/v2/pokemon?offset=20&limit=20");
      const data = await response.json();
      const detailedPokemonList = await Promise.all(
        data?.results?.map(async (pokemon: { name: string; url: string }) => {
          const pokemonResponse = await fetch(pokemon.url);
          const pokemonData = await pokemonResponse.json();
          return {
            name: pokemonData.name,
            image: pokemonData.sprites.other["official-artwork"].front_default,
            id: pokemonData.id,
          };
        })
      );
      dispatch({ type: "FETCH_SUCCESS", payload: detailedPokemonList });
    } catch (error) {
      console.log(error);
      dispatch({ type: "FETCH_FAILURE" });
    }
  }, []);

  const fetchPokemonDetails = async (id: string) => {
    dispatch({ type: "FETCH_DETAILS_INIT" });
    try {
      const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
      if (!response.ok) throw new Error(`Error: ${response.status}`);
      const data = await response.json();
      dispatch({ type: "FETCH_DETAILS_SUCCESS", payload: data });
    } catch (error) {
      console.log(error);
      dispatch({ type: "FETCH_DETAILS_FAILURE" });
    }
  };

  useEffect(() => {
    fetchPokemonsList();
  }, [fetchPokemonsList]);

  return {
    state,
    fetchPokemonDetails,
  };
};

export default usePokemonData;
