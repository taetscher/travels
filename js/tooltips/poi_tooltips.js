import { fetch_wiki_images } from './get_page_images.js';

export function add_poi_tooltip(map, layername='', popup) {

    map.on('mouseenter', layername, function (e){

        map.getCanvas().style.cursor = 'pointer';

        // get name
        var name = e.features[0].properties.name;

        // Populate the popup and set its coordinates
        // based on the feature found.
        popup.setLngLat(e.lngLat).setHTML(name).addTo(map);
        map.triggerRepaint();

    });
    
};


export function add_poi_iframe(map, layername='', popup){

    map.on('click', layername, async function (e) {

        // Change the cursor style as a UI indicator.
        map.getCanvas().style.cursor = 'pointer';

        // fly to the scene of the crime
        var coordinates = e.features[0].geometry.coordinates.slice();
        map.flyTo(
            {
                center: coordinates,
                zoom: 10.5,
                speed: 0.9,
                essential: true
            }
        );
        
        // add a popup
        var uri =  e.features[0].properties.wiki_article;
        var name =  e.features[0].properties.name;

        var iframe_source = `src="${uri}"`;
        var inline_styling = 'style="position: relative; display: flex; min-width: 100%; min-height: 100%; background-color: none" class="poi_iframe"';
        var wikipedia_iframe = String.raw`<iframe ${iframe_source} scrolling="auto" ${inline_styling}></iframe>`;



        // prepare html content of popup
        var html_content = '';

        // get images from wikimedia commons
        var images = await fetch_wiki_images(name)
        .then( function (response){
            var img_tags = '';
            for (let i = 0; i < response.length; i++){
                console.log(`trying to create img tag from ${response[i]}`)
                img_div += String.raw`<img src="${response[i]}">`;
            };

            html_content += img_tags;
            console.log(img_tags)
            console.log(html_content)

            // get iframes
            var div_list = [wikipedia_iframe]
            for (let i = 0; i < div_list.length; i++){
                html_content += String.raw`<div>${div_list[i]}</div>`;
            }

            console.log(html_content)

            // Populate the popup and set its coordinates
            // based on the feature found.
            popup.setLngLat(coordinates).setHTML(html_content).addTo(map);

            map.triggerRepaint();
    });

    });
};


export function remove_poi_tooltip(map, layername='', popup) {

    map.on('mouseleave', layername, function () {
        map.getCanvas().style.cursor = '';
        if (popup) popup.remove();
    });

};