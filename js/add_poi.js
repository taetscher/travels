export function addPOIs(map, popup) {
    /**
    *Add source, layer and user interaction of poi to map
    *@param  {mapbox map object}   map   The map which receives the poi layer
    *@param  {mapbox popup object} popup The mapbox popup object which receives tooltip information
    */
    
    //in order to use data with mapbox, you need to add a source first
    map.addSource('poi_source', {
            type: 'geojson',
            data: './geojson/poi.geojson',
            attribution: "© taetscher"
        })
    
    //load an icon to be used to display location of swimming spots
    map.loadImage('./mapstyles/icons/loc.png', function (error, image){
        
        //add the image to the map
        map.addImage('poi', image);
    
        //add the layer
        map.addLayer({
            id: 'pois',
            type: 'symbol',
            source: 'poi_source',
            layout: {
                'icon-image': 'poi',
                'icon-size': 1
            }
            })
        });
    //-------------- USER INTERACTION HANDLING START --------------------
    
    //display popup on mouseenter
    map.on('mouseenter', 'travels_poi', function (e) {

        // Change the cursor style as a UI indicator.
        map.getCanvas().style.cursor = 'pointer';

        var coordinates = e.features[0].geometry.coordinates.slice();
        var name = e.features[0].properties.name;
              
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
    map.on('mouseleave', 'travels_poi', function () {
        map.getCanvas().style.cursor = '';
        if (popup) popup.remove();
    });
    
    //-------------- USER INTERACTION HANDLING END --------------------
}
