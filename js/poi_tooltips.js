export function add_poi_tooltip(map, layername='', popup) {

    map.on('mouseenter', layername, function (e){

        map.getCanvas().style.cursor = 'pointer';

        var name = e.features[0].properties.name;

        // Populate the popup and set its coordinates
        // based on the feature found.
        popup.setLngLat(e.lngLat).setHTML(name).addTo(map);
        map.triggerRepaint();

    });
    
};


export function add_poi_iframe(map, layername='', popup){

    map.on('click', layername, function (e) {

        // Change the cursor style as a UI indicator.
        map.getCanvas().style.cursor = 'pointer';
            
        var uri =  e.features[0].properties.wiki_article
        var iframe_source = `src="${uri}"`;
        var inline_styling = 'style="display: flex; min-width: 100%; min-height: 100%; background-color: rgba(240, 248, 255, 0)"'

        var content = `<iframe ${iframe_source} class="poi_iframe" scrolling="auto" ${inline_styling}><\iframe>`;

        // Populate the popup and set its coordinates
        // based on the feature found.
        popup.setLngLat(e.lngLat).setHTML(content).addTo(map);
        map.triggerRepaint();

    });
};


export function remove_poi_tooltip(map, layername='', popup) {

    map.on('mouseleave', layername, function () {
        map.getCanvas().style.cursor = '';
        if (popup) popup.remove();
    });

};