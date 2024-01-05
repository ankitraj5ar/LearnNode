import mongoose from "mongoose";

export default mongoose.connect(
  "mongodb://127.0.0.1:27017/task_manager_mongoose",
  {}
);

// export mongoose from "mongoose";

// export default function connectDB()
// {
// mongoose.set('strictQuery', false);
// mongoose.connect('mongodb://127.0.0.1:27017/task_manager_mongoose');
// }
