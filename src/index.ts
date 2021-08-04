#!/usr/bin/env node
import { program } from "commander";
import { buildListCommand } from "./commands/find";
import { buildSayCommand } from "./commands/say";

program
  .version("v0.0.1", "-v, --version")
  .addCommand(buildSayCommand())
  .addCommand(buildListCommand());
program.parse();
