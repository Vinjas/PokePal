export function calculateHeight(decimeters: string) {
  const decimetersNumber = parseFloat(decimeters);

  if (isNaN(decimetersNumber)) {
    return { meters: '0', feet: 0, inches: 0 };
  }

  const meters = decimetersNumber / 10;

  const feet = Math.floor(meters * 3.28084);
  const inches = Math.round((meters * 3.28084 - feet) * 12);

  return {
    meters: meters.toFixed(1), // Round to 1 decimal place
    feet,
    inches
  };
}
