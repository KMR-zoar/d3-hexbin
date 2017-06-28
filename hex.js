var center = [36.06, 139.3440306];

var osmUrl = 'http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
    osmAttrib = '&copy; <a href="http://openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    osm = L.tileLayer(osmUrl, {maxZoom: 18, attribution: osmAttrib});

map = new L.Map('map', {layers: [osm], center: new L.LatLng(center[0], center[1]), zoom: 9});

var options = {
    radius : 12,
    opacity: 0.6,
    duration: 500
};

var hexLayer = L.hexbinLayer(options).addTo(map)
hexLayer.colorScale().range(['white', 'blue']);

hexLayer
  .radiusRange([6, 11])
  .lng(function(d) { return d[0]; })
  .lat(function(d) { return d[1]; })
  .colorValue(function(d) { return d.length; })
  .radiusValue(function(d) { return d.length; });

d3.json('convenience.geojson', function(json) {
   var points = json.features;
   var data = [];
   points.forEach(function(feature){
      data.push(feature.geometry.coordinates);
   });
   hexLayer.data(data);
});

var hash = new L.Hash(map);
