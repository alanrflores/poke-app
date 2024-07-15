export type Pokemon = {
    name: string;
    url: string;
  };
  
  export type PokemonDetailsHome = {
    id: string;
    name: string;
    image: string;
  };


type PokemonType = {
    slot: number;
    type: {
      name: string;
      url: string;
    };
  };
  
  export interface PokemonDetails {
    name: string;
    sprites: {
      other: {
        dream_world: {
          front_default: string;
        };
      };
    };
    types: PokemonType[];
    weight: number;
  }
  