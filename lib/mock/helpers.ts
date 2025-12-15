import { randomUUID } from 'crypto';

export const randomId = () => randomUUID();

export const randomFromArray = <T>(arr: T[]): T =>
    arr[Math.floor(Math.random() * arr.length)];

export const randomNumber = (min: number, max: number) =>
    Math.floor(Math.random() * (max - min + 1)) + min;