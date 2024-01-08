#!/usr/bin/env node
"use strict";
import path from "path";
import util from "util";
import fs from "fs";
import { fileURLToPath } from "url";
import minimist from "minimist";
import getStdin from "get-stdin";
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const args = minimist(process.argv.slice(2), {
  boolean: ["help", "in"],
  string: ["file"],
});

var BASE_PATH = path.resolve(process.env.BASE_PATH || __dirname);

if (process.env.HELLO) {
  console.log(process.env.HELLO);
}

//***********************************************//
//raw standard input output by node
// process.stdout.write("hello world\n");
// process.stdout.read();
//***********************************************//

if (args.help) {
  printHelp();
} else if (args.in || args._.includes("-")) {
  getStdin().then(processFile).catch(error.toString());
} else if (args.file) {
  fs.readFile(path.join(BASE_PATH, args.file), (err, contents) => {
    if (err) {
      errorHelp(err.toString());
    } else {
      processFile(contents.toString());
    }
  });
} else {
  errorHelp("Incorrect Usage.", true);
}

function errorHelp(msg, includeHelp = false) {
  console.error(msg);
  if (includeHelp) {
    console.log("");
    printHelp();
  }
}

function printHelp() {
  console.log("ex1 usage:");
  console.log("ex1 --file={FILENAME}");
  console.log("");
  console.log("--help           this is help");
  console.log("--in, -           process stdin");
  console.log("--file           process the file.");
  console.log("");
}

function processFile(contents) {
  contents = contents.toUpperCase();
  process.stdout.write(contents);
}

// console.log("hello world");
// console.error("Opps");
