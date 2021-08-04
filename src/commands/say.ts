import { Command } from "commander";
import _figlet from "figlet";
import { promisify } from "util";
import join from "lodash/fp/join";
import {
  black,
  red,
  green,
  yellow,
  blue,
  magenta,
  cyan,
  white,
  grey,
} from "chalk";

const figlet = promisify(_figlet);
const joinWithSpace = join(" ");

const say = (color: string = "white", words: string) => {
  let chalk;
  switch (color) {
    case "black":
      chalk = black;
      break;
    case "red":
      chalk = red;
      break;
    case "green":
      chalk = green;
      break;
    case "yellow":
      chalk = yellow;
      break;
    case "blue":
      chalk = blue;
      break;
    case "magenta":
      chalk = magenta;
      break;
    case "cyan":
      chalk = cyan;
      break;
    case "grey":
      chalk = grey;
      break;
    default:
      chalk = white;
      break;
  }

  return figlet(words).then(chalk);
};

export const buildSayCommand = () =>
  new Command("say")
    .version("v0.0.1", "-v, --version")
    .description("print words in FIGfont.")
    .option("-c, --color [color]", "color", "white")
    .argument("[words...]", "words", ["Hello World!"])
    .action(async (words: string[], opts) => {
      const data = await say(opts.color, joinWithSpace(words));
      console.log(data);
    });
