const fs = require('fs');
const originalMovesList = require('../src/data/moves-list-min.json');
const axios = require('axios');
const path = require('path');

function last(array) {
  if (Array.isArray(array) && array.length > 0) {
    return array[array.length - 1];
  }

  return undefined;
}

async function fetchMovesData(move, total) {
  const filename = path.join('../src/data/moves-min', `${move.name}.json`);

  // Check if the file already exists
  if (fs.existsSync(filename)) {
    console.log(`Move ${move.name} data already exists. Skipping...`);
    return;
  }

  const response = await axios.get(move.url);
  const data = response.data;

  const en = data.names.filter(name => name.language.name === 'en');
  const es = data.names.filter(name => name.language.name === 'es');
  const ko = data.names.filter(name => name.language.name === 'ko');
  const ja = data.names.filter(name => name.language.name === 'ja');
  const fr = data.names.filter(name => name.language.name === 'fr');
  const it = data.names.filter(name => name.language.name === 'it');
  const de = data.names.filter(name => name.language.name === 'de');

  const extraData = {
    ...move,
    names: {
      en: last(en)?.name ?? move.name,
      es: last(es)?.name ?? move.name,
      ko: last(ko)?.name ?? move.name,
      ja: last(ja)?.name ?? move.name,
      fr: last(fr)?.name ?? move.name,
      it: last(it)?.name ?? move.name,
      de: last(de)?.name ?? move.name
    }
  };

  // Write the extra data to its own file
  fs.writeFileSync(filename, JSON.stringify(extraData), 'utf8');
  console.log(`Move ${extraData.name} data saved to ${filename}`);
  console.log(`${total - data.id} remaining`);

  console.log('-------------');
}

async function addMovesData() {
  const allMovesData = [];

  for (const move of originalMovesList.results) {
    await fetchMovesData(move, originalMovesList.results.length);
    await new Promise(resolve => setTimeout(resolve, 10));
  }

  // Fetch data from individual files and add it to allPokemonData
  for (const move of originalMovesList.results) {
    const filename = path.join('../src/data/moves-min', `${move.name}.json`);

    if (fs.existsSync(filename)) {
      const data = JSON.parse(fs.readFileSync(filename, 'utf8'));

      allMovesData.push(data);
    }
  }

  // Write all data to a unique file
  fs.writeFileSync(
    '../src/data/moves-list-translated.json',
    JSON.stringify(allMovesData),
    'utf8'
  );
  console.log('All Pokémon data has been saved to pokemon-list-test.json');
}

addMovesData();
