import { Command } from "commander";
import { green, red } from "chalk";
import { pipe, flow } from "fp-ts/function";
import { log } from "fp-ts/Console";
import * as RA from "fp-ts/ReadonlyArray";
import * as TE from "fp-ts/TaskEither";
import * as T from "fp-ts/Task";
import { globTE } from "../functions/glob";
import { joinWith } from "../functions/joinWith";

export const buildFindCommand = () =>
  new Command("find")
    .version("v0.0.1", "-v, --version")
    .description("find files with patterns.")
    .argument("[patterns...]", "glob patterns", "*")
    .action(async (pats: readonly string[]) => {
      const logResult = await pipe(
        pats,
        globTE({ dot: true, nodir: true }),
        TE.map(
          flow(
            RA.map((s) => green("    " + s)),
            joinWith("\n")
          )
        ),
        TE.fold((e) => T.of(red(e)), T.of),
        T.map(log)
      )();

      logResult();
    });
