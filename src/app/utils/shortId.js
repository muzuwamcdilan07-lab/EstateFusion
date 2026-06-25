export function generateRandomId() {
  const part1 = Math.floor(Math.random() * 90) + 10; // 10-99
  const part2 = Math.floor(Math.random() * 9000) + 1000; // 1000-9999
  return `${part1}-T${part2.toString().slice(0, 4)}`;
}

