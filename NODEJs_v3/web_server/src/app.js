import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import hbs from "hbs";
import forecast from "./utils/forecast.js";

const app = express();

//__dirname not available in in es6 module type:"module" because of package json
//so alternative is import.meta.url give file path with file//
//fileURLToPath removes file// and give path
//path.dirname remove file and give url of directory or folder you are in
//define base path
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

//setup handlebars engine and views folder location
app.set("views", path.join(__dirname, "../templates/views"));
app.set("view engine", "hbs");

//setup partials folder location
hbs.registerPartials(path.join(__dirname, "../templates/partials"));

//steup static directory for serve
app.use(express.static(path.join(__dirname, "../public")));

app.get("/", (req, res) => {
  res.render("index", {
    name: "Index page",
    title: "index ka title",
  });
});

app.get("/about", (req, res) => {
  res.render("about", {
    name: "About Page",
    title: "about ka title",
  });
});

app.get("/help", (req, res) => {
  res.render("help", {
    name: "Help Page",
    title: "help ka title",
  });
});

app.get("/weather", (req, res) => {
  if (!req.query.address) {
    return res.send({ error: "you must provide an address." });
  }
  forecast(req.query.address, (error, forecastData) => {
    if (error) {
      return res.send({ error });
    }
    return res.send({ forecastData });
  });
});

app.get("/help/*", (req, res) => {
  res.render("notfound", {
    name: "help Not Found",
    title: "help Not Found Title",
  });
});

app.get("*", (req, res) => {
  res.render("notfound", {
    name: "Not Found",
    title: "Not Found Title",
  });
});

app.listen(5000, () => {
  console.log("server started on port 5000");
});
