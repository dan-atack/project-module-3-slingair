// GEt those HTML elements and nail 'em up:

const flight = document.getElementById("flight");
const seat = document.getElementById("seat");
const name = document.getElementById("name");
const email = document.getElementById("email");
const userid = document.getElementById("userid");

// Get data on the customer from the server using urlParams:

const params = (new URL(document.location)).searchParams;

let flightParam = params.get('flight');
let seatParam = params.get('seat');
let nameParam = params.get('name');
let emailParam = params.get('email');
let idParam = params.get('userid');

console.log(typeof flightParam);

flight.innerText = flightParam;
seat.innerText = seatParam;
name.innerText = nameParam.split("-").join(" ");
email.innerText = emailParam;
userid.innerText = idParam;