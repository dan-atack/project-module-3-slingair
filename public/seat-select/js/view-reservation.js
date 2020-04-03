const emailInput = document.getElementById("email-input");

const findMyRes = event => {
    event.preventDefault();
    fetch(`/find-my-reservation/${emailInput.value}`)
    .then(res => {
        return res.json();
    })
    .then(output => {
        let { flight, seat, name, surname, email } = output;
        window.location.href=`/seat-select/confirmed.html?flight=${flight}&seat=${seat}&name=${name}-${surname}&email=${email}`;
    })
}