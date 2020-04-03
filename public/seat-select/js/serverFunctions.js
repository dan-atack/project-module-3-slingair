// Flight verifier will expect a 5-character value with the first 2 chars being the letters 'SA';
// It will strip those off and check if the remaining 3-digit number is in the flights list, and return true if it is.
const flightVerifier = (flightName, flightList) => {
    if (flightList.flights[flightName]) {
        return flightList.flights[flightName]
    } else {
        return "sorry, no such flight exists. Please choose again."
    }
};

const getClient = (email, customersList) => {
    return customersList.find(customer => customer.email === email);
}

module.exports = { flightVerifier, getClient };