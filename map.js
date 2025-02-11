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
    { name: "Hlavní nádraží (šalina)", lat: 49.1910819, lon: 16.6119806, details: "-> Konečného náměstí: 12<br>-> Křídlovická: 7,8"},
    { name: "Hlavní nádraží (šalina)", lat: 49.1911964, lon: 16.6118964, details: "-> Poříčí: 2"},
    { name: "Opuštěná (bus)", lat: 49.1858789, lon: 16.6139697, details: "-> Poříčí: 84"},
    { name: "Konečného náměstí (trolej)", lat: 49.2050475, lon: 16.5958253, details: "-> Mendlovo náměstí: 25, 26"},
    { name: "Konečného náměstí (šalina)", lat: 49.2039908, lon: 16.5960158, details: "-> Hlavní nádraží: 12"},
    { name: "Mendlovo náměstí (trolej)", lat: 49.1898614, lon: 16.5931872, details: "-> Konečného náměstí: 25, 26"},
    { name: "Poříčí (šalina)", lat: 49.1874200, lon: 16.5945319, details: "-> Hlavní nádraží: 2"},
    { name: "Poříčí (bus)", lat: 49.1871567, lon: 16.5946103, details: "-> Opuštěná: 44"},
    { name: "Grand Hotel (bus dálkový)", lat: 49.1935158, lon: 16.6144772},
    { name: "Zvonařka (bus dálkový)", lat: 49.1858217, lon: 16.6167317},
]

// Data restaurace
var restaurants = [
    { name: "Everest Indie", lat: 49.2033717, lon: 16.5965519, url: "www.everestbrno.cz", desc: "Velké porce za málo peněz"},
    { name: "Pho Eden", lat: 49.2035833, lon: 16.5962469, url: "https://www.facebook.com/people/Pho-Eden", desc: "Nejlepší Pho v Brně, ale bývá plno"},
    { name: "Chef Viet", lat: 49.2061636, lon: 16.5964289, url: "https://chefviet.cz/", desc: "Supr když je ve Pho Eden plno"},
    { name: "Siwa", lat: 49.2009106, lon: 16.6003492, url: "http://www.siwaorient.cz/", desc: "Orientální kuchyň, blízký východ"},
    { name: "Pivní stáj", lat: 49.2011931, lon: 16.5999325, url: "https://www.pivnistaj.cz/", desc: "Fajn obědové burgry"},
    { name: "Mulgogi", lat: 49.2027014, lon: 16.5974736, url: "https://mulgogi.cz/", desc: "Korejšká kuchyň"},
    { name: "Immigrant", lat: 49.2031617, lon: 16.5968136, url: "https://www.theimmigrant.cz/", desc: "Když je chuť na Guiness"},
    { name: "Mitrovski", lat: 49.1881367, lon: 16.5888422, url: "www.mitrovski.cz"},
    { name: "AN wok & grill", lat: 49.1885022, lon: 16.5944053, url: "www.facebook.com/anwokgrill"},
    { name: "Pivovarská Mendlák s.r.o.", lat: 49.1909661, lon: 16.5927697, url: "https://www.pivovarska-starobrno.cz", desc: "České klasiky"},
    { name: "Bonjour Vietnam", lat: 49.1884711, lon: 16.5976431, url: "www.facebook.com/Bonjour-Vietnam"},
    { name: "Sorry - pečeme jinak", lat: 49.1888186, lon: 16.5950008, url: "www.sorry-jinak.cz", desc: "Skvělé kafe a dortíky <3"},
    { name: "Ramen Brno", lat: 49.1890425, lon: 16.5955769, url: "https://ramen-brno.cz/", desc: "Nejlepší Ramen v Brně, Otevřeno 11-14 a 17-20"},
]

// Data hospody
var pubs = [
    { name: "Mitrovski", lat: 49.1881367, lon: 16.5888422, url: "www.mitrovski.cz"},
    { name: "Pivovarská Mendlák s.r.o.", lat: 49.1909661, lon: 16.5927697, url: "https://www.pivovarska-starobrno.cz"},
    { name: "U všech svatých", lat: 49.1887736, lon: 16.5975906, url: "www.facebook.com/uvsechsvatych", desc: "Ochutnejte višňovku s chilli"},
    { name: "Immigrant", lat: 49.2031617, lon: 16.5968136, url: "https://www.theimmigrant.cz/", desc: "Když je chuť na Guiness"},
    { name: "Na dobré cestě", lat: 49.2028956, lon: 16.5984131, url: "http://jsmenadobreceste.cz/", desc: "Hospoda s atmosférou, supr Dalešice"},
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
        .bindTooltip(`<b>${venue.name}</b>`, {permanent: true, direction: 'top', offset: [0,-20], opacity:0.75})
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
    var marker = L.marker([restaurant.lat, restaurant.lon], { icon: createAwesomeMarker('utensils', 'darkpurple') })
    if (restaurant.desc === undefined) {
        marker.bindTooltip(`<b>${restaurant.name}</b><br><a href='${restaurant.url}' target='_blank'>${restaurant.url}</a>`);
    } else {
        marker.bindTooltip(`<b>${restaurant.name}</b><br><a href='${restaurant.url}' target='_blank'>${restaurant.url}</a><br>Náš tip: ${restaurant.desc}`);
    };
    marker.addTo(restaurantsLayer);
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
function getUrlParams() {
    const params = new URLSearchParams(window.location.search);
    return params.get('layers') ? params.get('layers').split(',') : [];
}

var activeLayers = getUrlParams();

// Enable only selected layers based on URL parameters
if (activeLayers.includes("hotels")) hotelsLayer.addTo(map);
if (activeLayers.includes("restaurants")) restaurantsLayer.addTo(map);
if (activeLayers.includes("pubs")) pubsLayer.addTo(map);
if (activeLayers.includes("transport")) transportLayer.addTo(map);
if (activeLayers.includes("venue")) venueLayer.addTo(map);

// Přepínač vrstev
var overlayMaps = {
    "Místo konference": venueLayer,
    "Hotely": hotelsLayer,
    "Restaurace": restaurantsLayer,
    "Hospody": pubsLayer,
    "Doprava": transportLayer
};

L.control.layers(null, overlayMaps, { collapsed: false }).addTo(map);