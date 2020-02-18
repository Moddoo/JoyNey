$(document).ready(function() {
  // styling html
  const sideNav = document.querySelector(".sidenav");
  const slider = document.querySelectorAll(".slider");
  const scroll = document.querySelectorAll(".scrollspy");
  const parallax = document.querySelectorAll(".parallax");
  const tabs = document.querySelectorAll(".tabs");
  const materialbox = document.querySelectorAll(".materialboxed");
  const date = document.querySelectorAll(".datepicker");
  const vid = document.querySelectorAll(".vid-img");
  const frame = document.getElementById("frame");
  const cart = document.querySelectorAll(".modal");

  M.Sidenav.init(sideNav);
  M.Slider.init(slider, {
    indicators: false,
    height: 700,
    duration: 1000,
    interval: 2500
  });
  M.ScrollSpy.init(scroll);
  M.Parallax.init(parallax);
  M.Tabs.init(tabs);
  M.Materialbox.init(materialbox);
  M.Datepicker.init(date);
  M.Modal.init(cart, {
    inDuration: 350
  });

  vid[0].addEventListener("click", function video() {
    frame.src = "https://www.youtube.com/embed/SSqgaFE9igo";
  });
  vid[1].addEventListener("click", function video() {
    frame.src = "https://www.youtube.com/embed/W1xwTqgzQ_g";
  });
  vid[2].addEventListener("click", function video() {
    frame.src = "https://www.youtube.com/embed/mTBSo3Ur4UA";
  });
  vid[3].addEventListener("click", function video() {
    frame.src = "https://www.youtube.com/embed/WiJubHinH8Y";
  });
  $(".modal-footer").click(function(e) {
    e.preventDefault();
  });
});

// Global Variables
let codeFrom, codeTo;
let emptyFlightsArr = [];
let emptyHotelArr = [];
let emptyAirportArr = [];
let localStArr = [];
let i = 0;

// Global Actions

$(".row-f>:first-child").hide();

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
  let rowDiv = elementGenerator("div", "row");
  for (let i = 0; i < array.length; i++) {
    let colDiv = elementGenerator("div", "col s6 m3");
    let cardDiv = elementGenerator("div", "card card-hotel");
    let imageContainerDiv = elementGenerator(
      "div",
      "card-image waves-effect waves-block waves-light"
    );
    let newImage = elementGenerator("img", "activator hotel", "");
    if (array[i].photo_count !== 0) {
      newImage.attr("src", array[i].photo.images.original.url);
    } else {
      newImage.attr("src", " ");
    }

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
      "btn-floating hotel-btn halfway-fab waves-effect waves-light green"
    );
    let iAdd = elementGenerator("i", "material-icons", "", "add");
    linkButton.append(iAdd);
    spanCardContent.append(iMoreVert);
    imageContainerDiv.append(linkButton, newImage);
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

    colDiv.append(cardDiv);
    rowDiv.append(colDiv);
  }
  $("#results-hotel").append(rowDiv);
}

function airportData(fromCode, toCode, beginningPeriod) {
  emptyFlightsArr = [];
  emptyAirportArr = [];
  let flightURL =
    "https://cors-anywhere.herokuapp.com/https://api.travelpayouts.com/v2/prices/latest?currency=USD&origin=" +
    fromCode +
    "&destination=" +
    toCode +
    "&beginning_of_period=" +
    beginningPeriod +
    "&period_type=year&page=1&limit=1000&show_to_affiliates=true&sorting=price&trip_class=0&token=bfd2ae7b2a5bfa1154b02dea888e62b1";

  let settingsAirportFrom = {
    async: true,
    crossDomain: true,
    url: "https://airport-info.p.rapidapi.com/airport?iata=" + fromCode,
    method: "GET",
    headers: {
      "x-rapidapi-host": "airport-info.p.rapidapi.com",
      "x-rapidapi-key": "10701e6cc9msh93b8b8858829b24p16c255jsncff566ba3db6"
    }
  };

  $.ajax({
    url: flightURL,
    method: "GET"
  }).then(function(response) {
    console.log(response);
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
      for (let i = 0; i < 6; i++) {
        emptyFlightsArr.push(response.data[i]);
      }
    }
    $.ajax(settingsAirportFrom).then(function(response) {
      console.log(response);
      emptyAirportArr.push(response);
      console.log(emptyFlightsArr, emptyAirportArr);
      cardGeneratorFlights(emptyFlightsArr, emptyAirportArr);
    });
  });
}

