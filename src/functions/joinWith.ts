import * as RA from "fp-ts/ReadonlyArray";

export const joinWith = (sep?: string) =>
  RA.reduceWithIndex<string, string>(
    "",
    (i, b, a) => b + (i && sep ? sep : "") + a
  );
