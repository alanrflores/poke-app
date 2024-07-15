import { useReducer } from "react";
import { PokemonDetails, PokemonDetailsHome } from "../core/types/pokemon.entities";

interface State {
    isLoading: boolean;
    isError: boolean;
    data: PokemonDetailsHome[];
    selectedPokemon: PokemonDetails | undefined;
  };

  type Action =
    | { type: "FETCH_INIT" }
    | { type: "FETCH_SUCCESS", payload: PokemonDetailsHome[] }
    | { type: "FETCH_FAILURE" }
    | { type: 'FETCH_DETAILS_INIT' }
    | { type: 'FETCH_DETAILS_SUCCESS', payload: PokemonDetails }
    | { type: 'FETCH_DETAILS_FAILURE' }

    export const initialData: State = {
      isLoading: false,
      isError: false,
      data: [],
      selectedPokemon: undefined,
    };
   
    
   export const dataFetchReducer = (state: State, action: Action) => {
      switch (action.type) {
        case "FETCH_INIT":
          return { ...state, isLoading: true, isError: false };
        case "FETCH_SUCCESS":
          return { ...state, isLoading: false, data: action.payload };
        case "FETCH_FAILURE":
          return { ...state, isLoading: false, isError: true };
        case "FETCH_DETAILS_INIT":
          return { ...state, isLoading: true }; 
        case "FETCH_DETAILS_SUCCESS":
          return { ...state, isLoading: false, selectedPokemon: action.payload };
        case "FETCH_DETAILS_FAILURE":
          return { ...state, isLoading: false, isError: true };
        default:
          throw new Error();
      }
    };
  
  
