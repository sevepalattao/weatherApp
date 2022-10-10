function getWeather (lat, lon) {
    var requestUrl = 'https://api.openweathermap.org/data/3.0/onecall?lat=' + lat + '&lon=' + lon + '&exclude=minutely,hourly,alerts&appid=4013a002f8318887eb591e193340e547&units=imperial';
    fetch(requestUrl)
      .then(function (response) {
        return response.json();
      })
      .then(function(data) {
        console.log(data);
        var deck = $(".card-deck");
        deck.empty();
        $("#temp").text('Temp: ' + data.current.temp + '°F');
        $("#wind").text("Wind: " + data.current.wind_speed + 'MPH');
        $("#humid").text("Humidity: " + data.current.humidity + '%');
        $("#5day-header").text("5-day Forecast: ");
        for (i=1; i < 6; i++) {
            var forecast = $("<div class='card text-white bg-primary mb-3 d-inline-block'>");
            var temperature = $("<p>");
            var windy = $("<p>");
            var humidi = $("<p>");
            var date = $("<h5>");
            date.text(moment.unix(data.daily[i].dt).format("dddd MM/DD/YYYY"));
            temperature.text("Temp: " + data.daily[i].temp.day + '°F');
            windy.text("Wind: " + data.daily[i].wind_speed + 'MPH');
            humidi.text("Humidity: " + data.daily[i].humidity + '%');
            forecast.append(date);
            forecast.append(temperature);
            forecast.append(windy);
            forecast.append(humidi);
            deck.append(forecast);
        }
      });
}

var searchBtn = $("#search");
searchBtn.on('click', function(event) {
    event.preventDefault();
    var city = $("#input");
    var urlRequest = 'http://api.openweathermap.org/geo/1.0/direct?q=' + city.val() + '&appid=4013a002f8318887eb591e193340e547';
    fetch(urlRequest)
      .then(function(response) {
        return response.json();
      })
      .then(function(data) {
        getWeather(data[0].lat, data[0].lon);
      });
    var history = $('#history');
    var cityBtn = $('<button>');
    capital = city.val().charAt(0).toUpperCase() + city.val().slice(1);
    cityBtn.addClass("list-group-item list-group-item-action");
    $('#name').text(capital + ' ' + moment().format("L"));
    cityBtn.text(capital);
    history.append(cityBtn);
    city.val('');
});

