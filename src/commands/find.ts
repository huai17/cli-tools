import { Command } from "commander";
import _glob from "glob";
import { promisify } from "util";
import pipe from "lodash/fp/pipe";
import flatten from "lodash/fp/flatten";
import uniq from "lodash/fp/uniq";
import map from "lodash/fp/map";
import join from "lodash/fp/join";

const glob = promisify(_glob);
const mapAll = map((pattern: string) => glob(pattern, { dot: true }));
const mapfiles = map((pattern: string) =>
  glob(pattern, { dot: true, nodir: true })
);
const joinWithSpace = join(" ");

export const listAll = (patterns: string[]): Promise<string[]> =>
  Promise.all(mapAll(patterns)).then(pipe(flatten, uniq));

export const listFile = (patterns: string[]): Promise<string[]> =>
  Promise.all(mapfiles(patterns)).then(pipe(flatten, uniq));

export const buildListCommand = () =>
  new Command("list")
    .version("v0.0.1", "-v, --version")
    .description("list files with patterns.")
    .option("-f, --file", "list only files.")
    .argument("[patterns...]", "glob patterns", ["*"])
    .action(async (patterns: string[], opts) => {
      const list = opts.file ? listFile : listAll;
      const files = await list(patterns);
      console.log(joinWithSpace(files));
    });
