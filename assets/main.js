$(document).ready(function() {
  // styling html
  const sideNav = document.querySelector(".sidenav");
  const slider = document.querySelectorAll(".slider");
  const scroll = document.querySelectorAll(".scrollspy");
  const parallax = document.querySelectorAll(".parallax");
  const tabs = document.querySelectorAll(".tabs");
  const materialbox = document.querySelectorAll(".materialboxed");
  const date = document.querySelectorAll(".datepicker");

  M.Sidenav.init(sideNav);
  M.Slider.init(slider, {
    indicators: false,
    height: 590,
    duration: 1000,
    interval: 2500
  });
  M.ScrollSpy.init(scroll);
  M.Parallax.init(parallax);
  M.Tabs.init(tabs);
  M.Materialbox.init(materialbox);
  M.Datepicker.init(date);

  $("#btn");
});

// Global Variables
let codeFrom, codeTo;
let emptyFlightsArr = [];
let emptyHotelArr = [];

// Functions

// look at this function for reference for element generation
// AHMED IMPORTANT IN DATA GENERATION
function elementGenerator(element, classTitle, idTitle, text) {
  let newElement = $("<" + element + ">");
  newElement.attr("class", classTitle);
  newElement.attr("id", idTitle);
  newElement.text(text);
  return newElement;
}

function dateConverter(date) {
  let months = [
    "01",
    "02",
    "03",
    "04",
    "05",
    "06",
    "07",
    "08",
    "09",
    "10",
    "11",
    "12"
  ];
  let day = date.getDate();
  let monthIndex = date.getMonth();
  let year = date.getFullYear();
  let convertedDate = year + "-" + months[monthIndex] + "-" + day;
  return convertedDate;
}
// function to convert dates

function hotelData(locationId, nights, checkIn, guests, rooms) {
  var settings = {
    async: true,
    crossDomain: true,
    url:
      "https://tripadvisor1.p.rapidapi.com/hotels/list?zff=4%252C6&offset=0&subcategory=hotel%252Cbb%252Cspecialty&hotel_class=1%252C2%252C3&currency=USD&amenities=beach%252Cbar_lounge%252Cairport_transportation&child_rm_ages=7%252C10&limit=30&checkin=" +
      checkIn +
      "&order=asc&lang=en_US&sort=recommended&nights=" +
      nights +
      "&location_id=" +
      locationId +
      "&adults=" +
      guests +
      "&rooms=" +
      rooms,
    method: "GET",
    headers: {
      "x-rapidapi-host": "tripadvisor1.p.rapidapi.com",
      "x-rapidapi-key": "10701e6cc9msh93b8b8858829b24p16c255jsncff566ba3db6"
    }
  };

  $.ajax(settings).then(function(response) {
    console.log(response);
    for (let i = 0; i < 5; i++) {
      let hotelLocation = response.data[i].location_id;
      hotelDetails(hotelLocation);
    }
  });
}

function hotelDetails(id) {
  emptyHotelArr = [];
  var settings = {
    async: true,
    crossDomain: true,
    url:
      "https://tripadvisor1.p.rapidapi.com/hotels/get-details?&currency=USD&lang=en_US&location_id=" +
      id,
    method: "GET",
    headers: {
      "x-rapidapi-host": "tripadvisor1.p.rapidapi.com",
      "x-rapidapi-key": "10701e6cc9msh93b8b8858829b24p16c255jsncff566ba3db6"
    }
  };

  $.ajax(settings).then(function(response) {
    console.log(response);
    for (let i = 0; i < response.data.length; i++) {
      emptyHotelArr.push(response.data[i]);
    }
    console.log(emptyHotelArr);
    if (emptyHotelArr.length === 0) {
      let errorDiv = elementGenerator(
        "div",
        "error-div",
        "error",
        "You did not get any results matching search parameters"
      );
      $("#results-hotel").append(errorDiv);
    }
    cardGeneratorHotel(emptyHotelArr);
  });
}

