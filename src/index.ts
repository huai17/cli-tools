#!/usr/bin/env node
import { program } from "commander";
import { buildSayCommand } from "./commands/say";
import { buildFindCommand } from "./commands/find";

program
  .version("v0.0.1", "-v, --version")
  .addCommand(buildSayCommand())
  .addCommand(buildFindCommand());
program.parse();
