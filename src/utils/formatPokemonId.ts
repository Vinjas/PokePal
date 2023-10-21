export function formatPokemonId(number: number) {
  if (number >= 1 && number < 1000) {
    return '#' + number.toString().padStart(3, '0');
  } else {
    return '#' + number.toString();
  }
}
