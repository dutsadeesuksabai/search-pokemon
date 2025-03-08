export interface PokemonEvolution {
  id: string;
  number: string;
  name: string;
  classification: string;
  types: string[];
  resistant: string[];
  weaknesses: string[];
  fleeRate: number;
  maxCP: number;
  maxHP: number;
  image: string;
  evolutions?: PokemonEvolution[] 
}
  export interface PokemonEvolutionsResponse {
    pokemon: {
      id: string;
      name: string;
      evolutions?: PokemonEvolution[];
    };
  }