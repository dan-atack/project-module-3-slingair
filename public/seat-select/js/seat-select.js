const flightInput = document.getElementById('flight');
const seatsDiv = document.getElementById('seats-section');
const confirmButton = document.getElementById('confirm-button');

// User Data Input Fields:

const firstName = document.getElementById("givenName");
const surname = document.getElementById("surname");
const email = document.getElementById("email");

let flight = '';
let selection = '';
// keep track of whether a flight is rendered so we can re-render if you choose a different flight:
let flightRendered = false;

// Added seatArray parameter; will pass the server's response array through here:
const renderSeats = (seatsArray) => {
    // to re-render seats for a different flight:
    if (flightRendered) {
        console.log("non-empty flight");
        for (let r = 1; r < 11; r++) {
            seatsDiv.removeChild(document.getElementById(`row-${r}`))
        }
    }
    //
    document.querySelector('.form-container').style.display = 'block';
    const alpha = ['A', 'B', 'C', 'D', 'E', 'F'];
    // Fill the plane with rows first;
    for (let r = 1; r < 11; r++) {
        const row = document.createElement('ol');
        row.id = `row-${r}`
        row.classList.add('row');
        row.classList.add('fuselage');
        seatsDiv.appendChild(row);
        // Fill each row with seats:
        for (let s = 1; s < 7; s++) {
            // Let's take a moment to see what the Christ is going on here:
            // Seats start their existence by being assigned a number/letter identifier to make them unique;
            const seatNumber = `${r}${alpha[s-1]}`;
            // THEN make an html element,
            const seat = document.createElement('li')
            // THEN, make a blank template for what to do if you have an occupied seat => use this with the output of the flight
            // availability query to block off certain seats:
            const seatOccupied = `<li><label class="seat"><span id="${seatNumber}" class="occupied">${seatNumber}</span></label></li>`
            // This is the template for available seats;
            const seatAvailable = `<li><label class="seat"><input type="radio" name="seat" value="${seatNumber}" /><span id="${seatNumber}" class="avail">${seatNumber}</span></label></li>`        
            // By default all seats are available. Replace this line with a conditional statement and we should be good:
            // Never used the innerHTML thing before but this is a good illustration of what it's capable of!
            // Conditional statement: for each seat, match it to its counterpart in the data set and set its
            // Inner HTML based on whether the seat is available or not:
            const dbSeat = seatsArray.find(seat => seat.id === seatNumber);
            (dbSeat.isAvailable) ? seat.innerHTML = seatAvailable : seat.innerHTML = seatOccupied;
            row.appendChild(seat);
            flightRendered = true;
        }
    }
    
    // This is all still part of the render seats function. That's why there are no 'seat's in the html file; they don't exist yet!

    let seatMap = document.forms['seats'].elements['seat'];

    seatMap.forEach(seat => {
        seat.onclick = () => {
            selection = seat.value;
            // when you click on an available seat it registers the seat's id as global variable selection
            seatMap.forEach(x => {
                if (x.value !== seat.value) {
                    // unselect all seats but the one you've chosen - to let you click around and change your mind without
                    // selecting several seats by mistake...
                    document.getElementById(x.value).classList.remove('selected');
                }
            })
            document.getElementById(seat.value).classList.add('selected');
            document.getElementById('seat-number').innerText = `(${selection})`;
            // unlocks the confirm button for our final function; still awaits personal info entry
            confirmButton.disabled = false;
        }
    });
}

const toggleFormContent = (event) => {
    // Added this so it doesn't take you to the /flight-select endpoint when you hit the submit button for your flight selection.
    event.preventDefault();
    // Send this to the server now.
    const flightNumber = flightInput.value;
    // if ((flightNumber.length == 5) && (flightNumber.slice(0,2).toLowerCase() === "sa")) {
    //     console.log('toggleFormContent: ', flightNumber);
        fetch(`/flight-select/${flightNumber}`)
        .then(res => {
        return res.json();
    })
    .then(output => renderSeats(output));
    flight = flightNumber;
    console.log("flight: " + flight);
    // Reformat to get rid of error message, should there happen to be one:
    // document.getElementById("invalid-flight").style.display = "none";
    // document.querySelector(".flight-select").style.height = "80px";
    
}

const handleConfirmSeat = (event) => {
    console.log(email.value);
    // Freeze things here so it doesn't redirect as we try out some stuff..
    event.preventDefault();
    let bod = {
        flight: flight,
        seat: selection,
        givenName: firstName.value,
        surname: surname.value,
        email: email.value
    }
    fetch('/user-info', {
        method: "POST",
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json"
        },
        body: JSON.stringify(bod)
    })
    .then(response => {
        return response.json();
    })
    .then(id => {
        window.location.href=`/seat-select/confirmed.html?flight=${flight}&seat=${selection}&name=${firstName.value}-${surname.value}&email=${email.value}&userid=${id}`;
    })
}

// Cool alternate way to run the togglecontent function when you click anywhere outside of the flight select input field...
// So slick I didn't even notice it was there! 

// flightInput.addEventListener('blur', toggleFormContent);

// Flight fetcher: Call as the page loads so it can populate the drop down menu:

const getFlightsAvailable = () => {
    fetch('/flight-availability')
    .then(res => {
        return res.json()
    })
    .then(flights => {
        flights.forEach(flight => {
            let flightNo = document.createElement("option");
            flightNo.innerHTML = `<option value=${flight} > ${flight} </option>`;
            flightInput.appendChild(flightNo);
        })
    })
}

getFlightsAvailable();