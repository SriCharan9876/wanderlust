// Your LocationIQ Maps Access Token (not the API token!)
locationiq.key = mapToken;

// Initialize the map and center
var map = new maplibregl.Map({
    container: 'map',
    style: locationiq.getLayer("Streets"),
    zoom: 6,
    center: coordinates
});

//Add custom styled marker (id="marker")
var el = document.createElement('div');
el.id = 'custom-marker';
new maplibregl.Marker({element: el,anchor: 'bottom',})
.setLngLat(coordinates)
.addTo(map);

// Set map language to English
map.setLanguage('en');
