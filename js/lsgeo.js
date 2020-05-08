/**
 * File Name: lsgeo.js
 *
 * Revision History:
 *       Lirjeta Gashi, Sara Asefi, 2020-04-16 : Created
 */

var lat;
var lng;
var alt;

function showMap(){
    //initialize platform object
    var platform = new H.service.Platform({
       'apikey': 'gRS7FCIKzr2P00KzDcPLfpFDwFTiB7Z7qhiZiWrJ0Xc'
    });

    // Obtain the default map type from patform object
    var mapTypes = platform.createDefaultLayers();

    //instantiate and display a map object
    var map = new H.Map(
        document.getElementById('mapContainer'),
        mapTypes.vector.normal.map,
        {
            zoom: 15,
            center: {
                lng: lng,
                lat: lat
            }


        }
    );

    //add a marker at current location
    var icon = new H.map.Icon('img/gps.png');
    var marker = new H.map.Marker(
        {
            lat: lat,
            lng: lng
        },
        {
            icon: icon
        }
    );

    //add marker to the map
    map.addObject(marker);
    

}



function getPosition() {
    try {
        if(navigator.geolocation != null){
            //service is available
            //fetch our location
            var options = {
                enableHighAccuracy: true,
                timeout: 60000,
                maximumAge: 0
            };

            function successCallback(position){
                var coordinates = position.coords;
                lat = coordinates.latitude;
                lng = coordinates.longitude;
                alt = coordinates.altitude;

                console.info("Latitude: " + lat);
                console.info("Longitude: " + lng);
                console.info("Altitude: " + alt);

                // show map here
                showMap();
            }
            function errorCallback(error){
                var msg = "";
                try{
                    if(error){
                        switch (error.code) {
                            case error.TIMEOUT:
                                msg = "TIMEOUT: " + error.message;
                                break;
                            case error.PERMISSION_DENIED:
                                msg = "PERMISSION_DENIED: " + error.message;
                                break;
                            case error.POSITION_UNAVAILABLE:
                                msg = "POSITION_UNAVAILABLE: " + error.message;
                                break;
                            default:
                                msg = "UNHANDLED MESSAGE CODE:( " + error.code + ") : " + error.message;
                                break;
                        }

                        console.error(msg);
                    }

                } catch (e) {
                    console.error("Exception in errorCallback(): " + e);
                }
            }
            navigator.geolocation.getCurrentPosition(successCallback, errorCallback, options);
        }
        else{
            //service is not available
            console.error("Geolocation is not supported");
        }
    }catch (e) {
        console.error("Exception in getPosition(): " + e);
    }

}
