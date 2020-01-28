var map = L.map('map').setView([40.19, -101.43], 3);

L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/256/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: 'mapbox/navigation-guidance-night-v4',
    accessToken: 'pk.eyJ1Ijoic29waGllYnJvb2tzIiwiYSI6ImNrMnRlMHp4dzFhZjUzZHVpbTU4NGdtNzAifQ.otHIDTG44NYlG-DJXSQKSQ',
}).addTo(map);

var control = L.Routing.control({
          //waypoints: [
              //null
              //L.latLng(47.252899, -122.452714),
              //L.latLng(47.318017, -122.542970),
              //L.latLng(47.258024, -122.444725)
          //],
           show: false,
           units:'imperial',
           router: L.Routing.mapbox('pk.eyJ1Ijoic29waGllYnJvb2tzIiwiYSI6ImNrMnRlMHp4dzFhZjUzZHVpbTU4NGdtNzAifQ.otHIDTG44NYlG-DJXSQKSQ'),
           geocoder:L.Control.Geocoder.mapbox('pk.eyJ1Ijoic29waGllYnJvb2tzIiwiYSI6ImNrMnRlMHp4dzFhZjUzZHVpbTU4NGdtNzAifQ.otHIDTG44NYlG-DJXSQKSQ'),
           collapsible: true,
           routeWhileDragging: true
      }).addTo(map);

function createButton(label, container) {
          var btn = L.DomUtil.create('button', '', container);
          btn.setAttribute('type', 'button');
          btn.innerHTML = label;
          return btn;
      }

      map.on('click', function(e) {

          var container = L.DomUtil.create('div'),
              startBtn = createButton('Start from this location', container),
              destBtn = createButton('Go to this location', container);
              L.DomEvent.on(startBtn, 'click', function() {
                control.spliceWaypoints(0, 1, e.latlng);
                map.closePopup();
                  });
              L.DomEvent.on(destBtn, 'click', function() {
                control.spliceWaypoints(control.getWaypoints().length - 1, 1, e.latlng);
                control.show();
                map.closePopup();
    });
          L.popup()
              .setContent(container)
              .setLatLng(e.latlng)
              .openOn(map);
       });

function onLocationFound(e) {
           L.marker(e.latlng).addTo(map)
               .bindPopup("<center><b>You are here</b><br>" + "<i>Click anywhere on the map to create a starting point and end point to receive directions on the right.</i>").openPopup();
       }

       map.on('locationfound', onLocationFound);
function onLocationError(e) {
         alert(e.message);
       }
       map.on('locationerror', onLocationError);
       map.locate({setView: true, maxZoom: 13});
