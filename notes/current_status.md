# Let's work out our understanding of where we're at so far - what does what, and what needs to be done next:

## Seat Select Page:

1. This seems to be the most advanced piece of the puzzle thus far; the RenderSeats function renders a map of all the seats on the plane in the form of an array of lists, each list representing one row of seats in the plane.

2. By default seats start empty, and there is a rudimentary function, toggleFormContent, embedded within the big RenderSeats function, which toggles the seats' availability based on a query/response from the server.

3. We'll need to have a 2-way exchange, not unlike the ol' order confirmation form, wherein the user sends a seat request to the server, which then response saying either the seat is available or it's taken.

4. We have a database with seats already taken so we can use that at some point to plug into the page, in which case it should tell us that a bunch of seats aren't available (and hopefully alter their appearance so the user doesn't have to click around a lot to find a seat that isn't taken!)

## Server:

1. Barely exists but it does run; first step will be to create a dummy endpoint there, then send something to it and get a response.

2. Once that is worked out, we'll try to connect the server to the seat selector page, and re-implement the order form's query/response cycle there.

3. The server can import test data from the DB for a simulated seat selection once the seat selector page is geared up for it.

# Action Items:

1. Import flights data to server.

2. Set up dummy endpoint and have it do a post request to the server. Use Insomnia!

3. Get an endpoint with a function to check if a requested flight code is in the list.


4. Make it so that you can hit a button/enter key when you've entered the flight number instead of clicking around:
* Add button and form to index html flight section
* Upon submit, scripts.js checks if the format is valid:
* Contains 5 characters starting with SA
#   * OR contains 3 numerical characters?? Not essential but it's still a good idea.
* If input passes these checks, THEN pass it to the server.

5. Build out flight number validator (server side):
* If flight exists, return its data object (an array),
* and plug that into the seat renderer:
* Seat Renderer checks each new seat's availability as it renders it.
* If not, return an error message asking the user to select a different number.

6. Test seat selector now that the available seats are filtered. Ensure seat number is return/stored somewhere.

7. See what happens when the submit button is hit currently; looks like it just refreshes the page at the moment. Disable that first.

8. Now let's try adding some consts for the data entry fields to see if we can look at those individually (and thus store them).

9. Now, on Submitting, let's send a very simple signal, "sup" to our server and get a response back.

# 10. Since I'm reluctant to post anymore after the form validation debacle, let's just add a bunch of req. params to the fetch request and use those to render the order confirmation page. Actually let's start by getting the server to spit back your req. params, then we can work on making some sort of server function that generates a static page with your OC...

