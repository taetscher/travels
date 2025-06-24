import {riag_projects_layerstyle} from './layout_riag_projects.js';

export function addRiagProjects(map) {

    // WFS Parameters
    const wfsUrl = 'https://webgis.rysering.ch/default/ows/default/ryser_landingpage';
    const params = {
        service: 'WFS',
        version: '2.0.0',
        request: 'GetFeature',
        typeName: 'Engestrasse_9', // layer name
        outputFormat: 'application/json'
    };

    // construct the URL to request GeoJson from WFS Server
    const url = wfsUrl + '?' + new URLSearchParams(params).toString();
    console.log(url);

    // request GeoJson from RIAG Server
    fetch(url)
        .then(response => {
            if (!response.ok) {
            throw new Error(`WFS request failed: ${response.statusText}`);
            }
            return response.json();
        })
        .then(geojson => {

            // Add source to map
            map.addSource('riag-projects', {
                type: 'geojson',
                data: geojson
                //cluster: true,
                //clusterMaxZoom: 7,
                //clusterRadius: 50
            });

            // Add maplibre layer
            map.addLayer({
                id: 'wfs-layer',
                type: 'circle',
                source: 'riag-projects',
                paint: riag_projects_layerstyle
            });
            
        })
        .catch(error => console.error('Error fetching WFS data:', error));
};
