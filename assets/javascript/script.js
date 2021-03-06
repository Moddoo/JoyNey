$(document).ready(function() {
  $(".tabs").tabs();
});

$(document).ready(function() {
  $(".datepicker").datepicker();
});

var eatStreetAPIKey = "1e04ce32b770452a";
var tripAdvisorAPIKey = "10701e6cc9msh93b8b8858829b24p16c255jsncff566ba3db6";
var itinerary = [];

function renderCart() {
  $(".modal-content").empty();
  var itineraryString = localStorage.getItem("itinerary");
  if (itineraryString !== null) {
    itinerary = JSON.parse(itineraryString);
  }
  for (var i = 0; i < itinerary.length; i++) {
    var cartItem = $("<p>").text(itinerary[i]);
    $(".modal-content").append(cartItem);
  }
}

function addItem(item) {
  if (itinerary.indexOf(item) === -1) {
    itinerary.push(item);
  }
  var itineraryString = JSON.stringify(itinerary);
  localStorage.setItem("itinerary", itineraryString);
  renderCart();
}

function dineInAJAX(locationID) {
  var settings = {
    async: true,
    crossDomain: true,
    url:
      "https://tripadvisor1.p.rapidapi.com/restaurants/list?limit=16&location_id=" +
      locationID,
    method: "GET",
    headers: {
      "x-rapidapi-host": "tripadvisor1.p.rapidapi.com",
      "x-rapidapi-key": tripAdvisorAPIKey
    }
  };
  $.ajax(settings).done(function(response) {
    console.log(response);

    if (!response.data) {
      $("#restaurants-div").text("No search results!");
      return null;
    }
    var searchResults = response.data;
    // remove ads
    for (var i = 0; i < searchResults.length; i++) {
      if (searchResults[i].ad_position) {
        searchResults.splice(i, 1);
      }
    }
    // display results
    for (var i = 0; i < 4; i++) {
      var rowDiv = $("<div>");
      rowDiv.attr("class", "row");
      for (var j = 0; j < 4; j++) {
        var colDiv = $("<div>");
        colDiv.attr("class", "col s6 l3");

        var x = i * 4 + j;
        var result = searchResults[x];
        var restaurantName = result.name;
        var restaurantURL = result.website;
        var restaurantAddress = result.address;

        var resultDiv = $("<div>");
        resultDiv.attr("class", "card");
        var imgDiv = $("<div>");
        imgDiv.attr("class", "card-image");
        var restaurantImg = $("<img>");
        if (result.photo) {
          var restaurantImgURL = result.photo.images.large.url;
          restaurantImg.attr("src", restaurantImgURL);
        }
        imgDiv.append(restaurantImg);
        resultDiv.append(imgDiv);

        var addLink = $("<a>");
        addLink.attr(
          "class",
          "btn-floating aaron halfway-fab waves-effect waves-light green"
        );
        var addButton = $("<i>").attr("class", "material-icons");
        addButton.text("add");
        addLink.append(addButton);
        imgDiv.append(addLink);

        var contentDiv = $("<div>");
        contentDiv.attr("class", "card-content");
        var cardTitle = $("<a>").text(restaurantName);
        cardTitle.attr("href", restaurantURL);
        cardTitle.attr("target", "_blank");
        cardTitle.attr("class", "card-title");
        contentDiv.append(cardTitle);

        $("<p>" + "Address: " + restaurantAddress + "</p>").appendTo(
          contentDiv
        );
        if (result.cuisine) {
          // double if statement to prevent errors caused by empty arrays in response
          if (result.cuisine[0]) {
            var cuisine = result.cuisine[0].name;
            $("<p>" + "Cuisine: " + cuisine + "</p>").appendTo(contentDiv);
          }
        }
        if (result.price) {
          var price = result.price;
          $("<p>" + "Price: " + price + "</p>").appendTo(contentDiv);
        }
        resultDiv.append(contentDiv);
        colDiv.append(resultDiv);
        rowDiv.append(colDiv);
      }
      $("#restaurants-div").append(rowDiv);
    }
  });
}

