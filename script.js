       
$(document).ready(function () {
    $("a").on("click", function (event) {
      if (this.hash !== "") {
        event.preventDefault();
  
        var hash = this.hash;
        $("html, body").animate(
          {
            scrollTop: $(hash).offset().top,
          },
          800,
          function () {
            window.location.hash = hash;
          }
        );
      }
    });
  });
  
  $(".menu-items a").click(function () {
    $("#checkbox").prop("checked", false);
  });

  //initialize the map and set its view to our chosen geographical coordinates and a zoom level
  var map = L.map('map').setView([-1.2909493949631206, 36.714898326804374], 10);

  //add a tile layer to add to our map, in this case it’s a OpenStreetMap tile layer
  L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);

//HTML5 Navigation
navigator.geolocation.watchPosition(success, error);

function success(position){
    const lat = pos.coords.latitude;
    const lng = pos.coords.longitude;
    const accuracy = pos.coords.accuracy;

   let marker= L.marker([lat, lng]).addTo(map);
   let circle= L.marker([lat, lng], {radius, accuracy}).addTo(map);

    map.fitBoundS(circle.getBounds());
}

function error(err){
    if (err.code === 1){
        alert("Please allow location access");
    }else{
        alert("Cannot get current location");
    }
}

