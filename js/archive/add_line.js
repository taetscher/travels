export function addLin(map) {
    /** Adds a line feature to a map object (FOR TESTING)
    *
    */
    
    //in order to use data with mapbox, you need to specify its source
    map.addSource('lin_test', {
            type: 'geojson',
            data: '../geojson/tests/vector_lin_testLyr.geojson'
        })
    
    //only after a source was set can the feature be added
    map.addLayer({
        'id': 'trainTracks',
        'type': 'line',
        'source': 'lin_test',
        'layout': {
            'line-join': 'round',
            'line-cap': 'round'
            },
        'paint': {
            'line-color': '#e038c2',
            'line-width': 4
            }
        })
}