function attractionAJAX(locationID) {
  var settings = {
    async: true,
    crossDomain: true,
    url:
      "https://tripadvisor1.p.rapidapi.com/attractions/list?sort=recommended&limit=16&location_id=" +
      locationID,
    method: "GET",
    headers: {
      "x-rapidapi-host": "tripadvisor1.p.rapidapi.com",
      "x-rapidapi-key": tripAdvisorAPIKey
    }
  };
  $.ajax(settings).done(function(response) {
    console.log(response);

    if (!response.data) {
      $("#attractions-div").text("No search results!");
      return null;
    }
    var searchResults = response.data;
    // remove ads
    for (var i = 0; i < searchResults.length; i++) {
      if (searchResults[i].ad_position) {
        searchResults.splice(i, 1);
      }
    }
    // display results
    for (var i = 0; i < 4; i++) {
      var rowDiv = $("<div>");
      rowDiv.attr("class", "row");
      for (var j = 0; j < 4; j++) {
        var colDiv = $("<div>");
        colDiv.attr("class", "col s6 l3");

        var x = i * 4 + j;
        var result = searchResults[x];
        var attractionName = result.name;
        var attractionURL = result.website;
        var attractionAddress = result.address;

        var resultDiv = $("<div>");
        resultDiv.attr("class", "card");
        var imgDiv = $("<div>");
        imgDiv.attr("class", "card-image");
        var attractionImg = $("<img>");
        if (result.photo) {
          var attractionImgURL = result.photo.images.large.url;
          attractionImg.attr("src", attractionImgURL);
        }
        imgDiv.append(attractionImg);
        resultDiv.append(imgDiv);

        var addLink = $("<a>");
        addLink.attr(
          "class",
          "btn-floating aaron halfway-fab waves-effect waves-light green"
        );
        var addButton = $("<i>").attr("class", "material-icons");
        addButton.text("add");
        addLink.append(addButton);
        imgDiv.append(addLink);

        var contentDiv = $("<div>");
        contentDiv.attr("class", "card-content");
        var cardTitle = $("<a>").text(attractionName);
        cardTitle.attr("href", attractionURL);
        cardTitle.attr("target", "_blank");
        cardTitle.attr("class", "card-title");
        contentDiv.append(cardTitle);

        $("<p>" + "Address: " + attractionAddress + "</p>").appendTo(
          contentDiv
        );
        if (result.subcategory) {
          $(
            "<p>" + "Category: " + result.subcategory[0].name + "</p>"
          ).appendTo(contentDiv);
        }
        resultDiv.append(contentDiv);
        colDiv.append(resultDiv);
        rowDiv.append(colDiv);
      }
      $("#attractions-div").append(rowDiv);
    }
  });
}

