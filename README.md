# JoyNey

## Description
What is JoyNey?

* The words "joy" and "journey" smashed together
* What you may hear when someone with a NY/NJ accent pronounces the word "journey"
* An app that allows you to search for flights, hotels, events, restaurants, attractions, and parks on your journey
* All of the above

If you selected all of the above, you are correct!

JoyNey allows a user to plan several different aspects of a trip at the same time, searching for flights, accommodations, and things to do in a destination city based on user input search parameters, and viewing detailed information about search results. Additionally, the user can click on individual search results to add those items to an itinerary or "cart" which is saved to local storage.

The JoyNey app is deployed at the following URL: https://moddoo.github.io/JoyNey/

## Credits
The following APIs were used to pull the data shown in the various searches:
* [Airport Info API](https://rapidapi.com/Active-api/api/airport-info) for airport information
* [Travelpayouts Data API](https://travelpayouts.github.io/slate/#flight-data-access-api-v2) for flight data
* [TripAdvisor API](https://rapidapi.com/apidojo/api/tripadvisor1) for airports, hotels, restaurants and local attractions data
* [EatStreet's Restaurant Search API](https://developers.eatstreet.com/endpoint/search) for restaurant pick-up/delivery search
* [Ticketmaster's Discovery API](https://developer.ticketmaster.com/products-and-docs/apis/discovery-api/v2/) for event search
* [National Park Service's Parks API](https://www.nps.gov/subjects/developer/api-documentation.htm#/parks) for national parks information

The [CORS-anywhere](https://cors-anywhere.herokuapp.com/) API was used to enable cross-origin requesters.

JoyNey uses the [Materialize](https://materializecss.com/) CSS framework for its grid system, components, JavaScript features, forms, and mobile responsiveness. The site's front-end also utilizes [Font Awesome](https://fontawesome.com/) and [Google Fonts](https://fonts.google.com/) for icons and typography.

The [jQuery](https://jquery.com/) and [moment.js](https://momentjs.com/) JavaScript libraries were used for DOM manipulation, AJAX, and date conversion.

## License
Copyright (c) Aaron Ealdama, Ahmed Eldemerdash and Angela Li. Otherwise known as team "Triple A". All rights reserved.
Licensed under the [MIT](LICENSE) License.