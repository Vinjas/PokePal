export function calculateHappiness(happiness: string): string {
  const happinessValue = parseInt(happiness, 10);

  if (isNaN(happinessValue)) {
    return 'good';
  }

  const happinessTable = [
    { range: [250, 255], value: 'excellent' },
    { range: [200, 249], value: 'very-good' },
    { range: [150, 199], value: 'good' },
    { range: [100, 149], value: 'so-so' },
    { range: [50, 99], value: 'not-good' },
    { range: [0, 49], value: 'meager' }
  ];

  for (const entry of happinessTable) {
    if (happinessValue >= entry.range[0] && happinessValue <= entry.range[1]) {
      return entry.value;
    }
  }

  return 'good';
}
