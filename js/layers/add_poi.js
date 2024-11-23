import {add_poi_tooltip, add_poi_iframe, remove_poi_tooltip} from '../tooltips/poi_tooltips.js';
import { loadIcons } from '../icons/load_icons.js';

export async function addPOIs(map) {
    /**
    *Add source, layer and user interaction of poi to map
    *@param  {mapbox map object}   map   The map which receives the poi layer
    */

    // add images for styling
    await loadIcons(map);
    
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
        maxzoom: 20,
        layout: {
            'icon-image': ['concat', 'custom_', ['get', 'kind']],
            'icon-size': 0.3,
            'icon-overlap': "never",
            'symbol-sort-key': [
                'match', ['get', 'kind'],
                'metropolitan_area', 0,
                'airport', 1,
                'port', 2,
                'city', 3,
                'village', 4,
                'point_of_interest', 5,
                'small_dwelling', 6,
                'hotel', 7
                , 8
            ]
        }
        })
    
    //create popup objects
    var hover_popup = new maplibregl.Popup({
        className: 'poi_hover',
        closeButton: false,
        closeOnClick: false,
        closeOnMove: true,
        maxWidth: 'none'
        });

    var iframe_popup = new maplibregl.Popup({
        className: 'poi_iframe_container',
        closeButton: true,
        closeOnClick: true,
        closeOnMove: true,
        maxWidth: 'none'
        });

    // handle tooltips
    //display popup on mouseenter
    add_poi_tooltip(map, 'pois', hover_popup)

    // display iframe on click
    add_poi_iframe(map, 'pois', iframe_popup)
    
    //remove popup on mousleave
    remove_poi_tooltip(map, 'pois', hover_popup)

}
