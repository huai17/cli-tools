#!/usr/bin/env node
import { program } from "commander";
import { buildListCommand } from "./commands/find";

program.version("v0.0.1", "-v, --version").addCommand(buildListCommand());
program.parse();
