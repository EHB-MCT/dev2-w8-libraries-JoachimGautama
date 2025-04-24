const potty = `https://opendata.bruxelles.be/api/explore/v2.1/catalog/datasets/toilettes_publiques_vbx/records`;
let map = L.map("map").setView([50.8477, 4.3572], 13);

init();

function init() {
  L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
    maxZoom: 19,
    attribution:
      '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
  }).addTo(map);

  loadMarkers();
}

function loadMarkers() {
  fetch(potty + "?limit=100")
    .then(function (data) {
      console.log("fetch ok");
      return data.json();
    })
    .catch((error) => console.error(error, "it's fucked"))
    .then(function (data) {
      data.results.forEach(function (e) {
        addMarker(e.geo_point_2d.lat, e.geo_point_2d.lon);
      });
    });
}

function addMarker(lat, lon) {
  let marker = L.marker([lat, lon]).addTo(map);
  marker.bindPopup("location");
}
