import { v4 } from 'uuid';

// eslint-disable-next-line @typescript-eslint/no-unsafe-call
export const uuidv4 = (): string => v4() as string;
