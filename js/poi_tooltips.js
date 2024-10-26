export function add_poi_tooltip(map, layername='', popup) {

    map.on('mouseenter', layername, function (e){

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
    
};


export function add_poi_iframe(map, layername='', popup){

    map.on('click', layername, function (e) {

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

        var uri = 'https://de.wikipedia.org/wiki/Mount_Rushmore_National_Memorial';

        var content = '<iframe src="' + uri + '" seamless><\iframe>';

        // Populate the popup and set its coordinates
        // based on the feature found.
        popup.setLngLat(coordinates).setHTML(content).addTo(map);

    });
};


export function remove_poi_tooltip(map, layername='', popup) {

    map.on('mouseleave', layername, function () {
        map.getCanvas().style.cursor = '';
        if (popup) popup.remove();
    });

};