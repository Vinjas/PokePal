interface GenderPercentage {
  male: string;
  female: string;
}

export function calculateGenderPercentage(genderRatio: number): GenderPercentage {
  if (genderRatio === -1) {
    return { male: 'Unknown', female: 'Unknown' };
  }

  const femalePercentage = (genderRatio / 8) * 100;
  const malePercentage = 100 - femalePercentage;

  return {
    male: malePercentage.toFixed(2) + '%',
    female: femalePercentage.toFixed(2) + '%'
  };
}
