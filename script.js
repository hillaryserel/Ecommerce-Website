$(document).ready(function () {
    // Smooth scroll for anchor links
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

    // Hide menu items on click
    $(".menu-items a").click(function () {
        $("#checkbox").prop("checked", false);
    });
    
    // Initialize the map
    var map = L.map('map').setView([-1.2909493949631206, 36.714898326804374], 14);

    // Add OpenStreetMap tile layer
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 13,
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);

    // HTML5 Geolocation
    let marker, circle, zoomed;
    navigator.geolocation.watchPosition(success, error);

    function success(pos) {
        const lat = pos.coords.latitude;
        const lng = pos.coords.longitude;
        const accuracy = pos.coords.accuracy;

        // Remove existing marker and circle if they exist
        if (marker) {
            map.removeLayer(marker);
            map.removeLayer(circle);
        }

        // Add marker and circle to map
        marker = L.marker([lat, lng]).addTo(map);
        circle = L.circle([lat, lng], { radius: accuracy }).addTo(map);

        // Zoom to the accuracy circle bounds
        if (!zoomed) {
            zoomed = map.fitBounds(circle.getBounds());
        }

        // Set map view to current position
        map.setView([lat, lng]);
    }

    function error(err) {
        if (err.code === 1) {
            alert("Please allow location access.");
        } else {
            alert("Cannot get current location.");
        }
    }

    
});
