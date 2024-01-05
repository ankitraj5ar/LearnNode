const fs = require("fs");
const http = require("http");
const url = require("url");

console.log(__dirname);
console.log(__filename);
/// FILES
//synchronous
// const text = fs.readFileSync("./text.txt", "utf-8");
// console.log(text);
// const writefile = "hello how are you my are you doing good. eat well>>>";
// fs.writeFileSync("./out.txt", writefile);

// //Asynchronous
// fs.readFile("./text.txt", "utf-8", (err, data) => {
//   console.log(data);
// });
// fs.writeFile(
//   "./out.txt",
//   "writing to a file form an asynchronous method 1",
//   (err) => {
//     if (err) console.log(err);
//   }
// );
///SERVER

const server = http.createServer((req, res) => {
  const pathName = req.url;
  if (pathName === "/overview" || pathName === "/") {
    res.end("this is overview");
  } else if (pathName === "/product") {
    res.end("this is product");
  } else res.end("hello world");
});

server.listen(5000, (url) => {
  console.log("server running on port 5000");
});
