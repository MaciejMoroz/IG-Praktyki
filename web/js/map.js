
function initMap() {
  let ig = { lat: 53.1159108, lng: 23.1261896 };
  let pinImg = "../img/pin.png";
  let map = new google.maps.Map(document.getElementById("map"), {
    zoom: 5,
    center: ig,
    mapTypeId: "roadmap",
    disableDefaultUI: true,
    styles: [
      {
        featureType: "all",
        stylers: [{ color: "#F9F9F9" }]
      },

      {
        featureType: "water",
        elementType: "geometry",
        stylers: [{ color: "#f1f1f1" }]
      },
      {
        featureType: "road",
        elementType: "geometry",
        stylers: [{ color: "#f1f1f1" }]
      },
      {
        featureType: "road",
        elementType: "labels.text.fill",
        stylers: [
          {
            color: "#636363"
          }
        ]
      },
      {
        featureType: "road",
        elementType: "geometry",
        stylers: [
          {
            visibility: "on",
            color: "#636363"
          }
        ]
      },
      {
        featureType: "administrative",
        elementType: "geometry",
        stylers: [{ color: "#FEFEFE" }]
      },
      {
        featureType: "administrative.locality",
        elementType: "labels.text.fill",
        stylers: [{ color: "#939393" }]
      }
    ]
  });

  let marker = new google.maps.Marker({ position: ig, map: map, icon: pinImg });
}
