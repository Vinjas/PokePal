export function formatPokemonName(inputString: string) {
  const words = inputString.split('-');

  const capitalizedWords = words.map(word => {
    return word.charAt(0).toUpperCase() + word.slice(1);
  });

  const resultString = capitalizedWords.join(' ');

  return resultString;
}
