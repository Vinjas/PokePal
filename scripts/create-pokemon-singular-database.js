const fs = require('fs');
const originalPokemonList = require('../src/data/pokemon-list-original.json');
const axios = require('axios');
const path = require('path');

function last(array) {
  if (Array.isArray(array) && array.length > 0) {
    return array[array.length - 1];
  }

  return undefined;
}

async function fetchPokemonData(pokemon) {
  const filename = path.join('../src/data/pokemon-full', `${pokemon.name}.json`);

  // Check if the file already exists
  if (fs.existsSync(filename)) {
    console.log(`Pokemon ${pokemon.name} data already exists. Skipping...`);
    return;
  }

  const responsePokemonData = await axios.get(pokemon.url);
  const pokemonData = responsePokemonData.data;

  const responseSpecies = await axios.get(pokemonData.species.url);
  const speciesData = responseSpecies.data;

  const en = speciesData.names.filter(name => name.language.name === 'en');
  const es = speciesData.names.filter(name => name.language.name === 'es');
  const ko = speciesData.names.filter(name => name.language.name === 'ko');
  const ja = speciesData.names.filter(name => name.language.name === 'ja');
  const fr = speciesData.names.filter(name => name.language.name === 'fr');
  const it = speciesData.names.filter(name => name.language.name === 'it');
  const de = speciesData.names.filter(name => name.language.name === 'de');

  const flavorEn = speciesData.flavor_text_entries.filter(
    flavor => flavor.language.name === 'en'
  );
  const flavorEs = speciesData.flavor_text_entries.filter(
    flavor => flavor.language.name === 'es'
  );
  const flavorKo = speciesData.flavor_text_entries.filter(
    flavor => flavor.language.name === 'ko'
  );
  const flavorJa = speciesData.flavor_text_entries.filter(
    flavor => flavor.language.name === 'ja'
  );
  const flavorFr = speciesData.flavor_text_entries.filter(
    flavor => flavor.language.name === 'fr'
  );
  const flavorIt = speciesData.flavor_text_entries.filter(
    flavor => flavor.language.name === 'it'
  );
  const flavorDe = speciesData.flavor_text_entries.filter(
    flavor => flavor.language.name === 'de'
  );

  const generaEn = speciesData.genera.filter(genera => genera.language.name === 'en');
  const generaEs = speciesData.genera.filter(genera => genera.language.name === 'es');
  const generaKo = speciesData.genera.filter(genera => genera.language.name === 'ko');
  const generaJa = speciesData.genera.filter(genera => genera.language.name === 'ja');
  const generaFr = speciesData.genera.filter(genera => genera.language.name === 'fr');
  const generaIt = speciesData.genera.filter(genera => genera.language.name === 'it');
  const generaDe = speciesData.genera.filter(genera => genera.language.name === 'de');

  const getFilteredMoves = () => {
    if (!pokemonData) return [];

    const filteredMovesList = pokemonData.moves.filter(move => {
      let foundLevelUp = false;

      const uniqueDetails = move.version_group_details.reverse().filter(detail => {
        if (detail.move_learn_method.name === 'level-up' && !foundLevelUp) {
          foundLevelUp = true;
          return true;
        }
        return false;
      });

      move.version_group_details = uniqueDetails.reverse();
      return foundLevelUp;
    });

    const filteredSortMovesList = filteredMovesList.sort((a, b) => {
      const levelA = a.version_group_details[0].level_learned_at;
      const levelB = b.version_group_details[0].level_learned_at;
      return levelA - levelB;
    });

    return filteredSortMovesList;
  };

  const extraData = {
    ...pokemon,
    id: pokemonData.id,
    height: pokemonData.height,
    weight: pokemonData.weight,
    training: {
      baseHappiness: speciesData.base_happiness,
      captureRate: speciesData.capture_rate,
      growthRate: speciesData.growth_rate.name,
      baseExperience: pokemonData.base_experience
    },
    breeding: {
      eggGroups: speciesData.egg_groups,
      genderRate: speciesData.gender_rate,
      hatch_counter: speciesData.hatch_counter
    },
    generation: speciesData.generation.name,
    genera: {
      en: last(generaEn)?.genus ?? pokemon.name,
      es: last(generaEs)?.genus ?? pokemon.name,
      ko: last(generaKo)?.genus ?? pokemon.name,
      ja: last(generaJa)?.genus ?? pokemon.name,
      fr: last(generaFr)?.genus ?? pokemon.name,
      it: last(generaIt)?.genus ?? pokemon.name,
      de: last(generaDe)?.genus ?? pokemon.name
    },
    names: {
      en: last(en)?.name ?? pokemon.name,
      es: last(es)?.name ?? pokemon.name,
      ko: last(ko)?.name ?? pokemon.name,
      ja: last(ja)?.name ?? pokemon.name,
      fr: last(fr)?.name ?? pokemon.name,
      it: last(it)?.name ?? pokemon.name,
      de: last(de)?.name ?? pokemon.name
    },
    flavorText: {
      en: last(flavorEn)?.flavor_text ?? '',
      es: last(flavorEs)?.flavor_text ?? '',
      ko: last(flavorKo)?.flavor_text ?? '',
      ja: last(flavorJa)?.flavor_text ?? '',
      fr: last(flavorFr)?.flavor_text ?? '',
      it: last(flavorIt)?.flavor_text ?? '',
      de: last(flavorDe)?.flavor_text ?? ''
    },
    evolutionChain: speciesData.evolution_chain,
    abilities: pokemonData.abilities.map(ability => {
      return {
        name: ability.ability.name,
        url: ability.ability.url
      };
    }),
    moves: getFilteredMoves(),
    type: {
      typePrimary: pokemonData.types[0].type.name,
      typeSecondary: pokemonData.types[1] ? pokemonData.types[1].type.name : null
    },
    sprite: {
      spriteGif:
        pokemonData.sprites.versions['generation-v']['black-white'].animated
          .front_default,
      spriteOfficial: pokemonData.sprites.other['official-artwork'].front_default
    },
    stats: pokemonData.stats.map(stat => {
      return {
        name: stat.stat.name,
        value: stat.base_stat,
        effort: stat.effort
      };
    })
  };

  // Write the extra data to its own file
  fs.writeFileSync(filename, JSON.stringify(extraData), 'utf8');
  console.log(`Pokemon ${extraData.name} id ${extraData.id} data saved to ${filename}`);
}

async function addPokemonData() {
  const allPokemonData = [];

  for (const pokemon of originalPokemonList.results) {
    await fetchPokemonData(pokemon);
    await new Promise(resolve => setTimeout(resolve, 2000));
  }

  // Fetch data from individual files and add it to allPokemonData
  for (const pokemon of originalPokemonList.results) {
    const filename = path.join('../src/data/pokemon-full', `${pokemon.name}.json`);

    if (fs.existsSync(filename)) {
      const data = JSON.parse(fs.readFileSync(filename, 'utf8'));

      allPokemonData.push(data);
    }
  }

  // Write all data to a unique file
  fs.writeFileSync(
    '../src/data/pokemon-list-full.json',
    JSON.stringify(allPokemonData),
    'utf8'
  );
  console.log('All Pokémon data has been saved to pokemon-list-test.json');
}

addPokemonData();
