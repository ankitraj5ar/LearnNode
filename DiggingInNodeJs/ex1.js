#!/usr/bin/env node
"use strict";
import path from "path";
import util from "util";
import fs from "fs";
import { fileURLToPath } from "url";
import minimist from "minimist";
import getStdin from "get-stdin";
import { Transform } from "stream";
import zlib from "zlib";
import { sqlite3 } from "sqlite3";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const args = minimist(process.argv.slice(2), {
  boolean: ["help", "in",'out','compress','decompress'],
  string: ["file"],
});

function streamComplete(stream){
    stream.on('end',()=>{
      console.log("complete");
    })
}

var BASE_PATH = path.resolve(process.env.BASE_PATH || __dirname);
var OUTFILE = path.join(BASE_PATH,"out.txt");

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
  // console.log(process.stdin);
  processFile(process.stdin)

  // getStdin().then(processFile).catch(err=>{
  //   console.log(err.toString());
  // });

} else if (args.file) {
  let stream = fs.createReadStream(path.join(BASE_PATH, args.file));
  processFile(stream)

  // fs.readFile(path.join(BASE_PATH, args.file), (err, contents) => {
    // if (err) {
    //   errorHelp(err.toString());
    // } else {
    //   processFile(contents.toString());
    // }
  // });
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
  console.log("--help          this is help");
  console.log("--in, -         process stdin");
  console.log("--file          process the file.");
  console.log("--out           pirnt to the stdout.");
  console.log("--compress      gzip the output.");
  console.log("--decompress    un-gzip the output.");
  console.log("");
}

async function processFile(inStream) {
  // contents = contents.toUpperCase();
  // process.stdout.write(contents);
  var outStream = inStream;
  if(args.decompress){
    let gunZipStream = zlib.createGunzip();
  //   console.log(outStream);
  // process.exit(0);
    outStream = outStream.pipe(gunZipStream);
      
  }

  var upperStream = new Transform({
    transform(chunk,enc,next){
      this.push(chunk.toString().toUpperCase());
      // setTimeout(next,5000);
      next();
    }
  })

  outStream = outStream.pipe(upperStream);

  if(args.compress){
    let gZipStream = zlib.createGzip();
    outStream = outStream.pipe(gZipStream);
    OUTFILE = `${OUTFILE}.gz`;
  }
  var targetStream;

  if(args.out){
    targetStream = process.stdout;
  }
  else{
    targetStream = fs.createWriteStream(OUTFILE);
  }

  outStream.pipe(targetStream);
  await streamComplete(outStream);
}

// console.log("hello world");
// console.error("Opps");
