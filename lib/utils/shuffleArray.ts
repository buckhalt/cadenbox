function shuffleArray<T>(array: T[]): T[] {
  const newArray: T[] = [...array];

  for (let i = newArray.length - 1; i > 0; i--) {
    // Generate a random index between 0 and i (inclusive)
    const randomIndex = Math.floor(Math.random() * (i + 1));

    // Swap elements at i and randomIndex
    [newArray[i], newArray[randomIndex]] = [newArray[randomIndex], newArray[i]];
  }

  return newArray;
}

export default shuffleArray;
