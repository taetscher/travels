export function addTravels(map, popup) {
    /**
    *Add source, layer and user interaction of swimming spots to map
    *@param  {mapbox map object}   map   The map which receives the swimming spot layer
    *@param  {mapbox popup object} popup The mapbox popup object which receives tooltip information
    */
    
    //in order to use data with mapbox, you need to add a source first
    map.addSource('travels', {
            type: 'geojson',
            data: './geojson/travels.geojson',
            attribution: "© taetscher"
        })

    //add the layer
    map.addLayer({
        id: 'travels_layer',
        type: 'line',
        source: 'travels',
        paint: {
            'line-width': 2,
            'line-dasharray': [1, 2.5],
            'line-color': "#070424"
        }
        })
}
