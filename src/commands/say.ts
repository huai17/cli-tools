import { Command } from "commander";
import _figlet from "figlet";
import { promisify } from "util";
import join from "lodash/fp/join";

const figlet = promisify(_figlet);
const joinWithSpace = join(" ");

export const buildSayCommand = () =>
  new Command("say")
    .version("v0.0.1", "-v, --version")
    .description("print words in FIGfont.")
    .argument("[words...]", "words", "Hello World!")
    .action(async (words: string[]) => {
      const data = await figlet(joinWithSpace(words));
      console.log(data);
    });
