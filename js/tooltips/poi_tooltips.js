import { fetch_wiki_images } from './get_wikimedia_images.js';

export function add_poi_tooltip(map, layername='', popup) {

    map.on('mouseenter', layername, function (e){

        map.getCanvas().style.cursor = 'pointer';

        // get name
        var name = e.features[0].properties.name;

        // Populate the popup and set its coordinates
        // based on the feature found.
        popup.setLngLat(e.lngLat).setHTML(name).addTo(map);

        map.redraw()

    });
    
};


export function add_poi_iframe(map, layername='', popup){

    var flewn = false;
    var uri = '';

    map.on('click', layername, async function (e) {

        // Change the cursor style as a UI indicator.
        map.getCanvas().style.cursor = 'pointer';     

        // get uri from clicked feature
        uri =  e.features[0].properties.wiki_article;
        
        // fly to the scene of the crime (move slightly to the left of it)
        var coordinates = e.features[0].geometry.coordinates.slice();
        coordinates[0] = coordinates[0] - 0.15;

        map.flyTo(
            {
                center: coordinates,
                zoom: 10.5,
                speed: 1.6,
                essential: true
            }
        );

        flewn = true;

    });

    map.on('moveend', function(e){

        if (flewn){

            // generate wikipedia iframe
            var iframe_source = `src="${uri}"`;
            var wikipedia_iframe = String.raw`<iframe class="container" id="wiki_iframe" ${iframe_source}></iframe>`;
            popup.setHTML(wikipedia_iframe);
            
            // get coordinates of bounds of viewport
            var current_bounds = map.getBounds();
            var topleft = [current_bounds["_sw"]["lng"], current_bounds["_ne"]["lat"]]
            
            // add popup to map
            popup.setLngLat(topleft).addTo(map);
        }

        // reset popup attributes
        flewn = false;
        uri = '';
    });

};


export function remove_poi_tooltip(map, layername='', popup) {

    map.on('mouseleave', layername, function () {
        map.getCanvas().style.cursor = '';
        if (popup) popup.remove();
    });

    map.redraw()

};