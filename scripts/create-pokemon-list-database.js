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
  const filename = path.join('../src/data/pokemon-min', `${pokemon.name}.json`);

  // Check if the file already exists
  if (fs.existsSync(filename)) {
    console.log(`Pokemon ${pokemon.name} data already exists. Skipping...`);
    return;
  }

  const response = await axios.get(pokemon.url);
  const data = response.data;

  const responseSpecies = await axios.get(data.species.url);
  const speciesData = responseSpecies.data;

  const en = speciesData.names.filter(name => name.language.name === 'en');
  const es = speciesData.names.filter(name => name.language.name === 'es');
  const ko = speciesData.names.filter(name => name.language.name === 'ko');
  const ja = speciesData.names.filter(name => name.language.name === 'ja');
  const fr = speciesData.names.filter(name => name.language.name === 'fr');
  const it = speciesData.names.filter(name => name.language.name === 'it');
  const de = speciesData.names.filter(name => name.language.name === 'de');

  const extraData = {
    ...pokemon,
    id: data.id,
    names: {
      en: last(en)?.name ?? pokemon.name,
      es: last(es)?.name ?? pokemon.name,
      ko: last(ko)?.name ?? pokemon.name,
      ja: last(ja)?.name ?? pokemon.name,
      fr: last(fr)?.name ?? pokemon.name,
      it: last(it)?.name ?? pokemon.name,
      de: last(de)?.name ?? pokemon.name
    },
    type: {
      typePrimary: data.types[0].type.name,
      typeSecondary: data.types[1] ? data.types[1].type.name : null
    },
    sprite: {
      spriteGif:
        data.sprites.versions['generation-v']['black-white'].animated.front_default,
      spriteOfficial: data.sprites.other['official-artwork'].front_default
    },
    generation: speciesData.generation.name,
    stats: data.stats.map(stat => {
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
    await new Promise(resolve => setTimeout(resolve, 10));
  }

  // Fetch data from individual files and add it to allPokemonData
  for (const pokemon of originalPokemonList.results) {
    const filename = path.join('../src/data/pokemon-min', `${pokemon.name}.json`);

    if (fs.existsSync(filename)) {
      const data = JSON.parse(fs.readFileSync(filename, 'utf8'));

      allPokemonData.push(data);
    }
  }

  // Write all data to a unique file
  fs.writeFileSync(
    '../src/data/pokemon-list-min.json',
    JSON.stringify(allPokemonData),
    'utf8'
  );
  console.log('All Pokémon data has been saved to pokemon-list-test.json');
}

addPokemonData();
