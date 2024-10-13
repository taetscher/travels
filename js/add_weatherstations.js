import {reprojectFromLink} from './reproject.js'

export async function addWeather(map, popup) {
    /**
    *Add source, layer and user interaction of wather measuring stations to map
    *@param  {mapbox map object}   map   The map which receives the weather stations layer
    *@param  {mapbox popup object} popup The mapbox popup object which receives tooltip information
    */
    
    var reproject = await reprojectFromLink('https://data.geo.admin.ch/ch.meteoschweiz.messwerte-lufttemperatur-10min/ch.meteoschweiz.messwerte-lufttemperatur-10min_de.json', 'EPSG:4326');
    
    var ms_live = reproject[0];
    var timestamp = reproject[1];
    
    //add source
    map.addSource('weatherstations_source', {
        type: 'geojson',
        data: {
            type: 'FeatureCollection',
            features: ms_live.features
        },
        attribution: 'Bundesamt für Meteorologie und Klimatologie MeteoSchweiz'
    });
    
    //add layer
    map.addLayer({
        id: 'Wetterstationen',
        type: 'circle',
        source: 'weatherstations_source',
        minzoom: 10,
        maxzoom: 19,
        metadata: {timestamp: timestamp}
    });
    
    
    //-------------- USER INTERACTION HANDLING START --------------------
    //display popup on mouseenter
    map.on('mouseenter', 'Wetterstationen', function (e) {
        
        console.log(e)

        // Change the cursor style as a UI indicator.
        map.getCanvas().style.cursor = 'pointer';
        
        //get data
        var coordinates = e.features[0].geometry.coordinates.slice();
        var station = e.features[0].properties.id;
        var name = e.features[0].properties['station_name'];
        var mUm = e.features[0].properties.altitude;
        var temp = e.features[0].properties.value;
        var timestamp = e.features[0].properties.reference_ts;

        //create text snippets
        var t1 = '<h6>'+station+'</h6>';
        var t2 = 'Stationsname: '+name+'<br>';
        var t3 = 'Temperatur (°C): '+temp+'<br>';
        var t4 = 'Höhe (M.ü.M): '+mUm+'<br>';
        var t5 = 'Timestamp: '+timestamp;
        
        //combine text snippets
        var text = t1+t2+t3+t4+t5;
        
        // Ensure that if the map is zoomed out such that multiple
        // copies of the feature are visible, the popup appears
        // over the copy being pointed to.
        while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
        coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
        }

        // Populate the popup and set its coordinates
        // based on the feature found.
        popup.setLngLat(coordinates).setHTML(text).addTo(map);
    });
    
    //remove popup on mousleave
    map.on('mouseleave', 'Wetterstationen', function () {
        map.getCanvas().style.cursor = '';
        if (popup) popup.remove();
    });
    
    //-------------- USER INTERACTION HANDLING END --------------------
};


function parseTimestamp(timestamp){
    /** Takes timestamps of format {201905211320} and turns them into dd.yy.mm hh:mm
    */
    
    var timestamp = String(timestamp)
    
    var date = timestamp.slice(0,8);
    var time = timestamp.slice(8,)
    
    var year = date.substr(0,4);
    var month = date.substr(4,2);
    var day = date.substr(6,);
                   
    var hour = time.substr(0,2);
    var min = time.substr(2,);
    
    
    return day+'.'+month+'.'+year+' '+hour+':'+min

};
