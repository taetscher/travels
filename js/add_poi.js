import {add_poi_tooltip, add_poi_iframe, remove_poi_tooltip} from './poi_tooltips.js';

export async function addPOIs(map) {
    /**
    *Add source, layer and user interaction of poi to map
    *@param  {mapbox map object}   map   The map which receives the poi layer
    */

    const poi_signature = await map.loadImage('./mapstyles/icons/loc.png');
    map.addImage('custom_poi', poi_signature.data);
    
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
    
    //create a popup objects
    const markerHeight = 5, markerRadius = 5, linearOffset = 5;
    const popupOffsets = {
        'top': [0, 0],
        'top-left': [0,0],
        'top-right': [0,0],
        'bottom': [0, -markerHeight],
        'bottom-left': [linearOffset, (markerHeight - markerRadius + linearOffset) * -1],
        'bottom-right': [-linearOffset, (markerHeight - markerRadius + linearOffset) * -1],
        'left': [markerRadius, (markerHeight - markerRadius) * -1],
        'right': [-markerRadius, (markerHeight - markerRadius) * -1]
        };

    var hover_popup = new maplibregl.Popup({
        offset: popupOffsets,
        className: 'poi_hover',
        closeButton: false,
        closeOnClick: false,
        closeOnMove: true
        });

    var iframe_popup = new maplibregl.Popup({
        offset: popupOffsets,
        className: 'poi_iframe',
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
