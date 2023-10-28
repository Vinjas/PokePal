export function calculateWeight(hectograms: string) {
  const hectogramsNumber = parseFloat(hectograms);

  if (isNaN(hectogramsNumber)) {
    return { kilograms: '0', pounds: '0' };
  }

  const kilograms = hectogramsNumber / 10;

  const pounds = kilograms * 2.20462;

  return {
    kilograms: kilograms.toFixed(1), // Round to 1 decimal place
    pounds: pounds.toFixed(2) // Round to 2 decimal places
  };
}
