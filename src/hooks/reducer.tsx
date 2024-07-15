import { useReducer } from "react";
import { PokemonDetails, PokemonDetailsHome } from "../core/entities/pokemon.entities";

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
    
  
  export const dataFetchReducer = (state: State, action: Action): State => {
    switch (action.type) {
      case "FETCH_INIT":
      case 'FETCH_DETAILS_INIT':
        return {
          ...state,
          isLoading: true,
          isError: false,
        };
      case "FETCH_SUCCESS":
        return {
          ...state,
          isLoading: false,
          isError: false,
          data: action.payload,
        };
        case 'FETCH_DETAILS_SUCCESS':
          return {
            ...state,
            isLoading: false,
            isError: false,
            selectedPokemon: action.payload,
          };
      case "FETCH_FAILURE":
        case 'FETCH_DETAILS_FAILURE':
        return {
          ...state,
          isLoading: false,
          isError: true,
        };
      default:
        throw new Error();
    }
  };
  
   export const initialData: State = {
    isLoading: false,
    isError: false,
    data: [],
    selectedPokemon: undefined,
  };
 
