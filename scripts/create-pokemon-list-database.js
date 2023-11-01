const fs = require('fs');
const originalPokemonList = require('../src/data/pokemon-list.json');
const axios = require('axios');
const path = require('path');

async function fetchPokemonData(pokemon) {
  const filename = path.join('pokemon-data', `${pokemon.name}.json`);

  // Check if the file already exists
  if (fs.existsSync(filename)) {
    console.log(`Pokemon ${pokemon.name} data already exists. Skipping...`);
    return;
  }

  const response = await axios.get(pokemon.url);
  const data = response.data;

  const extraData = {
    ...pokemon,
    id: data.id,
    typePrimary: data.types[0].type.name,
    typeSecondary: data.types[1] ? data.types[1].type.name : null,
    spriteGif:
      data.sprites.versions['generation-v']['black-white'].animated.front_default,
    spriteOfficial: data.sprites.other['official-artwork'].front_default,
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
    await new Promise(resolve => setTimeout(resolve, 2000));
  }

  // Fetch data from individual files and add it to allPokemonData
  for (const pokemon of originalPokemonList.results) {
    const filename = path.join('pokemon-data', `${pokemon.name}.json`);

    if (fs.existsSync(filename)) {
      const data = JSON.parse(fs.readFileSync(filename, 'utf8'));

      allPokemonData.push(data);
    }
  }

  // Write all data to a unique file
  fs.writeFileSync('pokemon-list-test.json', JSON.stringify(allPokemonData), 'utf8');
  console.log('All Pokémon data has been saved to pokemon-list-test.json');
}

addPokemonData();
