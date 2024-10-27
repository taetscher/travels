import {add_travels_tooltip, remove_travels_tooltip} from '../tooltips/travels_tooltips.js';

export function addTravels(map) {
    /**
    *Add source, layer and user interaction of swimming spots to map
    *@param  {mapbox map object}   map   The map which receives the swimming spot layer
    */
    
    //in order to use data with mapbox, you need to add a source first
    map.addSource('travels', {
            type: 'geojson',
            data: './geojson/travels.geojson',
            attribution: "© taetscher"
        });

    //add the travel layers
    map.addLayer({
        id: 'flights_layer',
        type: 'line',
        source: 'travels',
        maxzoom: 4.5,
        filter: ["==", ["get", "kind"], "flight"],
        paint: {
            'line-width': 1,
            'line-dasharray': [1, 2.5],
            'line-color': "#070424"
        }
        });

    map.addLayer({
        id: 'car_layer',
        type: 'line',
        source: 'travels',
        minzoom: 4.5,
        filter: ["==", ["get", "kind"], "car"],
        paint: {
            'line-width': 2,
            //'line-dasharray': [1, 0.5],
            'line-color': "#7e8082"
        },
        layout: {
            'line-join': "round"
        }
        });

    map.addLayer({
        id: 'ferry_layer',
        type: 'line',
        source: 'travels',
        filter: ["==", ["get", "kind"], "ferry"],
        paint: {
            'line-width': 1.5,
            'line-dasharray': [3, 3],
            'line-color': "#2f6ca8"
        }
        });

    // create instance of hover-popup
    var travels_hover_popup = new maplibregl.Popup({
        className: 'travel_hover',
        closeButton: false,
        closeOnClick: false,
        closeOnMove: true,
        maxWidth: 'none'
        });
    
    // handle tooltips
    var added_layers = ['flights_layer', 'car_layer', 'ferry_layer'];
    for (let i = 0; i < added_layers.length; i++ ){
        //display popup on mouseenter
        add_travels_tooltip(map, added_layers[i], travels_hover_popup)
    
        //remove popup on mousleave
        remove_travels_tooltip(map, added_layers[i], travels_hover_popup)
    };
    
}
