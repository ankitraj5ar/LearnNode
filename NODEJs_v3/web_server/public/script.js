console.log("just checking it is working or not");

const form = document.querySelector("form");
const search = document.querySelector("#msg-1");
form.addEventListener("submit", (e) => {
  const address = document.querySelector("#address").value;
  e.preventDefault();
  fetch("http://localhost:5000/weather?address=" + address).then((response) => {
    response.json().then((data) => {
      // console.log(data);
      // return;
      if (data.error) {
        search.textContent = data.error;
      } else {
        search.textContent = JSON.stringify(data.forecastData);
      }
    });
  });
});
