export type CardAction = 'right' | 'left' | 'next' | 'prev' | 'remove' | 'create';

export const shuffle = (a: any[]): any[] => {
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }

  // eslint-disable-next-line @typescript-eslint/no-unsafe-return
  return a;
};
