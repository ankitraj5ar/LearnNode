const socket = io();
//Element
const form = document.querySelector("#form");
const formInput = form.querySelector("input");
const formButton = form.querySelector("button");
const sendLocation = document.querySelector("#send_location");
const messages = document.querySelector("#messages");

//Templates
const messageTemplate = document.querySelector("#message_template").innerHTML;
const messageLocationTemplate = document.querySelector(
  "#message_location_template"
).innerHTML;
const sideBarTemplate = document.querySelector("#sidebar_template").innerHTML;

const { username, room } = Qs.parse(location.search, {
  ignoreQueryPrefix: true,
});

const autoScroll = () => {
  //new message element
  const newMessage = messages.lastElementChild;

  //height of new message
  const newMessageStyles = getComputedStyle(newMessage);
  const newMessageMargin = parseInt(newMessageStyles.marginBottom);
  const newMessageHeight = newMessage.offsetHeight + newMessageMargin;
  console.log(newMessageMargin);
  // console.log(newMessageStyles);
  // console.log(newMessageHeight );

  //visible height
  const visibleHeight = messages.offsetHeight;

  //height of message container
  const containerHeight = messages.scrollHeight;

  //how far i have scrolled?
  const scrollOffset = messages.scrollTop + visibleHeight;

  if (containerHeight - newMessageHeight <= scrollOffset) {
    messages.scrollTop = messages.scrollHeight;
  }
};

socket.on("serverMessage", (message) => {
  // console.log(message);
  const html = Mustache.render(messageTemplate, {
    userName: message.username,
    message: message.text,
    createdAt: moment(message.createdAt).format("h:mm a"),
  });
  messages.insertAdjacentHTML("beforeend", html);
  autoScroll();
});

socket.on("userLocation", (url) => {
  const html = Mustache.render(messageLocationTemplate, {
    userName: url.username,
    url: url.url,
    createdAt: moment(url.createdAt).format("h:mm a"),
  });
  messages.insertAdjacentHTML("beforeend", html);
});

socket.on("roomData", ({ room, users }) => {
  console.log(users);
  const html = Mustache.render(sideBarTemplate, {
    room,
    users,
  });
  document.querySelector("#sidebar").innerHTML = html;
});

form.addEventListener("submit", () => {
  formButton.setAttribute("disabled", "disabled");
  const formData = document.querySelector("#form_data").value;
  socket.emit("userMessage", formData, (error) => {
    formButton.removeAttribute("disabled");
    formInput.value = "";
    formInput.focus();
    if (error) {
      return console.log(error);
    }
    console.log("This message has been delivered!");
  });
});

sendLocation.addEventListener("click", () => {
  if (!navigator.geolocation) {
    {
      return alert("Your browser doesn't support geolocation.");
    }
  }
  sendLocation.setAttribute("disabled", "disabled");
  navigator.geolocation.getCurrentPosition((position) => {
    // console.log(position);
    socket.emit(
      "sendLocation",
      {
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
      },
      (ack) => {
        sendLocation.removeAttribute("disabled");
        console.log("your location has been shared.");
      }
    );
  });
});

socket.emit("join", { username, room }, (error) => {
  if (error) {
    alert(error);
    location.href = "/";
  }
});