$("#restaurants-button").on("click", function(event) {
  event.preventDefault();
  $("#restaurants-div").empty();

  address = $("#address").val();
  cuisine = $("#cuisine").val();
  foodMethod = $("#method").val();

  $("#address").val("");
  $("#cuisine").val("");
  $("#method").val("");

  if (address === "") {
    $("#restaurants-div").text("Enter a city or address!");
    return null;
  }
  if (foodMethod === "") {
    $("#restaurants-div").text("Choose an option!");
    return null;
  } else if (foodMethod === "dine-in") {
    var settings = {
      async: true,
      crossDomain: true,
      url:
        "https://tripadvisor1.p.rapidapi.com/locations/search?limit=1&sort=relevance&query=" +
        address,
      method: "GET",
      headers: {
        "x-rapidapi-host": "tripadvisor1.p.rapidapi.com",
        "x-rapidapi-key": tripAdvisorAPIKey
      }
    };
    $.ajax(settings).then(function(response) {
      var locationID = response.data[0].result_object.location_id;
      dineInAJAX(locationID);
    });
  } else {
    eatStreetQueryURL =
      "https://eatstreet.com/publicapi/v1/restaurant/search?" +
      "access-token=" +
      eatStreetAPIKey +
      "&street-address=" +
      address +
      "&search=" +
      cuisine +
      "&method=both" +
      "&pickup-radius=100";

    $.ajax({
      url: eatStreetQueryURL,
      method: "GET"
    }).then(function(response) {
      if (!response.restaurants) {
        $("#restaurants-div").text("No search results!");
        return null;
      }
      var searchResults = response.restaurants;
      for (var i = 0; i < 4; i++) {
        var rowDiv = $("<div>");
        rowDiv.attr("class", "row");
        for (var j = 0; j < 4; j++) {
          var colDiv = $("<div>");
          colDiv.attr("class", "col s6 l3");

          var x = i * 4 + j;
          var result = searchResults[x];
          var restaurantName = result.name;
          var restaurantURL = result.website;
          var restaurantAddress =
            result.streetAddress +
            ", " +
            result.city +
            ", " +
            result.state +
            " " +
            result.zip;

          var resultDiv = $("<div>");
          resultDiv.attr("class", "card");
          var imgDiv = $("<div>");
          imgDiv.attr("class", "card-image");
          var restaurantImg = $("<img>");
          if (result.logoUrl) {
            restaurantImg.attr("src", result.logoUrl);
          }
          imgDiv.append(restaurantImg);
          resultDiv.append(imgDiv);

          var addLink = $("<a>");
          addLink.attr(
            "class",
            "btn-floating aaron halfway-fab waves-effect waves-light green"
          );
          var addButton = $("<i>").attr("class", "material-icons");
          addButton.text("add");
          addLink.append(addButton);
          imgDiv.append(addLink);

          var contentDiv = $("<div>");
          contentDiv.attr("class", "card-content");
          var cardTitle = $("<a>").text(restaurantName);
          cardTitle.attr("href", restaurantURL);
          cardTitle.attr("target", "_blank");
          cardTitle.attr("class", "card-title");
          contentDiv.append(cardTitle);

          $("<p>" + "Address: " + restaurantAddress + "</p>").appendTo(
            contentDiv
          );
          if (result.foodTypes) {
            $("<p>" + "Cuisine: " + result.foodTypes[0] + "</p>").appendTo(
              contentDiv
            );
          }
          if (result.offersPickup) {
            $("<p>" + "Offers Pick-up" + "</p>").appendTo(contentDiv);
          }
          if (result.deliveryMin) {
            $(
              "<p>" +
                "Delivery Time: " +
                result.deliveryMin +
                " minutes" +
                "</p>"
            ).appendTo(contentDiv);
          }
          resultDiv.append(contentDiv);
          colDiv.append(resultDiv);
          rowDiv.append(colDiv);
        }
        $("#restaurants-div").append(rowDiv);
      }
    });
  }
});

$("#attractions-button").on("click", function(event) {
  event.preventDefault();
  $("#attractions-div").empty();

  var city = $("#attractions-city").val();
  $("#attractions-city").val("");
  if (city === "") {
    $("#attractions-div").text("Enter a city!");
    return null;
  }
  var settings = {
    async: true,
    crossDomain: true,
    url:
      "https://tripadvisor1.p.rapidapi.com/locations/search?limit=1&sort=relevance&query=" +
      city,
    method: "GET",
    headers: {
      "x-rapidapi-host": "tripadvisor1.p.rapidapi.com",
      "x-rapidapi-key": "10701e6cc9msh93b8b8858829b24p16c255jsncff566ba3db6"
    }
  };
  $.ajax(settings).then(function(response) {
    var locationID = response.data[0].result_object.location_id;
    attractionAJAX(locationID);
  });
});

