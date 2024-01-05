const users = [];

//addUser
const addUser = ({ id, username, room }) => {
  //clean the data
  username = username.trim().toLowerCase();
  room = room.trim().toLowerCase();

  //validate the data
  if (!username || !room) {
    return {
      error: "Username and room are required!",
    };
  }
  //check for existing room
  const existingUser = users.find((user) => {
    return user.room == room && user.username == username;
  });

  //validate username
  if (existingUser) {
    return {
      error: "Username is already in use.",
    };
  }

  //store user
  const user = { id, username, room };
  users.push(user);
  return { user };
};

const removeUser = (id) => {
  const index = users.findIndex((user) => user.id == id);

  if (index !== -1) {
    return users.splice(index, 1)[0];
  }
};

const getUser = (id) => {
  return users.find((user) => user.id == id);
};

const getUsersInRoom = (room) => {
  room = room.trim().toLowerCase();
  return users.filter((user) => user.room == room);
};

export { addUser, getUser, getUsersInRoom, removeUser };

// addUser({
//   id: 1,
//   username: "ankitraj",
//   room: "test",
// });
// // const removeuse = removeUser(1);
// const res = addUser({
//   id: 2,
//   username: "ankitraj5ar",
//   room: "test",
// });

// const res1 = addUser({
//   id: 3,
//   username: "ankitraj",
//   room: "test1",
// });

// // console.log(removeuse);
// console.log(users);
// console.log("function test below\n\n");
// console.log(getUser(4));
// console.log("function test below\n\n");
// console.log(getUsersInRoom("test5"));
