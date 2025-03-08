'use client';

import Image from 'next/image';
import { memo, useCallback, useEffect, useMemo, useState } from 'react';
import { useQuery } from '@apollo/client';
import { GET_POKEMON, GET_POKEMON_EVO } from '../graphql/pokemonQueries';
import { Pokemon,PokemonResponse } from '../types/pokemon';
import { PokemonEvolution, PokemonEvolutionsResponse } from '../types/pokemonEvo';
import {  useRouter, usePathname } from 'next/navigation';
import { TbSwords } from 'react-icons/tb';
import { GiHealthNormal } from 'react-icons/gi';
import { CiRuler } from "react-icons/ci";
import { MdMonitorWeight } from 'react-icons/md';
import { MdCatchingPokemon } from "react-icons/md";

export default function Home() {
  const pathname = usePathname();
  const router = useRouter();

  const [search, setSearch] = useState('');
  const [pokemonName, setPokemonName] = useState('');
  const [pokemonDetail, setPokemonDetail] = useState<Pokemon | null>(null);
  const [pokemonEvo, setPokemonEvo] = useState<PokemonEvolution[] | null>(null);


  useEffect(() => {
    const url = new URL(window.location.href);
    const name = url.searchParams.get('name')?.toLowerCase() || '';
    setPokemonName(name);
    setSearch(name);
  }, [pathname]);

  const { data: pokemonData, loading: pokemonLoading, error: pokemonError } = useQuery<PokemonResponse>(
    GET_POKEMON,
    {
      variables: { name: pokemonName },
      skip: !pokemonName,
    }
  );


  const { data: evoData, loading: evoLoading, error: evoError } = useQuery<PokemonEvolutionsResponse>(
    GET_POKEMON_EVO,
    {
      variables: { name: pokemonName },
      skip: !pokemonName,
    }
  );

  //Get Pokemon
  useEffect(() => {
    if (pokemonData?.pokemon) {
      setPokemonDetail(pokemonData.pokemon);
    }else{
      setPokemonDetail(null)
    }
  }, [pokemonData]);

  //Get EVO
  useEffect(() => {
    if (evoData?.pokemon?.evolutions) {
      console.log(evoData.pokemon.evolutions)
      setPokemonEvo(evoData.pokemon.evolutions);
    }else{
      setPokemonEvo([]);
    }
  }, [evoData]);

  const handleSearch = useCallback((e: React.FormEvent) => {
    e.preventDefault();
    if (search.trim()) {
      router.push(`/?name=${search}`);
    }
  },[search, router]);

  //Get สีจากธาตุ
  const getTypeColor = useMemo(() => {
    const colors: { [key: string]: string } = {
      normal: "bg-gray-400",
      fire: "bg-red-500",
      water: "bg-blue-500",
      electric: "bg-yellow-400",
      grass: "bg-green-500",
      ice: "bg-blue-300",
      fighting: "bg-red-700",
      poison: "bg-purple-500",
      ground: "bg-yellow-600",
      flying: "bg-indigo-400",
      psychic: "bg-pink-500",
      bug: "bg-lime-500",
      rock: "bg-yellow-800",
      ghost: "bg-purple-700",
      dragon: "bg-indigo-700",
      dark: "bg-gray-700",
      steel: "bg-gray-500",
      fairy: "bg-pink-300",
    };
    
    return (type: string) => colors[type.toLowerCase()] || "bg-gray-400";
  }, []); 


  const EvolutionComponent = ({ evo }: { evo: PokemonEvolution }) => {
    return (
      <>
        <div 
          className="cursor-pointer p-2 hover:bg-gray-100 duration-300 transition ease-in"
          onClick={() => router.push(`/?name=${evo.name}`)}
        >
          <p className='font-bold text-center'>{evo.name}</p>
          <div className="relative h-40">
            <Image
              src={evo.image}
              className="rounded"
              fill
              alt={evo.name}
              style={{ objectFit: 'contain' }}
            />
          </div>
        </div>
      </>
    );
  };

  //ทำ Skeleton Loading
  const SkeletonLoader = memo(()=> {
    return(
      <div className="space-y-4 p-4 relative">
      <div className="flex justify-center space-x-2">
        <div className="h-6 w-16 bg-gray-300 rounded-full animate-pulse"></div>
        <div className="h-6 w-16 bg-gray-300 rounded-full animate-pulse"></div>
      </div>
      <div className="relative h-60 w-full bg-gray-300 rounded animate-pulse"></div>
      <div className="space-y-2">
        <div className="flex space-x-2">
          <div className="h-8 w-32 bg-gray-300 rounded animate-pulse"></div>
          <div className="h-6 w-12 bg-gray-300 rounded animate-pulse"></div>
        </div>
        <div className="h-4 w-48 bg-gray-300 rounded animate-pulse"></div>
      </div>
      <div className="space-y-2">
        <div className="h-6 w-24 bg-gray-300 rounded animate-pulse"></div>
        <div className="h-6 w-32 bg-gray-300 rounded animate-pulse"></div>
        <div className="h-6 w-32 bg-gray-300 rounded animate-pulse"></div>
        <div className="h-6 w-48 bg-gray-300 rounded animate-pulse"></div>
        <div className="h-6 w-48 bg-gray-300 rounded animate-pulse"></div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <div className="h-6 w-20 bg-gray-300 rounded animate-pulse"></div>
          <div className="flex gap-2">
            <div className="h-6 w-16 bg-gray-300 rounded animate-pulse"></div>
            <div className="h-6 w-16 bg-gray-300 rounded animate-pulse"></div>
          </div>
        </div>
        <div className="space-y-2">
          <div className="h-6 w-20 bg-gray-300 rounded animate-pulse"></div>
          <div className="flex gap-2">
            <div className="h-6 w-16 bg-gray-300 rounded animate-pulse"></div>
            <div className="h-6 w-16 bg-gray-300 rounded animate-pulse"></div>
          </div>
        </div>
      </div>
      <div className="space-y-2">
        <div className="h-6 w-32 bg-gray-300 rounded animate-pulse"></div>
        <div className="grid grid-cols-3 gap-2">
          <div className="space-y-2">
            <div className="h-4 w-20 bg-gray-300 rounded animate-pulse mx-auto"></div>
            <div className="h-40 w-full bg-gray-300 rounded animate-pulse"></div>
          </div>
          <div className="space-y-2">
            <div className="h-4 w-20 bg-gray-300 rounded animate-pulse mx-auto"></div>
            <div className="h-40 w-full bg-gray-300 rounded animate-pulse"></div>
          </div>
        </div>
      </div>
    </div>
    )
  });

  SkeletonLoader.displayName = 'SkeletonLoader';




  return (
        <div className="w-full min-h-screen">
          <div className="max-w-4xl mx-auto">
            <div className="py-4">
              <form onSubmit={handleSearch} className="flex space-x-2 w-full">
                <div className="relative w-full">
                  <label htmlFor="pokemonSearch" className="sr-only"> Search Pokemon</label>
                  <input
                    id="pokemonSearch"
                    placeholder="Pokemon Name..."
                    className="w-full p-3 pl-10 bg-transparent border border-neutral-500  text-sm rounded-lg focus:ring-2  outline-none"
                    type="text"
                    name="pokemonName"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    required
                  />
                </div>
                <button
                  type="submit"
                  className="px-6 py-2.5 bg-red-500 text-white rounded-lg shadow-lg transition-all hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-400 cursor-pointer"
                >
                  Search
                </button>
              </form>
            </div>
    
            <div className="w-full flex justify-center items-center">
              <div className="bg-white h-full w-full rounded p-2 outline-4 outline-gray-600">
                {pokemonLoading || evoLoading ? (
                  <>
                  <div className="flex justify-center">
                    <div className="bg-gray-800 bg-opacity-75 p-4 rounded-lg text-white flex items-center space-x-2">
                      <MdCatchingPokemon className="animate-spin h-6 w-6" />
                      <span>Searching for Pokémon...</span>
                    </div>
                  </div>
                  <SkeletonLoader />
    
                </>
                ) : pokemonError || evoError ? (
                  <>
                  <div className="flex justify-center">
                      <div className="bg-red-600 bg-opacity-90 p-4 rounded-lg text-white max-w-md text-center">
                        Error: {(pokemonError || evoError)?.message}
                      </div>
                  </div>
                    <SkeletonLoader />
            
                  </>
                ) : pokemonDetail ? (
                  <div className="space-y-2">
                    <div className="flex justify-center py-2 space-x-2">
                      {pokemonDetail.types.map((type) => (
                        <span
                          key={type}
                          className={`${getTypeColor(type.toLowerCase())} text-white px-3 py-1 rounded-full text-sm font-medium`}
                        >
                          {type}
                        </span>
                      ))}
                    </div>
                    <div className="relative h-60">
                      <Image
                        className="rounded"
                        src={pokemonDetail.image}
                        fill
                        style={{ objectFit: 'contain' }}
                        alt={pokemonDetail.name}
                      />
                    </div>
                    <div className="space-x-2 flex items-center">
                      <div>
                        <div className="flex space-x-2 items-center">
                          <div className="font-bold text-xl">{pokemonDetail.name}</div>
                          <div className="font-light text-gray-500 text-sm">#{pokemonDetail.number}</div>
                        </div>
                        <div className="font-light text-sm">{pokemonDetail.classification}</div>
                      </div>
                    </div>
    
                    <div>
                      <div className="space-y-2 py-2">
                        <div className="font-bold text-xl">Stats</div>
                        <div className="flex items-center space-x-2">
                          <GiHealthNormal />
                          <div>{pokemonDetail.maxHP}</div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <TbSwords />
                          <div>{pokemonDetail.maxCP}</div>
                        </div>
                        <div className="space-x-2 flex items-center">
                          <CiRuler />
                          <div className="flex space-x-2">
                            <div>Min: {pokemonDetail.height.minimum}</div>
                            <div>Max: {pokemonDetail.height.maximum}</div>
                          </div>
                        </div>
                        <div className="space-x-2 flex items-center">
                          <MdMonitorWeight />
                          <div className="flex space-x-2">
                            <div>Min: {pokemonDetail.weight.minimum}</div>
                            <div>Max: {pokemonDetail.weight.maximum}</div>
                          </div>
                        </div>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="p-2 bg-white/90 outline-gray-400 outline-2 rounded">
                          <h3 className="font-medium mb-2 underline">Weak</h3>
                          <div className="flex flex-wrap gap-2 p-2">
                            {pokemonDetail.weaknesses.map((weak) => (
                              <span
                                key={weak}
                                className={`${getTypeColor(weak.toLowerCase())} text-white px-2 py-1 rounded text-sm`}
                              >
                                {weak}
                              </span>
                            ))}
                            {pokemonDetail.weaknesses.length === 0 && (
                              <span className="text-gray-500 text-sm">None</span>
                            )}
                          </div>
                        </div>

                        <div className="p-2 bg-white/90 outline-gray-400 outline-2 rounded">
                          <h3 className="font-medium mb-2 underline">Resist</h3>
                          <div className="flex flex-wrap gap-2 p-2">
                            {pokemonDetail.resistant.map((resist) => (
                              <span
                                key={resist}
                                className={`${getTypeColor(resist.toLowerCase())} text-white px-2 py-1 rounded text-sm`}
                              >
                                {resist}
                              </span>
                            ))}
                            {pokemonDetail.resistant.length === 0 && (
                              <span className="text-gray-500 text-sm">None</span>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
    
                    <div className="p-2">
                      {pokemonEvo && pokemonEvo.length > 0 ? 
                        <div className="mt-4">
                          <h3 className="font-semibold">Next Evolutions:</h3>
                          <div className="grid grid-cols-3 gap-2">
                            {pokemonEvo.map((data) => (
                              <EvolutionComponent key={data.name} evo={data}  />
                            ))}
                          </div>
                        </div>
                        :
                        <>
                          <div className="space-y-2">
                            <div className="h-6 w-full text-md rounded font-semibold ">
                              None of Next Evolution
                            </div>
                            <div className="grid grid-cols-3 gap-2">
                              <div className="space-y-2">
                                <div className="h-4 w-20 bg-gray-300 rounded  mx-auto"></div>
                                <div className="h-40 w-full bg-gray-300 rounded "></div>
                              </div>
                            </div>
                          </div>
                        </>
                      }
                      
                    </div>
                  </div>
                ) : (
                  <>
                    {
                      pokemonName ?
                      <>
                        <div className="flex justify-center">
                          <div className='bg-red-600 bg-opacity-90 p-4 rounded-lg text-white  text-center '>
                              No Pokémon data available.
                          </div>
                        </div>
                        <SkeletonLoader />
                      </>
                      :
                      <>
                        <div className="flex justify-center">
                          <div className=' p-4 rounded-lg  font-bold text-xl text-center '>
                            Go Search Your Pokemon!
                          </div>
                        </div>
                      <SkeletonLoader />
                      </>
                    }


                  </>
                )}
              </div>
            </div>
          </div>
        </div>
  );
}