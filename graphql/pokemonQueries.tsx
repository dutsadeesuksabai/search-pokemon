import { gql } from '@apollo/client';

export const GET_POKEMON = gql`
query pokemon($id: String, $name: String){
  pokemon(id: $id, name: $name){
    id
    number
    name
    weight{
      minimum
      maximum
    }
    height{
      minimum
      maximum
    }
    classification
    types
    resistant
    weaknesses
    fleeRate
    maxCP
    maxHP
    image

  }
}
`;

export const GET_POKEMON_EVO = gql`
  query PokemonEvolutions($id: String, $name: String) {
    pokemon(id: $id, name: $name) {
      id
      name
      evolutions {
        id
        number
        name
        classification
        types
        resistant
        weaknesses
        fleeRate
        maxCP
        maxHP
        image
        evolutions {
          id
          number
          name
          classification
          types
          resistant
          weaknesses
          fleeRate
          maxCP
          maxHP
          image
        }
      }
    }
  }
`;