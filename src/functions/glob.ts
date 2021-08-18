import glob from "glob";
import { promisify } from "util";
import * as RA from "fp-ts/ReadonlyArray";
import * as TE from "fp-ts/TaskEither";
import * as S from "fp-ts/string";
import { flow } from "fp-ts/function";

export const globSingleTE = (opts?: glob.IOptions) => (pat: string) =>
  TE.tryCatchK(promisify(glob), String)(pat, opts);

export const globTE = (opts?: glob.IOptions) =>
  flow(
    (pat: string | readonly string[]) =>
      typeof pat === "string" ? RA.of(pat) : pat,
    RA.map(globSingleTE(opts)),
    TE.sequenceArray,
    TE.map(flow(RA.flatten, RA.uniq(S.Eq), RA.sort(S.Ord)))
  );
