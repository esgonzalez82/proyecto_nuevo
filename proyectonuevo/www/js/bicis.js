// delimitar el mapa
var corner1 = L.latLng(41.416444, 2.117488);//topLeft
corner2 = L.latLng(41.328847, 2.232844);//bottomRight
bounds = L.latLngBounds(corner1, corner2);

//centrar el mapa
var map = L.map('map', {
    center: [41.386962, 2.170091],
    zoom: 16,
    minZoom: 15,
    maxZoom: 17,
    maxBounds: bounds,
});

//declarar que el mapa es local
var OpenStreetMap_Mapnik = L.tileLayer('tiles/{z}/{x}/{y}.png', {
	attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
});
OpenStreetMap_Mapnik.addTo(map);


// crear market de audios e historia
//marker = L.marker([38.537344, -0.126563]).addTo(map)
//.bindPopup("<h1>Título 1</h1>La historia<br /><a href='www.w3schools.com'>Ver mas...</a><br />");
//marker.bindPopup("<h1>Título</h1>La historia<br /><a href='www.w3schools.com'>Ver mas...</a><br />" + e.latlng).openPopup();
//marker2 = L.marker([38.53667,-0.12945]).addTo(map)
//.bindPopup("<h1>Título 2</h1>La historia<br /><a href='www.w3schools.com'>Ver mas...</a><br />");



// atributos del puntero de la ubicación
var puntero = L.icon({
    iconUrl: 'miubicacion.png',
//  shadowUrl: 'leaf-shadow.png',
    iconSize:     [15, 15], // size of the icon
    popupAnchor:  [0, -20] // point from which the popup should open relative to the iconAnchor
});

//me localiza, centra el mapa y declaro los atributos de la geolocalización
center_map_on_location();

function center_map_on_location(){
   	 map.locate({
   	 	setView: false,
   	 	watch: true,
   	 	maxZoom: 16,   	 	
   	 	});
	 	
}

var markerpunto = L.marker([0,0], {icon: puntero}, {draggable: true});
markerpunto.addTo(map);
	
function onLocationFound(e) {
	var radius = e.accuracy / 2;
	
  	markerpunto.setLatLng(e.latlng);
  	
  	markerpunto.bindPopup("You are within " + radius + " meters from this point");
	
	// vemos si la ubicacion esta en el rango
	var cont = bounds.contains(e.latlng);
	if (cont===false){
		 document.getElementById('mensaje').innerHTML="Su ubicación no se encuentra en el rango del mapa <br />" + e.latlng;
		}else{
		 document.getElementById('mensaje').innerHTML="Su ubicación no se encuentra en el rango del mapa <br />" + e.latlng;
		}

    
}
map.on('locationfound', onLocationFound);



//si no me lacaliza doy el mensaje de error
function onLocationError(e) {
	var message = "Error al intentar localizarlo."
    alert(e.message);
}
map.on('locationerror', onLocationError);




//si no me lacaliza doy el mensaje de error
function onLocationError(e) {
	var message = "Error al intentar localizarlo."
    alert(e.message);
}
map.on('locationerror', onLocationError);


var watchProcess = null;
 

 
    if (navigator.geolocation) {
        // geolocation IS available
        if (watchProcess == null) {  
            watchProcess = navigator.geolocation.watchPosition(geo_success, geo_error, geo_options);  
        }  
    } else {
        // geolocation IS NOT available
        geo_is_not_available();  
    }

function geo_success(position) {
    var latitude  = position.coords.latitude;
    var longitude = position.coords.longitude;
    var accuracy  = position.coords.accuracy;
}
 
function geo_error(error) {
    document.getElementById("out").innerHTML = '<p>ERROR(' + error.code + '): ' + error.message + '</p>';
}
 
function geo_is_not_available() {
    document.getElementById("out").innerHTML = "<p>Geolocation is not supported by your browser</p>";
}