// AHMED HOTEL DATA GENERATION
function cardGeneratorHotel(array) {
  $("#results-hotel").empty();

  for (let i = 0; i < array.length; i++) {
    let cardDiv = elementGenerator("div", "card");
    let imageContainerDiv = elementGenerator(
      "div",
      "card-image waves-effect waves-block waves-light"
    );
    let newImage = elementGenerator("img", "activator hotel", "");
    if (array[i].photo_count !== 0) {
      newImage.attr("src", array[i].photo.images.original.url);
    } else {
      newImage.attr("src", "");
    }
    imageContainerDiv.append(newImage);
    let cardContentDiv = elementGenerator("div", "card-content");
    let spanCardContent = elementGenerator(
      "span",
      "card-title activator grey-text text-darken-4",
      "",
      array[i].name
    );
    cardContentDiv.append(spanCardContent);
    let iMoreVert = elementGenerator(
      "i",
      "material-icons right",
      "",
      "more_vert"
    );
    let linkButton = elementGenerator(
      "a",
      "btn-floating halfway-fab waves-effect waves-light red"
    );
    let iAdd = elementGenerator("i", "material-icons", "", "add");
    linkButton.append(iAdd);
    spanCardContent.append(linkButton, iMoreVert);
    let cardRevealDiv = elementGenerator("div", "card-reveal");
    let spanCardReveal = elementGenerator(
      "span",
      "card-title grey-text text-darken-4",
      "",
      array[i].name
    );
    let iClose = elementGenerator("i", "material-icons right", "", "close");
    spanCardReveal.append(iClose);
    let ratingDiv = elementGenerator(
      "div",
      "hotel-info",
      "rating",
      "Rating: " + array[i].rating
    );
    let priceDiv = elementGenerator(
      "div",
      "hotel-info",
      "price",
      "Price Range: " + array[i].price
    );
    let descriptionDiv = elementGenerator(
      "div",
      "hotel-info",
      "description",
      array[i].description
    );
    cardRevealDiv.append(spanCardReveal, ratingDiv, priceDiv, descriptionDiv);
    cardDiv.append(imageContainerDiv, cardContentDiv, cardRevealDiv);

    $("#results-hotel").append(cardDiv);
  }
}

function airportData(fromCode, toCode, beginningPeriod) {
  emptyFlightsArr = [];
  let flightURL =
    "https://cors-anywhere.herokuapp.com/https://api.travelpayouts.com/v2/prices/latest?currency=USD&origin=" +
    fromCode +
    "&destination=" +
    toCode +
    "&beginning_of_period=" +
    beginningPeriod +
    "&period_type=year&page=1&limit=1000&show_to_affiliates=true&sorting=price&trip_class=0&token=bfd2ae7b2a5bfa1154b02dea888e62b1";
  console.log(flightURL);
  $.ajax({
    url: flightURL,
    method: "GET"
  }).then(function(response) {
    console.log(response);
    console.log(beginningPeriod);
    for (let i = 0; i < response.data.length; i++) {
      if (response.data[i].depart_date === beginningPeriod) {
        emptyFlightsArr.push(response.data[i]);
      }
    }
    if (emptyFlightsArr.length === 0) {
      let errorDiv = elementGenerator(
        "div",
        "error-div",
        "error",
        "You did not get any results matching your departure date but here are some other options: "
      );
      $(".results-div").append(errorDiv);
      for (let i = 0; i < 5; i++) {
        emptyFlightsArr.push(response.data[i]);
      }
    }
    console.log(emptyFlightsArr);
    cardGeneratorFlights(emptyFlightsArr);
  });
}

// AHMED FLIGHTS DATA GENERATION
function cardGeneratorFlights(array) {
  for (let i = 0; i < array.length; i++) {
    let cardDiv = elementGenerator("div", "card");
    let imageContainerDiv = elementGenerator(
      "div",
      "card-image waves-effect waves-block waves-light"
    );
    let newImage = elementGenerator("img", "activator");
    imageContainerDiv.append(newImage);
    let cardContentDiv = elementGenerator("div", "card-content");
    let spanCardContent = elementGenerator(
      "span",
      "card-title activator grey-text text-darken-4",
      "",
      array[i].origin + " to " + array[i].destination
    );
    cardContentDiv.append(spanCardContent);
    let iMoreVert = elementGenerator(
      "i",
      "material-icons right",
      "",
      "more_vert"
    );
    let linkButton = elementGenerator(
      "a",
      "btn-floating halfway-fab waves-effect waves-light red"
    );
    let iAdd = elementGenerator("i", "material-icons", "", "add");
    linkButton.append(iAdd);
    spanCardContent.append(linkButton, iMoreVert);
    let cardRevealDiv = elementGenerator("div", "card-reveal");
    let spanCardReveal = elementGenerator(
      "span",
      "card-title grey-text text-darken-4",
      "",
      array[i].origin + " to " + array[i].destination
    );
    let iClose = elementGenerator("i", "material-icons right", "", "close");
    spanCardReveal.append(iClose);
    let departDateDiv = elementGenerator(
      "div",
      "flight-info",
      "departure",
      "Depart Date: " + array[i].depart_date
    );
    let returnDateDiv = elementGenerator(
      "div",
      "flight-info",
      "return",
      "Return Date: " + array[i].return_date
    );
    let priceDiv = elementGenerator(
      "div",
      "flight-info",
      "price",
      "Price: $" + array[i].value
    );
    cardRevealDiv.append(
      spanCardReveal,
      departDateDiv,
      returnDateDiv,
      priceDiv
    );

    cardDiv.append(imageContainerDiv, cardContentDiv, cardRevealDiv);

    $(".results-div").append(cardDiv);
  }
}

// Event Listeners

