import fs from "fs";
import { fileURLToPath } from "url";
import path from "path";
import express from "express";
import { log } from "console";
const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.json());
const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`)
);

const getAllTours = (req, res) => {
  res.json({
    status: "success",
    length: tours.length,
    data: tours,
  });
};
const getTour = (req, res) => {
  const id = req.params.id * 1;
  const tour = tours.find((tour) => tour.id === id);
  if (tour) {
    res.json({
      status: "success",
      data: tour,
    });
  } else {
    res.status(404).json({
      status: "fail",
      message: "No tour found with given id.",
    });
  }
};
const createTour = (req, res) => {
  let newId = 1;
  if (tours.length > 0) {
    newId = tours[tours.length - 1].id + 1;
  }
  const newTour = Object.assign({ id: newId }, req.body);
  tours.push(newTour);
  fs.writeFile(
    `${__dirname}/dev-data/data/tours-simple.json`,
    JSON.stringify(tours),
    (err) => {
      res.status(201).json({
        status: "success",
        data: newTour,
      });
    }
  );
};
const deleteTour = (req, res) => {
  const id = req.params.id * 1;
  const tour = tours.findIndex((tour) => tour.id === id);
  if (tour !== -1) {
    const data = tours[tour];
    tours.splice(tour, 1);
    fs.writeFile(
      `${__dirname}/dev-data/data/tours-simple.json`,
      JSON.stringify(tours),
      (err) => {
        res.status(200).json({
          status: "success",
          data,
        });
      }
    );
  } else {
    res.status(404).json({
      status: "fail",
      message: "No tour found with given id.",
    });
  }
};

// app.get("/api/v1/tours", getAllTours);
// app.get("/api/v1/tours/:id", getTour);
// app.post("/api/v1/tours", createTour);
// app.delete("/api/v1/tours/:id", deleteTour);

app.route("/api/v1/tours").get(getAllTours).post(createTour);
app.route("/api/v1/tours/:id").get(getTour).delete(deleteTour);

app.listen(5000, () => {
  console.log("server running on port 5000");
});