$("#parks-button").on("click", function(event) {
  event.preventDefault();
  $("#parks-div").empty();

  var state = $("#state").val();
  $("#state").val("");
  if (state === "") {
    $("#parks-div").text("Enter a state code!");
    return null;
  }
  var parksQueryURL =
    "https://developer.nps.gov/api/v1/parks?" +
    "api_key=wq73RLrCoU54B4jIoJVtJmciJfxwapJcl2GrnOQJ" +
    "&stateCode=" +
    state;

  $.ajax({
    url: parksQueryURL,
    method: "GET"
  }).then(function(response) {
    if (!response.data[0]) {
      $("#parks-div").text("No search results!");
      return null;
    }
    var searchResults = response.data;
    var parksList = $("<ul>").attr("class", "collection");
    for (var i = 0; i < searchResults.length; i++) {
      var parkListItem = $("<li>");
      parkListItem.attr("class", "collection-item");
      var parkDiv = $("<div>");
      parkListItem.append(parkDiv);

      var result = searchResults[i];
      var parkName = result.fullName;
      var parkURL = result.url;
      var parkDirectionsURL = result.directionsUrl;
      var parkDesc = result.description;

      var parkTitle = $("<a>").text(parkName);
      parkTitle.attr("href", parkURL);
      parkTitle.attr("target", "_blank");
      parkDiv.append(parkTitle);

      var addLink = $("<a>");
      addLink.attr(
        "class",
        "btn-floating aaron parks btn-large waves-effect waves-light green right"
      );
      var addButton = $("<i>").attr("class", "material-icons");
      addButton.text("add");
      addLink.append(addButton);
      parkDiv.append(addLink);

      $("<p>" + parkDesc + "</p>").appendTo(parkDiv);

      var directionsIcon = $("<i>").attr("class", "material-icons");
      directionsIcon.text("directions");
      parkDiv.append(directionsIcon);

      var parkDirections = $("<a>").text(" Directions");
      parkDirections.attr("href", parkDirectionsURL);
      parkDirections.attr("target", "_blank");
      parkDiv.append(parkDirections);

      parksList.append(parkListItem);
    }
    $("#parks-div").append(parksList);
  });
});

$("#events-button").on("click", function(event) {
  event.preventDefault();
  $("#events-div").empty();

  var city = $("#city").val();
  var eventType = $("#event-type").val();
  var startDate = $("#event-start-date").val();
  var endDate = $("#event-end-date").val();
  var startDateTime = moment(startDate).format("MMDDYYYY");
  var endDateTime = moment(endDate).format("MMDDYYYY");
  var APIKey = "BWNsZCTgpBPm9UMqEa9pb6aRAUobywTZ";

  $("#city").val("");
  $("#event-type").val("");
  $("#event-start-date").val("");
  $("#event-end-date").val("");

  if (city === "") {
    $("#events-div").text("Enter a city!");
    return null;
  }

  var TMQueryURL =
    "https://app.ticketmaster.com/discovery/v2/events.json?" +
    "size=16" +
    "&apikey=" +
    APIKey +
    "&city=" +
    city +
    "&keyword=" +
    eventType +
    //   "&startDateTime=" + startDateTime +
    //   "&endDateTime=" + endDateTime +
    "&sort=relevance,desc";

  $.ajax({
    type: "GET",
    url: TMQueryURL,
    async: true,
    dataType: "json",
    success: function(json) {
      if (!json._embedded) {
        $("#events-div").text("No search results!");
        return null;
      }
      var searchResults = json._embedded.events;
      for (var i = 0; i < 4; i++) {
        var rowDiv = $("<div>");
        rowDiv.attr("class", "row");
        for (var j = 0; j < 4; j++) {
          var colDiv = $("<div>");
          colDiv.attr("class", "col s6 l3");

          var x = i * 4 + j;
          var result = searchResults[x];
          var eventName = result.name;
          var eventImgURL = result.images[1].url;
          var eventURL = result.url;
          var eventTime = moment(result.dates.start.dateTime);
          var eventTimeString = eventTime.format("dddd, MMMM Do YYYY, h:mm a");
          var venue = result._embedded.venues[0].name;
          var city = result._embedded.venues[0].city.name;
          var state = result._embedded.venues[0].state.stateCode;
          if (result.priceRanges) {
            var minPrice = result.priceRanges[0].min;
            var maxPrice = result.priceRanges[0].max;
            var currency = result.priceRanges[0].currency;
          }

          var resultDiv = $("<div>");
          resultDiv.attr("class", "card");
          var imgDiv = $("<div>");
          imgDiv.attr("class", "card-image");
          var eventImg = $("<img>");
          eventImg.attr("src", eventImgURL);
          imgDiv.append(eventImg);
          resultDiv.append(imgDiv);

          var addLink = $("<a>");
          addLink.attr(
            "class",
            "btn-floating aaron halfway-fab waves-effect waves-light green"
          );
          var addButton = $("<i>").attr("class", "material-icons");
          addButton.text("add");
          addLink.append(addButton);
          imgDiv.append(addLink);

          var contentDiv = $("<div>");
          contentDiv.attr("class", "card-content");
          var cardTitle = $("<a>").text(eventName);
          cardTitle.attr("href", eventURL);
          cardTitle.attr("target", "_blank");
          cardTitle.attr("class", "card-title");
          contentDiv.append(cardTitle);

          $("<p>" + eventTimeString + "</p>").appendTo(contentDiv);
          $("<p>" + "Venue: " + venue + "</p>").appendTo(contentDiv);
          $("<p>" + "City: " + city + ", " + state + "</p>").appendTo(
            contentDiv
          );

          if (result.priceRanges) {
            if (minPrice === maxPrice) {
              $(
                "<p>" + "Ticket Price (" + currency + "): $" + minPrice + "</p>"
              ).appendTo(contentDiv);
            } else {
              $(
                "<p>" +
                  "Ticket Price (" +
                  currency +
                  "): $" +
                  minPrice +
                  " - $" +
                  maxPrice +
                  "</p>"
              ).appendTo(contentDiv);
            }
          }
          resultDiv.append(contentDiv);
          colDiv.append(resultDiv);
          rowDiv.append(colDiv);
        }
        $("#events-div").append(rowDiv);
      }
    },
    error: function(xhr, status, err) {
      return null;
    }
  });
});

