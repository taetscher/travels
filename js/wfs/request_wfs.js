export function addRiagProjects(map) {

    // WFS Parameters
    const wfsUrl = 'https://webgis.rysering.ch/default/ows/default/ryser_landingpage';
    const params = {
        service: 'WFS',
        version: '2.0.0',
        request: 'GetFeature',
        typeName: 'Engestrasse_9', // Replace with correct namespace and layer name
        outputFormat: 'application/json'
    };

    // construct the URL for WFS request
    const url = wfsUrl + '?' + new URLSearchParams(params).toString();
    console.log(url);

    // fetch the data
    data = fetch(url)
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
            });

            // Add maplibre layer
            map.addLayer({
            id: 'wfs-layer',
            type: 'circle',
            source: 'riag-projects',
            paint: {
                'circle-radius': 15,
                'circle-color': '#007cbf'
            }
            });
            
        })
        .catch(error => console.error('Error fetching WFS data:', error));

}