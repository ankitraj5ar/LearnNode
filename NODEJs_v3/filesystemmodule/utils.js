import chalk from "chalk";
import fs from "fs";

const readNote = (title) => {
  const notes = loadNotes();
  const note = notes.find((note) => note.title === title);
  if (note) {
    console.log(chalk.green("Title :", note.title));
    console.log(chalk.green("Body :", note.body));
  } else {
    console.error(chalk.red.inverse("Note not found!."));
  }
};

const listNotes = () => {
  const notes = loadNotes();
  console.log(chalk.green.bold("Your notes ...."));
  notes.forEach((note) => console.log(chalk.green(note.title)));
};

const removeNote = (title) => {
  const notes = loadNotes();
  const notesToKeep = notes.filter((note) => note.title !== title);

  if (notesToKeep.length !== notes.length) {
    saveNote(notesToKeep);
    console.log(chalk.green.inverse("note removed successfully"));
  } else {
    console.error(chalk.red.inverse("note doesn't exist."));
  }
};

const addNotes = (title, body) => {
  const notes = loadNotes();
  const duplicateNotes = notes.find((note) => note.title === title);
  debugger;
  if (!duplicateNotes) {
    notes.push({
      title,
      body,
    });
    saveNote(notes);
    console.log(chalk.green.inverse("Note saved successfully"));
  } else {
    console.error(chalk.red.inverse("Note title already taken!."));
  }
};
const saveNote = (notes) => {
  const dataJson = JSON.stringify(notes);
  fs.writeFileSync("notes.json", dataJson);
};

const loadNotes = () => {
  try {
    // it will read the data and it will be in buffer
    const dataBuffer = fs.readFileSync("notes.json");
    //converting that buffer into string
    const dataJson = dataBuffer.toString();
    return JSON.parse(dataJson);
  } catch (error) {
    return [];
  }
};
// export default addNotes;
export { addNotes, readNote, removeNote, listNotes };
