import validator from "validator";
import yargs from "yargs";
import { hideBin } from "yargs/helpers";
import { addNotes, readNote, removeNote, listNotes } from "./utils.js";
// getNotes();

yargs(hideBin(process.argv))
  .command({
    command: "add",
    describe: "Add a note.",
    builder: {
      title: {
        describe: "Note Title",
        demandOption: true,
        type: "string",
      },
      body: {
        describe: "Note Body",
        demandOption: true,
        type: "string",
      },
    },
    handler(argv) {
      addNotes(argv.title, argv.body);
    },
  })
  .command({
    command: "remove",
    describe: "Remove a note.",
    builder: {
      title: {
        describe: "Remove Note.",
        demandOption: true,
        type: "string",
      },
    },
    handler(argv) {
      removeNote(argv.title);
    },
  })
  .command({
    command: "list",
    describe: "List all notes.",
    handler() {
      listNotes();
    },
  })
  .command({
    command: "read",
    describe: "Read a note.",
    builder: {
      title: {
        describe: "Read a note",
        demandOption: true,
        type: "string",
      },
    },
    handler(argv) {
      readNote(argv.title);
    },
  })
  .parse();

// console.log(yargs(hideBin(process.argv)).argv);

// const utils = require("./utils.js");
// const fs = require("fs");

// console.log(process.argv);

// utils.getNotes();
// console.log(chalk.red.inverse.bold("test"));
// fs.writeFileSync("test.txt", "i am writing into this file from node js");

// fs.appendFileSync(
//   "test.txt",
//   "i have added this extra line from append file sync function"
// );
