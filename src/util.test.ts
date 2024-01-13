import * as timers from "timers/promises";
import { describe, expect, test, vi } from "vitest";
import { readLineAndExecute } from "./util.ts";

vi.mock("timers/promises");

describe("readLineAndExecute", () => {
  test("valid", async () => {
    const spySetTimeOut = vi.spyOn(timers, "setTimeout");
    const handler = vi.fn();
    handler.mockResolvedValue(undefined);
    await readLineAndExecute("a\nb\nc", handler, 0);
    expect(handler).toBeCalledTimes(3);
    expect(spySetTimeOut).toBeCalledTimes(2);
    expect(handler).toBeCalledWith("a");
    expect(handler).toBeCalledWith("b");
    expect(handler).toBeCalledWith("c");
  });
  test("with empty string", async () => {
    const handler = vi.fn();
    handler.mockResolvedValue(undefined);

    await readLineAndExecute(undefined, handler, 0);
    expect(handler).toBeCalledTimes(0);

    await readLineAndExecute("", handler, 0);
    expect(handler).toBeCalledTimes(0);
  });
});
