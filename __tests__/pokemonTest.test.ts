import { gql } from "@apollo/client";
import { PokemonResponse } from "../types/pokemon";
import { GET_POKEMON } from "../graphql/pokemonQueries";
import { client } from '../apolloClient';


const getType = async (name: string): Promise<string[]> => {
  try {
    const result = await client.query<PokemonResponse>({
        query: GET_POKEMON,
        variables: { name: name},
    });

    const pokemon = result.data?.pokemon;

    if (!pokemon) {
      throw new Error(`Not found ${name}`);
    }

    return pokemon.types||[];
  } catch (error) {
    console.error('Error');
    throw error;
  }
};

describe("Pokemon Type", () => {
//Test Bulbasaur
  test("Bulbasaur is Grass type", async () => {
    const bulbasaurType = await getType("Bulbasaur");
    expect(bulbasaurType).toBeDefined();
    expect(bulbasaurType).toContain("Grass");
  });
//Test Charmander
  test("Charmander is Fire type", async () => {
    const charmanderType = await getType("Charmander");
    expect(charmanderType).toBeDefined();
    expect(charmanderType).toContain("Fire");
  });
//Test Squirtle
  test("Squirtle is Water type", async () => {
    const squirtleType = await getType("Squirtle");
    expect(squirtleType).toBeDefined();
    expect(squirtleType).toContain("Water");
  });


});