import { setTimeout } from "timers/promises";

export const readLineAndExecute = async (
  str: string | undefined,
  handler: (v: string) => void | Promise<void>,
  delay: number,
) => {
  if (!str) {
    return;
  }

  const arr = str
    .split("\n")
    .map((v) => v.trim())
    .filter((v) => v);
  for (let i = 0; i < arr.length; i++) {
    await handler(arr[i]);
    if (i !== arr.length - 1) {
      await setTimeout(delay);
    }
  }
};
