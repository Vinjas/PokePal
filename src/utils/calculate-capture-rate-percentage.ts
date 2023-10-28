export function calculateCaptureRatePercentage(baseCaptureRate: number): string {
  if (baseCaptureRate < 0 || baseCaptureRate > 255) {
    return '0%';
  }

  const captureRatePercentage = Math.floor((baseCaptureRate / 255) * 100);

  return `${captureRatePercentage}%`;
}
