import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function intersectMultiple(arrays: number[][]): number[] {
  if (!arrays || arrays.length === 0) return [];

  const intersectionSet = arrays.reduce((intersection, currentArray) => {
    const currentSet = new Set(currentArray);

    return new Set(
      [...intersection].filter((element) => currentSet.has(element)),
    );
  }, new Set(arrays[0]));

  return [...intersectionSet];
}
