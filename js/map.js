
import {addPOIs} from './add_poi.js';
import {addTravels} from './add_travels.js';


//create new map
const map = new maplibregl.Map({
            container: 'map',
            style: 'https://api.maptiler.com/maps/landscape/style.json?key=9evOdBDbZ9ckseqCzPcE', // 100k free requests per Month
            hash: true, //set this to true when productive (shows xyz in URL and updates it on the fly)
            minZoom: 1,
            maxZoom: 19,
            center: [47.5, 2.6],
            zoom: 2
            //,preserveDrawingBuffer: true
          });

//add map controls
map.addControl(new maplibregl.NavigationControl());
map.addControl(new maplibregl.ScaleControl({position: "bottom-left"}))

//when map is loaded, load additional layers
map.on('load', function() {
    
    addTravels(map);
    addPOIs(map);

});