$("#btn-flight").on("click", function() {
  $(".results-div").empty();
  let flyFromRound = $("#fly-from-round-trip").val();
  let flyToRound = $("#fly-to-round-trip").val();
  let flyFromOne = $("#fly-from-one-way").val();
  let flyToOne = $("#fly-to-one-way").val();
  let departureDateRound = $("#departing-round-trip").val();
  let departureDateOne = $("#departing-one-way").val();
  let departureDateValRound = new Date(departureDateRound);
  let departureDateValOne = new Date(departureDateOne);
  let departureDateConvertedRound = dateConverter(departureDateValRound);
  let departureDateConvertedOne = dateConverter(departureDateValOne);

  let settingsFromRound = {
    async: true,
    crossDomain: true,
    url:
      "https://tripadvisor1.p.rapidapi.com/airports/search?locale=en_US&query=" +
      flyFromRound,
    method: "GET",
    headers: {
      "x-rapidapi-host": "tripadvisor1.p.rapidapi.com",
      "x-rapidapi-key": "10701e6cc9msh93b8b8858829b24p16c255jsncff566ba3db6"
    },
    success: function(data) {
      codeFromRound = data[0].code;
    }
  };

  let settingsFromOne = {
    async: true,
    crossDomain: true,
    url:
      "https://tripadvisor1.p.rapidapi.com/airports/search?locale=en_US&query=" +
      flyFromOne,
    method: "GET",
    headers: {
      "x-rapidapi-host": "tripadvisor1.p.rapidapi.com",
      "x-rapidapi-key": "10701e6cc9msh93b8b8858829b24p16c255jsncff566ba3db6"
    },
    success: function(data) {
      codeFromOne = data[0].code;
    }
  };

  let settingsToRound = {
    async: true,
    crossDomain: true,
    url:
      "https://tripadvisor1.p.rapidapi.com/airports/search?locale=en_US&query=" +
      flyToRound,
    method: "GET",
    headers: {
      "x-rapidapi-host": "tripadvisor1.p.rapidapi.com",
      "x-rapidapi-key": "10701e6cc9msh93b8b8858829b24p16c255jsncff566ba3db6"
    },
    success: function(data) {
      console.log(data);
      codeToRound = data[0].code;
    }
  };

  let settingsToOne = {
    async: true,
    crossDomain: true,
    url:
      "https://tripadvisor1.p.rapidapi.com/airports/search?locale=en_US&query=" +
      flyToOne,
    method: "GET",
    headers: {
      "x-rapidapi-host": "tripadvisor1.p.rapidapi.com",
      "x-rapidapi-key": "10701e6cc9msh93b8b8858829b24p16c255jsncff566ba3db6"
    },
    success: function(data) {
      console.log(data);
      codeToOne = data[0].code;
    }
  };

  $.ajax(settingsFromRound).done(function() {
    $.ajax(settingsToRound).done(function() {
      airportData(codeFromRound, codeToRound, departureDateConvertedRound);
    });
  });

  $.ajax(settingsFromOne).done(function() {
    $.ajax(settingsToOne).done(function() {
      airportData(codeFromOne, codeToOne, departureDateConvertedOne);
    });
  });
});

$("#hotel-submit").on("click", function() {
  let query = $("#location").val();
  let settings = {
    async: true,
    crossDomain: true,
    url:
      "https://tripadvisor1.p.rapidapi.com/locations/search?location_id=1&limit=1000&sort=relevance&offset=0&lang=en_US&currency=USD&units=km&query=" +
      query,
    method: "GET",
    headers: {
      "x-rapidapi-host": "tripadvisor1.p.rapidapi.com",
      "x-rapidapi-key": "10701e6cc9msh93b8b8858829b24p16c255jsncff566ba3db6"
    }
  };

  $.ajax(settings).then(function(response) {
    console.log(response);
    let location = response.data[0].result_object.location_id;
    let checkInVal = $("#check-in").val();
    let checkOutVal = $("#check-out").val();
    let checkInNum = new Date(checkInVal);
    let checkOutNum = new Date(checkOutVal);
    let nightsNum = checkOutNum - checkInNum;
    let nightsVal = Math.ceil(nightsNum / (1000 * 60 * 60 * 24));
    console.log(nightsVal);
    let roomVal = $("#room-val").val();
    let guestVal = $("#guest-val").val();
    let checkInValConv = dateConverter(checkInNum);
    hotelData(location, nightsVal, checkInValConv, guestVal, roomVal);
  });
});

$(".link").on("click", function() {
  $("#fly-from-round-trip").val("");
  $("#fly-to-round-trip").val("");
  $("#fly-from-one-way").val("");
  $("#fly-to-one-way").val("");
  $("#departing-round-trip").val("");
  $("#departing-one-way").val("");
  $("#returning-round-trip").val("");
  $("#passenger-count-round").val("");
  $("#passenger-count-one").val("");
});
