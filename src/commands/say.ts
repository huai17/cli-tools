import { Command } from "commander";
import { red, cyan } from "chalk";
import { pipe } from "fp-ts/function";
import { log } from "fp-ts/Console";
import * as TE from "fp-ts/TaskEither";
import * as T from "fp-ts/Task";
import { figletTE } from "../functions/figlet";
import { joinWith } from "../functions/joinWith";

export const buildSayCommand = () =>
  new Command("say")
    .version("v0.0.1", "-v, --version")
    .description("print words in FIGfont.")
    .argument("[words...]", "words", ["Hello World!"])
    .action(async (words: readonly string[]) => {
      const logResult = await pipe(
        words,
        joinWith(" "),
        figletTE(),
        TE.fold(
          (e) => T.of(red(e)),
          (txt) => T.of(cyan(txt))
        ),
        T.map(log)
      )();

      logResult();
    });
