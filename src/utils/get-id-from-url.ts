export function getIdFromUrl(url: string): number {
  const match = url.match(/\/(\d+)\/?$/);
  if (match) {
    const number = parseInt(match[1], 10);
    return number;
  } else {
    return 0;
  }
}
