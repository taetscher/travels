export function addPOIs(map, popup) {
    /**
    *Add source, layer and user interaction of poi to map
    *@param  {mapbox map object}   map   The map which receives the poi layer
    *@param  {mapbox popup object} popup The mapbox popup object which receives tooltip information
    */
    
    //in order to use data with mapbox, you need to add a source first
    map.addSource('BWI_poi_source', {
            type: 'geojson',
            data: './geojson/poi.geojson',
            attribution: "© OpenStreetMap contributors"
        })
    
    //add the layer
    map.addLayer({
        id: 'bwi_poi',
        type: 'circle',
        source: 'BWI_poi_source',
        minzoom: 13.5,
        maxzoom: 19,
        paint: {
            'circle-radius': 4,
            'circle-color': '#ffdc8a',
            "circle-opacity": 0.5,
            "circle-stroke-width": 1,
            "circle-stroke-color": '#000000'
        }
        })
    
    
    //-------------- USER INTERACTION HANDLING START --------------------
    
    //display popup on mouseenter
    map.on('mouseenter', 'bwi_poi', function (e) {

        // Change the cursor style as a UI indicator.
        map.getCanvas().style.cursor = 'pointer';

        var coordinates = e.features[0].geometry.coordinates.slice();
        var name = e.features[0].properties;
        
        

        // Ensure that if the map is zoomed out such that multiple
        // copies of the feature are visible, the popup appears
        // over the copy being pointed to.
        while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
        coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
        }

        // Populate the popup and set its coordinates
        // based on the feature found.
        popup.setLngLat(coordinates).setHTML(JSON.stringify(name)).addTo(map);
    });
    
    //remove popup on mousleave
    map.on('mouseleave', 'bwi_poi', function () {
        map.getCanvas().style.cursor = '';
        if (popup) popup.remove();
    });
    
    //-------------- USER INTERACTION HANDLING END --------------------
}
