var map = L.map("map", {zoomControl: false}).setView([51.505, -0.09], 13);
const btnLocation = document.getElementById('getLocation');
let ipAddress = document.querySelector('.ipaddress-text');
let locationText = document.querySelector('.location-text');
let timeZone = document.querySelector('.timezone-text');
let isp = document.querySelector('.isp-text');

L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
  maxZoom: 19,
  attribution:
    '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
}).addTo(map);

// Change location marker

var myIcon = L.icon({
  iconUrl: "assets/images/icon-location.svg",
  iconSize: [46, 56],
});

const marker = L.marker([51.5, -0.09], { icon: myIcon }).addTo(map);

// Get Data for IP or domain

const getIp = async () => {
  let latlng = document.getElementById("ip_domain");
  const url = `https://geo.ipify.org/api/v2/country,city?apiKey=at_CDDIh01UcciLXgO2sGrXjhnX3Vl9c&ipAddress=${latlng.value}&domain=${latlng.value}`;
  const res = await fetch(url);
  const data = await res.json();
  if (res.status != 400) {
    map.setView([data.location.lat, data.location.lng], 16);
    const marker = L.marker([data.location.lat, data.location.lng], { icon: myIcon }).addTo(map);
    ipAddress.textContent = data.ip;
    locationText.textContent = data.location.city;
    timeZone.textContent = data.location.timezone;
    isp.textContent = data.isp;
    const popup = L.popup()
      .setLatLng([data.location.lat, data.location.lng])
      .setContent(data.location.city)
      .openOn(map);
    latlng.value = '';
  }
  else{
    console.clear();
    alert('IP address or domain not found...');
    latlng.value = '';
  }
};

document.getElementById('form').addEventListener('submit', (e) => {
  e.preventDefault();
  getIp();
});

// Get user latitude and longitude on window load

window.onload = () => {
  if (window.navigator.geolocation) {
    window.navigator.geolocation.getCurrentPosition(success)
  }
  else{
    return;
  }
  function success(position){
    let lat = position.coords.latitude;
    let lng = position.coords.longitude;
    map.setView([lat, lng], 16);
    const marker = L.marker([lat, lng], { icon: myIcon }).addTo(map);
  }
}