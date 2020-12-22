export const shift = (deck: any[]): any[] => {
  const newDeck = [...deck];
  const front = newDeck.shift();
  newDeck.push(front);
  // eslint-disable-next-line @typescript-eslint/no-unsafe-return
  return [...newDeck];
};

export const pop = (deck: any[]): any[] => {
  const newDeck = [...deck];
  const back = newDeck.pop();
  newDeck.unshift(back);
  // eslint-disable-next-line @typescript-eslint/no-unsafe-return
  return [...newDeck];
};
