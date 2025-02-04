var map = L.map('map').setView([49.1951, 16.6068], 14); // Brno

map.attributionControl._attributions = {};
map.attributionControl.setPrefix();
map.zoomControl.setPosition('topleft');
L.control.scale({ imperial: false, maxwidth: 200 }).addTo(map);

// Podkladová vrstva
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; OpenStreetMap contributors'
}).addTo(map);

// Vytvoření vrstev pro různé kategorie
var venueLayer = L.layerGroup( );
var hotelsLayer = L.layerGroup();
var restaurantsLayer = L.layerGroup();
var pubsLayer = L.layerGroup();
var transportLayer = L.layerGroup();

// Data konference
var venues = [
    { name: "Přednášky", lat: 49.1872236, lon: 16.5953722 },
    { name: "Workshopy", lat: 49.2048511, lon: 16.5971842 },
    { name: "Gala Dinner", lat: 49.1910856, lon: 16.5934833 }
];

// Data hotelů
var hotels = [
    { name: "Hotel Continental", lat: 49.2008372, lon: 16.6047236, url: "https://www.continentalbrno.cz/" },
    { name: "Hotel International", lat: 49.1949844, lon: 16.6054842, url: "https://www.hotelinternational.cz/" },
    { name: "Hotel Passage", lat: 49.2020472, lon: 16.6069742, url: "https://www.hotelpassage.eu/" },
    { name: "Grandhotel Brno", lat: 49.1925583, lon: 16.6131561, url: "https://grandhotelbrno.cz/" },
    { name: "OREA Congress Hotel Brno", lat: 49.1857186, lon: 16.5853642, url: "https://www.orea.cz/hotel-congress-brno" },
    { name: "Courtyard by Marriott Brno", lat: 49.1822556, lon: 16.6059447, url: "https://www.courtyardbrno.cz" },
    { name: "A-Austerlitz Hotel", lat: 49.1860228, lon: 16.5943789, url: "https://www.austerlitzhotel.cz" },
    { name: "Hotel Sharingham", lat: 49.1860853, lon: 16.5954553, url: "https://www.sharingham.cz" },
    { name: "Fairhotel", lat: 49.1858247, lon: 16.5871322, url: "https://www.fairhotel.cz" },
    { name: "Hotel Pyramida", lat: 49.1866667, lon: 16.5981619, url: "https://www.pyramidahotel.cz" }
];

// Data doprava
var transport = [
    { name: "Hlavní nádraží (vlak)", lat: 49.1905822, lon: 16.6128025},
    { name: "Hlavní nádraží (šalina)", lat: 49.1910819, lon: 16.6119806, details: "-> Konečného náměstí: 12"},
    { name: "Hlavní nádraží (šalina)", lat: 49.1911964, lon: 16.6118964, details: "-> Poříčí: 2"},
    { name: "Konečného náměstí (trolej)", lat: 49.2050475, lon: 16.5958253, details: "-> Mendlovo náměstí: 25, 26"},
    { name: "Konečného náměstí (šalina)", lat: 49.2039908, lon: 16.5960158, details: "-> Hlavní nádraží: 12"},
    { name: "Mendlovo náměstí (trolej)", lat: 49.1898614, lon: 16.5931872, details: "-> Konečného náměstí: 25, 26"},
    { name: "Poříčí (šalina)", lat: 49.1874200, lon: 16.5945319, details: "-> Hlavní nádraží: 2"},
]

// Data restaurace
var restaurants = [
    { name: "Mitrovski", lat: 49.1881367, lon: 16.5888422, url: "www.mitrovski.cz"},
    { name: "AN wok & grill", lat: 49.1885022, lon: 16.5944053, url: "www.facebook.com/anwokgrill"},
    { name: "Pivovarská Mendlák s.r.o.", lat: 49.1909661, lon: 16.5927697, url: "https://www.pivovarska-starobrno.cz"}
]

// Data hospody
var pubs = [
    { name: "Mitrovski", lat: 49.1881367, lon: 16.5888422, url: "www.mitrovski.cz"},
    { name: "Pivovarská Mendlák s.r.o.", lat: 49.1909661, lon: 16.5927697, url: "https://www.pivovarska-starobrno.cz"},
    { name: "U všech svatých", lat: 49.1887736, lon: 16.5975906, url: "www.facebook.com/uvsechsvatych", desc: "Ochutnejte višňovku s chilli"}
]

function createAwesomeMarker(icon, markerColor) {
    return L.AwesomeMarkers.icon({
        icon: icon,
        prefix: 'fa',
        markerColor: markerColor
    });
}

// Přidání míst konference
venues.forEach(function(venue) {
    L.marker([venue.lat, venue.lon], { icon: createAwesomeMarker('circle', 'red') })
        .bindTooltip(`<b>${venue.name}</b>`)
        .addTo(venueLayer);
});

// Přidání míst dopravy
transport.forEach(function(node) {
    var marker = L.marker([node.lat, node.lon], { icon: createAwesomeMarker('bus', 'purple') })
    if (node.details === undefined) {
        marker.bindTooltip(`<b>${node.name}</b>`);
    } else {
        marker.bindTooltip(`<b>${node.name}</b><br>${node.details}`);
    };
    marker.addTo(transportLayer);
});

// Přidání hotelů
hotels.forEach(function(hotel) {
    L.marker([hotel.lat, hotel.lon], { icon: createAwesomeMarker('bed', 'darkblue') })
        .bindTooltip(`<b>${hotel.name}</b><br><a href='${hotel.url}' target='_blank'>${hotel.url}</a>`)
        .addTo(hotelsLayer);
});

// Přidání restaurací
restaurants.forEach(function(restaurant) {
    L.marker([restaurant.lat, restaurant.lon], { icon: createAwesomeMarker('utensils', 'darkpurple') })
        .bindTooltip(`<b>${restaurant.name}</b><br><a href='${restaurant.url}' target='_blank'>${restaurant.url}</a>`)
        .addTo(restaurantsLayer);
});

// Přidání hospod
pubs.forEach(function(pub) {
    var marker = L.marker([pub.lat, pub.lon], { icon: createAwesomeMarker('beer-mug-empty', 'orange') })
    if (pub.desc === undefined) {
        marker.bindTooltip(`<b>${pub.name}</b><br><a href='${pub.url}' target='_blank'>${pub.url}</a>`);
    } else {
        marker.bindTooltip(`<b>${pub.name}</b><br><a href='${pub.url}' target='_blank'>${pub.url}</a><br>Náš tip: ${pub.desc}`);
    };
    marker.addTo(pubsLayer);
});


// Přidání vrstev do mapy
venueLayer.addTo(map);
transportLayer.addTo(map);
restaurantsLayer.addTo(map);
pubsLayer.addTo(map);
hotelsLayer.addTo(map);

// Přepínač vrstev
var overlayMaps = {
    "Místo konference": venueLayer,
    "Hotely": hotelsLayer,
    "Restaurace": restaurantsLayer,
    "Hospody": pubsLayer,
    "Doprava": transportLayer
};

L.control.layers(null, overlayMaps, { collapsed: false }).addTo(map);