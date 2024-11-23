export function add_travels_tooltip(map, layername='', popup) {

    map.on('mouseenter', layername, function (e){

        map.getCanvas().style.cursor = 'crosshair';

        var from_poi = e.features[0].properties.from_poi;
        var to_poi = e.features[0].properties.to_poi;
        var kind =  e.features[0].properties.kind;

        var display_text = `From ${from_poi} to ${to_poi}, ${kind}`;

        // Populate the popup and set its coordinates
        // based on the feature found.
        popup.setLngLat(e.lngLat).setHTML(display_text).addTo(map);

    });
    
};

export function remove_travels_tooltip(map, layername='', popup) {

    map.on('mouseleave', layername, function () {
        map.getCanvas().style.cursor = '';
        if (popup) popup.remove();
    });

};