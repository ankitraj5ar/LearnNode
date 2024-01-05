import express from "express";
import db from "./db/mongoose.js";
import userRouter from "./routers/user.js";
import taskRouter from "./routers/task.js";
// import "./config/dev.env";
const app = express();

app.use(express.json());
app.use(userRouter);
app.use(taskRouter);

export default app;

// import multer from "multer";

// const upload = multer({
//   dest: "images",
//   limits: {
//     fileSize: 1000000,
//   },
//   fileFilter(req, file, cb) {
//     if (!file.originalname.match(/\.(doc|docx)$/)) {
//       cb(new Error("Please upload a word document."));
//     }
//     cb(undefined, true);
//   },
// });

// app.post(
//   "/upload",
//   upload.single("upload"),
//   (req, res) => {
//     res.send();
//   },
//   (error, req, res, next) => {
//     res.status(400).send({ error: error.message });
//   }
// );