function toggleButton(button) {
  var text = button.textContent;
  if (text === "add") {
    button.textContent = "close";
  } else {
    button.textContent = "add";
  }
  if (button.parentElement.classList.contains("red")) {
    button.parentElement.classList.remove("red");
    button.parentElement.classList.add("green");
  } else {
    button.parentElement.classList.remove("green");
    button.parentElement.classList.add("red");
  }
}

$("#events-div").on("click", function(event) {
  event.preventDefault();
  if (event.target.matches("i")) {
    var eventName =
      event.target.parentElement.parentElement.nextElementSibling.children[0];
    addItem(eventName.textContent);
    toggleButton(event.target);
  }
});

$("#restaurants-div").on("click", function(event) {
  event.preventDefault();
  if (event.target.matches("i")) {
    var restaurantName =
      event.target.parentElement.parentElement.nextElementSibling.children[0];
    addItem(restaurantName.textContent);
    toggleButton(event.target);
  }
});

$("#attractions-div").on("click", function(event) {
  event.preventDefault();
  if (event.target.matches("i")) {
    var attractionName =
      event.target.parentElement.parentElement.nextElementSibling.children[0];
    addItem(attractionName.textContent);
    toggleButton(event.target);
  }
});

$("#parks-div").on("click", function(event) {
  event.preventDefault();
  if (event.target.matches("i")) {
    var parkName = event.target.parentElement.previousElementSibling;
    addItem(parkName.textContent);
    toggleButton(event.target);
  }
});

// Aaron Modified

$(document).on("click", ".aaron", buttonFunction);

function buttonFunction() {
  let text = $(this)
    .children()
    .text();
  console.log(text);
  let parent = $(this)
    .parent()
    .parent()
    .parent();
  console.log($(this).hasClass("parks"));
  if ($(this).hasClass("parks")) {
    parent = $(this).parent();
  }
  console.log(parent);
  if (text === "close") {
    $(this).attr("data", i);
    parent
      .clone()
      .attr("data", i)
      .appendTo($(".modal-items"));
    i++;
  } else {
    let data = $(this).attr("data");
    console.log(data);
    $(".modal-items div[data = " + data + "]").remove();
  }
}

renderCart();
