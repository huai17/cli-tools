import figlet from "figlet";
import * as TE from "fp-ts/TaskEither";

export const figletTE = (opts?: figlet.Options) => (txt: string) =>
  TE.tryCatch(
    () =>
      new Promise((res, rej) =>
        figlet(txt, opts, (err, result) => void (err ? rej(err) : res(result)))
      ),
    String
  );
