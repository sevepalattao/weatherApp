function getWeather (lat, lon) {
    var requestUrl = 'https://api.openweathermap.org/data/2.5/forecast?lat=' + lat + '&lon=' + lon + '&appid=4013a002f8318887eb591e193340e547';
    fetch(requestUrl)
      .then(function (response) {
      return response.json();
      })
      .then(function(data) {
        console.log(data);
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
        getWeather(data[0].lat, data[0].lon)
      });
    var history = $('#history');
    var cityBtn = $('<button>');
    cityBtn.addClass("list-group-item list-group-item-action");
    cityBtn.text(city.val());
    history.append(cityBtn);
    city.val('');

});