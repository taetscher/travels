export async function addPOIs(map, popup) {
    /**
    *Add source, layer and user interaction of poi to map
    *@param  {mapbox map object}   map   The map which receives the poi layer
    *@param  {mapbox popup object} popup The mapbox popup object which receives tooltip information
    */

    const image = await map.loadImage('./mapstyles/icons/loc.png');
    map.addImage('custom_poi', image.data);
    
    //in order to use data with mapbox, you need to add a source first
    map.addSource('poi_source', {
            type: 'geojson',
            data: './geojson/poi.geojson',
            attribution: "© taetscher",
            //cluster: true,
            //clusterMaxZoom: 7,
            //clusterRadius: 50
        })
    
    //add the layer
    map.addLayer({
        id: 'pois',
        type: 'symbol',
        source: 'poi_source',
        maxzoom: 8,
        layout: {
            'icon-image': 'custom_poi',
            'icon-size': 0.3,
            'icon-overlap': "never"
        }
        })
    //-------------- USER INTERACTION HANDLING START --------------------
    
    //display popup on mouseenter
    map.on('mouseenter', 'pois', function (e) {

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
        popup.setLngLat(coordinates).setHTML(name).addTo(map);
    });
    
    //remove popup on mousleave
    map.on('mouseleave', 'pois', function () {
        map.getCanvas().style.cursor = '';
        if (popup) popup.remove();
    });
    
    //-------------- USER INTERACTION HANDLING END --------------------
}
