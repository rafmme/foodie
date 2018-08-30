const toggleBtn = () => {
    const x = document.getElementById("myTopnav");
    if (x.className === "topnav") {
        x.className += " responsive";
    } else {
        x.className = "topnav";
    }
}

function initMap() {
    const locale = { lat: 6.5538235, lng: 3.3664734 };
    const map = new google.maps.Map(document.getElementById('map'), { zoom: 15, center: locale });
    const marker = new google.maps.Marker({
        position: locale,
        map
    });

    const infoWindow = new google.maps.InfoWindow({
        content: `<p style="font-weight: bolder">Pets Mart Head Office Location</p>`
    });
    marker.addListener('click', () => {
        infoWindow.open(map, marker);
    });
}