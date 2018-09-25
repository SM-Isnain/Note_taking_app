const fs = require('fs');
const _ = require('lodash');
const yargs = require('yargs');

const notes = require('./notes.js');

const titleOptions = {
  describe: 'Title of note',
  demand: true,
  alias: 't'
};
const bodyOptions = {
  describe: 'Body of note',
  demand: true,
  alias: 'b'
};

const argv = yargs
  .command('add', 'Add a new note', {
    title: titleOptions,
    body: bodyOptions
  })
  .command('list', 'Lists all notes')
  .command('read', 'Reads a note', {
    title: titleOptions
  })
  .command('remove', 'Removes a note', {
    title: titleOptions
  })
  .help()
  .argv;
var command = argv._[0];

if (command === 'add') {
  var note = notes.addNote(argv.title, argv.body);
  if (note) {
    console.log('Note was created successfully!!!');
    notes.logNote(note);
  } else {
    console.log('Sorry. Note title already in use');
  }
} else if (command === 'list') {
  var allNotes = notes.getAll();
  console.log(`Printing ${allNotes.length} note(s).`);
  allNotes.forEach(note => {
    notes.logNote(note);
  });
} else if (command === 'read') {
  var note = notes.getNote(argv.title);
  if (note) {
    console.log('Note was read successfully.');
    notes.logNote(note);
  } else {
    console.log('Note with the specified title was not found.');
  }
} else if (command === 'remove') {
  var noteRemoved = notes.removeNote(argv.title);
  var message = noteRemoved ? 'Note was successfuly removed.' : 'Note was not found';
  console.log(message);
} else {
  console.log('Command not recognized');
}