// AHMED FLIGHTS DATA GENERATION
function cardGeneratorFlights(array1, array2) {
  $(".clone-results").empty();
  for (let i = 0; i < array1.length; i++) {
    $(".row-f>:first-child").show();
    let copy = $(".row-f>:first-child").clone(true);
    copy[0].firstElementChild.firstElementChild.children[0].children[0].textContent =
      array1[i].depart_date;
    copy[0].firstElementChild.firstElementChild.children[1].children[0].textContent =
      array1[i].return_date;
    copy[0].firstElementChild.firstElementChild.children[2].children[0].textContent =
      array2[0].name;
    copy[0].firstElementChild.firstElementChild.children[3].children[0].textContent =
      array2[0].street_number +
      " " +
      array2[0].street +
      " , " +
      array2[0].city +
      " , " +
      array2[0].state +
      " , " +
      array2[0].postal_code;
    copy[0].firstElementChild.firstElementChild.children[4].children[0].textContent =
      "$" + array1[i].value;
    copy.appendTo($(".clone-results"));
  }
  $(".row-f>:first-child").hide();
}

function floatingButtonHotel() {
  let text = $(this)
    .children()
    .text();
  $(this)
    .children()
    .text(text === "add" ? "close" : "add");
  console.log(
    $(this)
      .children()
      .text()
  );
  $(this).toggleClass("red green");
  let parent = $(this)
    .parent()
    .parent()
    .parent();
  console.log(parent);
  if (text === "add") {
    $(this).attr("data", i);
    parent
      .clone()
      .attr("data", i)
      .removeClass("m3")
      .appendTo($(".modal-items"));
    i++;
  } else {
    let data = $(this).attr("data");
    $(".modal-items div[data = " + data + "]").remove();
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
      console.log(data);
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

$(".btn-floating").click(function() {
  console.log("clicked")
  let localStObj = {};
  let text = $(this)
    .children()
    .text();

  let parent = $(this).parent().parent();
 
  if (text === "add") {
    $(this)
    .attr("data", i)
    .toggleClass("red green")
    .children()
    .text(text === "add" ? "close" : "add");

    parent
      .attr("data", i)
      .clone(true)
      .appendTo($(".modal-items"));

      localStObj[0] = parent.clone()[0].firstElementChild.firstElementChild.children[0].children[0].textContent
      localStObj[1] = parent.clone()[0].firstElementChild.firstElementChild.children[1].children[0].textContent
      localStObj[2] = parent.clone()[0].firstElementChild.firstElementChild.children[2].children[0].textContent
      localStObj[3] = parent.clone()[0].firstElementChild.firstElementChild.children[3].children[0].textContent
      localStObj[4] = parent.clone()[0].firstElementChild.firstElementChild.children[4].children[0].textContent
      localStObj.attr = parent.attr("data")
      localStArr.push(localStObj);
      localStorage.setItem("key",JSON.stringify(localStArr))
    i++;
  } else {
    let data = $(this).parent().parent().attr("data");
 
    $(".clone-results div[data = " + data + "] .card .btn-floating")
              .toggleClass("red green")
              .children()
              .text(text === "add" ? "close" : "add");
    $(".modal-items div[data = " + data + "]").remove();
    function index() {
      for(let el of localStArr) {
        if(el.attr === data) {
          return localStArr.indexOf(el)
        } 
      }
    }
    localStArr.splice(index(),1);
    localStorage.setItem("key", JSON.stringify(localStArr))
  }
});

function storage() {
  let store = localStorage.getItem("key");
  if(!store) {
    localStorage.setItem("key","")
  } else{
    localStArr = JSON.parse(localStorage.getItem("key"));
    for(let el of localStArr) {
      $(".row-f>:first-child").show();
      let copy = $(".row-f>:first-child").clone(true);
      copy.attr("data", el.attr)
      copy[0].firstElementChild.firstElementChild.children[0].children[0].textContent =
        el[0];
      copy[0].firstElementChild.firstElementChild.children[1].children[0].textContent =
        el[1];
      copy[0].firstElementChild.firstElementChild.children[2].children[0].textContent =
        el[2];
      copy[0].firstElementChild.firstElementChild.children[3].children[0].textContent =
         el[3];
      copy[0].firstElementChild.firstElementChild.children[4].children[0].textContent =
         el[4];
      copy[0].firstElementChild.lastElementChild.classList.remove("green");
      copy[0].firstElementChild.lastElementChild.classList.add("red");
      copy[0].firstElementChild.lastElementChild.children[0].textContent = "close"
        
        copy.appendTo($(".modal-items"));
        $(".row-f>:first-child").hide();
      }
    }
  }
storage()

$(document).on("click", ".hotel-btn", floatingButtonHotel);

