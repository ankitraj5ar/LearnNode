import app from "../app.js";
import User from "../models/user.js";
import supertest from "supertest";

userOne = {
  name: "Ankit Raj",
  email: "ankitraj5ar@gmail.com",
  password: "Admin@123",
};
beforeEach(async () => {
  await User.deleteMany();
  await new User(userOne).save();
});

test("sign_up user", async () => {
  await supertest(app)
    .post("/user")
    .send({
      name: "test user",
      email: "webprimedev@gmail.com",
      password: "test@123",
    })
    .expect(201);
});
