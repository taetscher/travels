import {reprojectFromLink} from './reproject.js'

export async function addFlussMess(map, popup) {
    /**
    *Add source, layer and user interaction of river measuring stations to map
    *@param  {mapbox map object}   map   The map which receives the river measuring stations layer
    *@param  {mapbox popup object} popup The mapbox popup object which receives tooltip information
    */
    
    // The data here is in EPSG:21781 and needs to be converted to EPSG:3857 in order to be displayed properly
    
    var reproject = await reprojectFromLink('https://data.geo.admin.ch/ch.bafu.hydroweb-messstationen_temperatur/ch.bafu.hydroweb-messstationen_temperatur_de.json', 'EPSG:4326');
    
    var bafu_live = reproject[0];
    var timestamp = reproject[1];
    
    //add source
    map.addSource('flussMess', {
        type: 'geojson',
        data: {
            type: 'FeatureCollection',
            features: bafu_live.features
        },
        attribution: 'Bundesamt für Umwelt BAFU'
    });
    
    //add layer
    map.addLayer({
        id: 'FlussMessstationen',
        type: 'circle',
        source: 'flussMess',
        minzoom: 10,
        maxzoom: 19,
        metadata: {timestamp: timestamp}
    });
    
    
    //-------------- USER INTERACTION HANDLING START --------------------

    //display popup on mouseenter
    map.on('mouseenter', 'FlussMessstationen', function (e) {
        
        //console.log(e)
        
        // Change the cursor style as a UI indicator.
        map.getCanvas().style.cursor = 'pointer';
        
        // get variables for popup
        var coordinates = e.features[0].geometry.coordinates.slice();
        var name = e.features[0].properties.name;
        var temp_class = e.features[0].properties['temp-class'];
        var timestamp = e.features[0].layer.metadata.timestamp;
        var webseite = e.features[0].properties.description;
        var w_typ = e.features[0].properties['w-typ'];
        
        // Ensure that if the map is zoomed out such that multiple
        // copies of the feature are visible, the popup appears
        // over the copy being pointed to.
        while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
        coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
        }
        
        // create text for popup
        var text = '<h6>'+name+'</h6><br>Temperaturklasse: '+temp_class+'<br>W-Typ: '+w_typ+'<br>Timestamp: '+timestamp;

        // Populate the popup and set its coordinates
        // based on the feature found.
        popup.setLngLat(coordinates).setHTML(text).addTo(map);
    });
    
    //remove popup on mousleave
    map.on('mouseleave', 'FlussMessstationen', function () {
        map.getCanvas().style.cursor = '';
        if (popup) popup.remove();
    });
    
    //-------------- USER INTERACTION HANDLING END --------------------
}
