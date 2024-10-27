import { fetch_wiki_images } from './get_wikimedia_images.js';

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
        var wikipedia_iframe = String.raw`<iframe class="col-sm-12" id="wiki_iframe" style="width:100%; height=100%;" ${iframe_source}></iframe>`;

        // get iframe(s)
        var div_list = [wikipedia_iframe]
        for (let i = 0; i < div_list.length; i++){
            html_content += String.raw`${div_list[i]}`;
        }

        // get images from wikimedia commons
        var img_divs = ''
        var wikimedia_images = await fetch_wiki_images(name);
        if (wikimedia_images){$
            // create img tags
            var img_tags = [];
            for (let i = 0; i < wikimedia_images.length; i++){
                var img_tag = String.raw`<img src="${wikimedia_images[i]}"></img>`;
                img_tags.push(img_tag);
            };

            // make col-objects to use with boostrap
            var n = 0;
            var temp = ''
            for (img_tag in img_tags){
                
                if (n <= 2){
                    temp += `<div class="img-fluid"><div class="img-fluid" id="wiki_img">${img_tags[img_tag]}</div></div>`;
                    n+=1;
                }
                else {
                    img_divs += `<div>${temp}</div>`;
                    temp = '';
                    n = 0;
                }
            }
        }

        // add to html content
        // prepare html content of popup
        var html_content = `
                            <div class="container" id="poi_popup">
                                <div class="row" id="wikipedia_iframe_row">
                                        ${wikipedia_iframe}
                                </div>
                                <div class="row" id="wikimedia_images_row">
                                    ${img_divs}
                                </div>
                            </div>
                            `;
            

        // Populate the popup and set its coordinates
        // based on the feature found.
        popup.setLngLat(coordinates).setHTML(html_content).addTo(map);

        map.triggerRepaint();

        
    });


};


export function remove_poi_tooltip(map, layername='', popup) {

    map.on('mouseleave', layername, function () {
        map.getCanvas().style.cursor = '';
        if (popup) popup.remove();
    });

};